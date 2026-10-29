import { rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = path.resolve(root, "out");
if (path.dirname(output) !== path.resolve(root)) throw new Error("Invalid build output directory");
await rm(output, { recursive: true, force: true });
