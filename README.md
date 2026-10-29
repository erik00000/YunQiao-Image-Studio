# YunQiao Image Studio

YunQiao Image Studio（云桥图像工坊 / 云桥Pro）是一款开源的 AI 图像生成与编辑桌面工具，基于 Electron、React 和 TypeScript 构建。它面向电商、短剧、自媒体、设计团队和商业内容生产场景，支持文生图、图生图、批量生产、行业模板、素材管理、AI 修图工具箱和云端存储。

项目支持 OpenAI 兼容的 `gpt-image-2`、`gpt-image-2.5-flare`、`gpt-image-2.5-sunburst` 与 Gemini 图像模型：两类图像接口都走 `https://api.yunqiao.me` 服务，可保存多组 Key、获取模型列表，并在顶部模型选择器切换当前生图模型。

## 项目入口

- 主页：[www.yunqiao.me](https://www.yunqiao.me/)
- 固定 API 地址：[api.yunqiao.me](https://api.yunqiao.me/)
- 源码仓库：[erik00000/YunQiao-Image-Studio](https://github.com/erik00000/YunQiao-Image-Studio)
- 客户端发布页：[GitHub Releases](https://github.com/erik00000/YunQiao-Image-Studio/releases)

主页用于访问网站，API 地址用于模型列表、连接测试、文生图、图生图和 AI 修图请求。客户端不提供自定义 API 地址入口；已有配置中的旧地址在读取时会统一使用固定地址。

## 版本与下载

当前源码版本：`0.1.20`。本仓库已包含云桥域名修改，尚未发布包含这些修改的客户端安装包。可先按下方“快速开始”运行源码，或按 Windows/macOS 构建说明自行打包。

后续安装包以本仓库的 [GitHub Releases](https://github.com/erik00000/YunQiao-Image-Studio/releases) 为准。原项目的历史安装包不包含本仓库此次域名修改。

Windows 便携版打包后可直接运行，无需安装 Node.js 或 npm。当前构建未配置 Windows 商业代码签名和 macOS Developer ID 公证，首次运行说明见下文。

## 核心功能

- 文生图创作：行业模板、提示词组合、尺寸/质量/格式参数控制。
- 图生图继续编辑：载入本地图片或生成结果，继续二次创作。
- AI 修图工具箱：扩图、去杂物、换背景、统一色调、商品光影、人像精修、局部重绘等。
- 批量生产工坊：支持 Excel 导入、多任务队列、批量图生图、底图文件夹绑定、暂停/继续/停止、失败重试和日志导出。
- 行业模板库：内置电商、短剧、自媒体、漫画动漫、人物图像、二次元头像、潮流社交、虚拟IP、游戏美术、餐饮、品牌广告等模板。
- 作品素材库：保存生成结果、提示词、参数快照、本地路径和云端 URL。
- 云端存储：支持 OSS、COS、OBS、七牛、MinIO、FTP、SFTP。
- 多模型接口：通过固定 API 服务支持 `gpt-image-2`、`gpt-image-2.5-flare`、`gpt-image-2.5-sunburst` 与 Gemini 图像模型，可保存多组 Key 并选择当前模型。
- 程序代理：默认勾选跟随 Windows/macOS 系统代理，取消后可选择单独 HTTP/HTTPS 代理或直连。
- 本机安全存储：API Key 和云存储密钥只保存在本机安全存储中。
- 跨平台配置：同一套代码支持 Windows 和 macOS 构建。

## 本仓库修改

- GPT 与 Gemini API 固定使用 `https://api.yunqiao.me/`，保留服务地址锁定逻辑。
- 顶部网站按钮固定打开 [www.yunqiao.me](https://www.yunqiao.me/)。
- 更新界面中的服务名称、配置示例和使用文档。
- 增加固定地址回归测试，覆盖旧配置读取、保存、模型列表、连接测试、生成、编辑和代理测试。

## 上游 v0.1.20 更新重点

- 新增 `gpt-image-2.5-flare` 和 `gpt-image-2.5-sunburst` 模型支持。
- 设置页、顶部模型选择器、模型列表获取和旧配置兼容逻辑已同步支持两个新模型。
- 文生图、图生图、局部重绘、AI 修图和批量生产会透传当前选择的 GPT 图像模型。
- 完善模型 API 规范、用户手册、产品文档和核心请求测试。

## 上游 v0.1.19 更新重点

- 新增 Gemini 图像模型接入，支持 `gemini-3.1-flash-image` 文生图、图生图和 AI 修图。
- API 设置升级为多 Key 多模型配置，可获取模型列表，并在顶部模型选择器切换当前生图模型。
- GPT 与 Gemini 图像接口使用固定服务地址，不提供自定义 API URL；本仓库当前使用的地址见“项目入口”。
- GPT 与 Gemini 使用不同参数区：GPT 保留尺寸、质量、格式和背景；Gemini 使用输出大小与画幅比例。
- Gemini 返回图片会读取真实 MIME 类型，结果面板可显示返回类型、图片类型、尺寸、文件大小和耗时。
- 批量生产工坊跟随当前模型，支持 GPT/Gemini 文生图与图生图任务，并按模型显示尺寸规则。
- 更新 README、用户手册、技术 API 规范和交付文档。

## 技术栈

- Electron
- Electron Vite
- React
- TypeScript
- Lucide React
- OpenAI 兼容图片接口
- Gemini 图像接口
- 默认图片模型：`gpt-image-2`，可切换 `gpt-image-2.5-flare`、`gpt-image-2.5-sunburst` 和 Gemini 图像模型

## 快速开始

先安装 Node.js 22 和 Git，然后获取源码：

```bash
git clone https://github.com/erik00000/YunQiao-Image-Studio.git
cd YunQiao-Image-Studio
```

安装锁定版本的依赖：

```bash
npm ci
```

启动开发环境：

```bash
npm run dev
```

代码检查：

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## API 设置

在应用内打开 `API与云端存储设置` 页面：

1. 选择 `GPT 图像 / 云桥` 或 `Gemini 图像` 服务类型，填写配置名称。
2. 填写云桥服务对应的 API Key，可通过 [主页](https://www.yunqiao.me/) 访问服务网站。
3. 点击 `获取模型`，选择可用图像模型，也可填写手动模型名。
4. 点击 `保存模型配置`，再在顶部模型选择器选中需要使用的配置和模型。
5. 点击 `测试当前模型`，查看 HTTP 状态码、耗时和返回摘要。

API 地址固定为 `https://api.yunqiao.me/`，无需填写，也不能在界面中修改。GPT 使用 `/v1/models`、`/v1/images/generations` 和 `/v1/images/edits`；Gemini 使用 `/v1beta/models` 及对应的生成接口。

- 多 Key 管理：可保存多组 Key，每组 Key 绑定服务类型和模型；密钥使用本机安全存储。
- 模型可用性：客户端内置模型选项，实际可用模型与权限以服务端返回为准。
- 请求超时时间：默认 300 秒，最高 600 秒。
- 程序代理：默认跟随系统代理；也可选择单独 HTTP/HTTPS 代理或直连。保存后用于 API、生图、修图、更新检查和远程图片下载。

## 图片生成说明

本项目的图片生成和图片编辑能力按当前模型分流：

- GPT 文生图：可使用 `gpt-image-2`、`gpt-image-2.5-flare` 或 `gpt-image-2.5-sunburst` 生成图片。
- GPT 图生图：可使用以上任一 GPT 图像模型基于输入图片继续编辑。
- GPT 局部重绘 / AI 修图：可使用以上任一 GPT 图像模型的图片编辑能力处理原图。
- Gemini：使用 `https://api.yunqiao.me` 的 Gemini 原生接口生成或编辑图片，参数区会切换为 Gemini 输出大小和画幅比例。

三个 GPT 图像模型共用 OpenAI 兼容的 `/v1/images/generations` 和 `/v1/images/edits` 接口。设置页获取模型失败或服务端没有返回模型列表时，客户端仍会显示这三个内置模型；已有的旧配置也会自动补齐，不需要重新添加 API Key。

当前默认每次生成或编辑 1 张图片，不主动传递多图数量参数。这样可以避免部分中转接口把数量参数转换成 `tools[0].n` 后被官方接口拒绝。

图生图和编辑接口使用本地文件上传方式，避免把本地图片错误地以 `application/octet-stream` 的 URL 形式传给接口。

AI 修图工具箱支持局部遮罩：可在图片上绘制需要修改的区域，保存遮罩后会随下一次图片编辑请求一起提交。

## 批量生产说明

- Excel 列顺序：项目、行业、模板、数量、提示词、尺寸（可选）。
- 每条任务可单独绑定底图；有底图时走图生图，没有底图时走文生图。
- 可选择一个图片文件夹批量绑定底图，系统会按任务顺序循环分配。
- 队列支持暂停、继续、停止、失败重试和任务日志导出。
- 设置页和作品库支持真实云上传测试、URL 清单导出和素材包打包。

## 模板与项目管理

- 创作页支持填写项目名称，生成作品会自动归入对应项目。
- 行业模板库支持新增、编辑、导入和导出 JSON 模板包。
- 模板库会按行业目标数量自动补足常用场景，热门行业会提供更多模板。
- 新增模板已按 GPT 图像模型尺寸规则检查，默认不超过 2K。
- 人物、二次元和虚拟 IP 模板默认加入肖像、版权、未成年人和低俗内容规避提示。
- 作品素材库支持搜索、项目筛选、云端状态筛选、预览、继续编辑、修图和打开本地文件位置。
- 顶部工具栏保留手动检查更新功能。当前更新源仍沿用上游配置；本仓库客户端请以“版本与下载”中的发布页为准。

## GitHub Release 自动构建

推送 `v*` tag 会触发 `.github/workflows/release.yml`：

- Windows runner 构建 Windows x64 便携版。
- macOS runner 分别构建 Intel x64 DMG 和 Apple Silicon arm64 DMG。
- 所有平台会先运行 `lint`、`typecheck`、`test` 和 `build`。
- 构建成功后自动上传到 GitHub Release。
- 同时生成发布清单；配置服务器 Secret 后会自动上传到下载站目录。

## Windows 首次运行说明

当前构建配置生成的 Windows 便携版未做商业代码签名，因此 Microsoft Defender SmartScreen 可能提示“Windows 已保护你的电脑”，并显示：

```text
发布者：发布者未知
```

如果你确认文件来自本项目 GitHub Release，可以这样启动：

1. 点击提示窗口里的 `更多信息`。
2. 点击 `仍要运行`。
3. 程序会正常启动。

这是 Windows 对未签名新应用的安全提示，不代表程序损坏。若要让普通用户下载后不出现“发布者未知”，需要购买代码签名证书，在 electron-builder 中配置签名，并持续发布已签名版本积累信誉。

## Windows 构建

生成便携版：

```bat
scripts\build-win-portable.cmd
```

或：

```bash
npm run dist:win-portable
```

产物默认输出到：

```text
release/
```

## macOS 构建

Windows 不能直接生成 macOS `.app` 或 `.dmg`，需要在 macOS 或 GitHub Actions 的 macOS Runner 上构建。

生成 `.app` 目录：

```bash
bash scripts/build-mac-dir.sh
```

生成 `.dmg`：

```bash
bash scripts/build-mac.sh
```

更多说明见 [MAC_BUILD.md](./MAC_BUILD.md)。

## macOS 客户端打开方式

当前开源版本未做 Apple Developer ID 签名和公证，macOS 首次打开时可能提示“无法验证开发者”或“已损坏，无法打开”。下面方法只适用于你确认来源可信的软件；不明来源软件不要绕过系统安全检查。

方法 1：右键打开，单次临时放行。

1. 打开 DMG，把应用拖到 `Applications`。
2. 在 `Applications` 中找到应用。
3. 右键点击 `.app`，选择 `打开`。
4. 弹窗提示无法验证时，再次点击 `打开`。

这种方式较安全，但有时重启或重新打开后需要再次确认。

方法 2：终端移除隔离标记，永久放行。

打开“终端”，执行下面命令。可以把 `.app` 直接拖进终端自动补全路径：

```bash
xattr -cr /Applications/你的软件名.app
```

示例：

```bash
xattr -cr /Applications/云桥Pro.app
```

这条命令会删除 macOS 给下载应用添加的隔离检疫属性，之后通常可以正常双击打开。

方法 3：临时关闭安全策略，不推荐。

仅在你清楚风险时临时使用，用完务必恢复：

```bash
# 关闭公证拦截
sudo spctl --master-disable

# 恢复系统默认安全策略
sudo spctl --master-enable
```

## 项目结构

```text
src/main/        Electron 主进程
src/preload/     预加载桥接层
src/renderer/    React 前端界面
src/shared/      共享类型、API 适配、尺寸校验、提示词合成
config/          示例配置和模板数据
docs/            PRD、UI、API 和交付文档
scripts/         Windows/macOS 构建与图标脚本
build/           应用图标资源
```

## 文档

- [用户使用说明](./docs/05-user-guide.md)
- [产品 PRD](./docs/00-product-prd-final.md)
- [UI 设计规范](./docs/01-ui-design-spec.md)
- [技术与 API 规范](./docs/02-technical-api-spec.md)
- [行业提示词模板库](./docs/03-industry-prompt-library.md)
- [编译打包与交付说明](./docs/04-build-and-delivery.md)
- [macOS 构建说明](./MAC_BUILD.md)
- [v0.1.19 更新说明](./docs/releases/v0.1.19.md)
- [v0.1.18 更新说明](./docs/releases/v0.1.18.md)

## 安全说明

- 不要把真实 API Key、云存储 AccessKey、SecretKey 提交到 Git。
- `.env`、本地配置、构建产物和依赖目录已通过 `.gitignore` 排除。
- `config/api.example.json` 只保留示例配置。
- 生成的图片和云端 URL 由用户自行管理，请注意版权、隐私和平台合规要求。
- 当前开源构建未做 Windows 代码签名和 macOS 公证，请只从可信 Release 页面下载客户端。

## 开源协作

欢迎在[本仓库](https://github.com/erik00000/YunQiao-Image-Studio)提交 Issue 和 Pull Request。项目基于 [jxb412/YunQiao-Image-Studio](https://github.com/jxb412/YunQiao-Image-Studio) 继续开发。适合优先完善的方向：

- 更多行业模板和提示词变量。
- 更完整的签名、公证和安装包分发流程。
- 更多兼容 OpenAI 图片接口的服务适配。
- 发布签名和多平台 Release 流程。
