/* eslint-disable @typescript-eslint/no-require-imports -- Stub Electron before loading its IPC handlers. */
// Real IPC handlers and isolated disk state; Electron and network responses are mocked.
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const Module = require("node:module");
const path = require("node:path");

async function main() {
  const tempRoot = path.resolve(__dirname, "../temp");
  await fs.mkdir(tempRoot, { recursive: true });
  const directory = await fs.mkdtemp(path.join(tempRoot, "api-settings-"));
  const handlers = new Map();
  const electron = {
    app: { getPath: () => directory, whenReady: () => new Promise(() => {}), on: () => {} },
    ipcMain: { handle: (name, handler) => handlers.set(name, handler) },
    safeStorage: { encryptString: (value) => Buffer.from(value), decryptString: (value) => value.toString() }
  };
  const originalLoad = Module._load;
  const originalFetch = globalThis.fetch;
  const savedEnvironment = {};
  for (const key of ["YUNQIAO_API_KEY", "QUYA_API_KEY", "GEMINI_API_KEY"]) {
    savedEnvironment[key] = process.env[key];
    delete process.env[key];
  }
  const requests = [];
  const base = "https://api.yunqiao.me";
  globalThis.fetch = async (url, init) => {
    assert.equal(new URL(url).origin, base);
    requests.push({ url, init });
    return new Response(JSON.stringify(url.includes(":generateContent")
      ? { candidates: [{ content: { parts: [{ inlineData: { mimeType: "image/png", data: "QUJD" } }] } }] }
      : { data: [{ id: "gpt-image-2", b64_json: "QUJD" }], models: [{ name: "models/gemini-3.1-flash-image" }] }), { status: 200 });
  };
  try {
    Module._load = function (name, ...args) {
      return name === "electron" ? electron : originalLoad.call(this, name, ...args);
    };
    require("../src/main/index.ts");
    Module._load = originalLoad;
    const call = (name, payload) => handlers.get(name)(undefined, payload);
    const fresh = await call("app:get-settings");
    assert.equal(fresh.hasApiKey, false);
    assert.ok(fresh.apiProfiles.every((profile) => profile.hasKey === false));
    // An old installation must migrate away from both original and custom addresses.
    await fs.writeFile(path.join(directory, "settings.json"), JSON.stringify({
      apiBaseUrl: "https://api.quya.org", proxyMode: "off", autoCheckUpdates: false,
      apiProfiles: [{ id: "legacy", name: "Legacy", provider: "openai", apiBaseUrl: "https://old.example.test" }],
      activeApiProfileId: "legacy"
    }));
    const migrated = await call("app:get-settings");
    assert.equal(migrated.apiBaseUrl, base);
    assert.equal(migrated.apiProfiles[0].apiBaseUrl, base);
    for (const provider of ["openai", "gemini"]) {
      const saved = await call("settings:save-api-profile", {
        name: provider, provider, apiBaseUrl: "https://ignored.example.test", apiKey: "test-key"
      });
      const profileId = saved.activeApiProfileId;
      const profileBase = provider === "gemini" ? `${base}/v1beta` : base;
      const modelsUrl = provider === "gemini" ? `${base}/v1beta/models` : `${base}/v1/models`;
      assert.equal(saved.apiProfiles.find((profile) => profile.id === profileId).apiBaseUrl, profileBase);
      await call("settings:update", { apiBaseUrl: "https://ignored.example.test", requestTimeoutSeconds: 42 });
      const reloaded = await call("app:get-settings");
      assert.equal(reloaded.apiBaseUrl, base);
      assert.equal(reloaded.apiProfiles.find((profile) => profile.id === profileId).apiBaseUrl, profileBase);
      const persisted = JSON.parse(await fs.readFile(path.join(directory, "settings.json"), "utf8"));
      assert.equal(persisted.apiProfiles.find((profile) => profile.id === profileId).apiBaseUrl, profileBase);
      await call("api:fetch-models", { profileId, provider, apiBaseUrl: "https://ignored.example.test" });
      assert.equal(requests.at(-1).url, modelsUrl);
      await call("api:test");
      assert.equal(requests.at(-1).url, modelsUrl);
      for (const method of ["image:generate", "image:edit"]) {
        await call(method, { prompt: "test", ...(method === "image:edit" ? { imagePaths: [] } : {}) });
        assert.equal(requests.at(-1).url, provider === "gemini"
          ? `${base}/v1beta/models/gemini-3.1-flash-image:generateContent`
          : `${base}/v1/images/${method === "image:edit" ? "edits" : "generations"}`);
        assert.equal(requests.at(-1).init.headers.Authorization, "Bearer test-key");
      }
      await call("network:test-proxy", { proxyMode: "off" });
      assert.equal(requests.at(-1).url, `${base}/v1/models`);
    }
    console.log(`Fixed API settings integration passed (${requests.length} mocked requests)`);
  } finally {
    Module._load = originalLoad;
    globalThis.fetch = originalFetch;
    for (const [key, value] of Object.entries(savedEnvironment)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    await fs.rm(directory, { recursive: true, force: true });
  }
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
