# 🏛️ Quotes (现代极简智者语录与思维模型空间)

基于 **Astro 5+** 构建的现代极简金句语录、思维模型与经典洞察纯静态站点。融合 Twitter / Threads 的极简排版与极致阅读体验，**支持全栈原生五国语言体系 (i18n)** 与 **Google Gemini Pro 云端全自动翻译流水线**，**全面针对 2026 AI 检索与 GEO 流量推广进行深度优化**，支持 **纯前端生成极简金句海报**，提供多维社交分享矩阵，并通过 **GitHub Actions 自动构建部署至 Cloudflare Pages 全球边缘网络，同时可自动同步发推至 Twitter (X)**。

---

## ✨ 核心特性

- ⚡ **极致纯静态 (Astro 5+ SSG)**: 0 客户端 JS 运行时负担，秒级构建与首屏响应，零数据库，终身免费托管于 Cloudflare Pages 全球边缘网络。
- 🌿 **极简现代时间轴美学**:
  - 彻底去除厚重外框与阴影，无界通透排版，沉浸回归文字本身。
  - 1px 细化淡雅时间轴线，心情表情（Mood Emoji）与卡片首行文字精准水平居中对齐。
  - 纯黑 OLED Dark Mode 与极简 Clean Light Mode 随心切换，色彩自适应。
- 🎲 **灵感漫游与随机卡片**:
  - 顶部首屏常驻「随机卡片」节点，支持免刷新毫秒级「换一换」🎲，在经典思想流中偶遇顿悟。
  - 随机卡片底部同样集成多语言切换胶囊，换一换后依然智能记忆当前所选语言。
- 🌐 **全栈原生五语种体系 (i18n: 中 / EN / 日 / 韓 / 越)**:
  - 接入 **Astro 5+ 原生 `astro:i18n`** 路由：`/` (中文), `/en/` (English), `/ja/` (日本語), `/ko/` (한국어), `/vi/` (Tiếng Việt)。
  - **智能访客探测**：首访自动匹配浏览器/操作系统语言偏好平滑导向，并以 `localStorage` 记忆选择。
  - **卡片即时多语言预览**：普通卡片与随机卡片均支持点击 `中 EN 日 韓 越` 即时无刷新切换正文与出处。
- 🖼️ **纯前端极简海报引擎**:
  - 内置纯前端 Canvas 引擎，一键生成极简排版金句图。
  - 支持多语言海报切换，字体与行距自适应（中文排版、西文及日韩衬线字体）。
  - 右下角内嵌极简纯色二维码，暗黑与浅色自适应反色，扫码精准溯源至对应语言的单篇金句独立页面。
- 📤 **全端社交分享矩阵**:
  - **X (Twitter)**: 一键发推，自动携带对应语言摘要、来源出处、原文追溯链接与 `— via Quotes` 标识。
  - **Facebook**: 一键分享至 Facebook 动态。
  - **通用原生分享**: 移动端自动唤起系统原生分享面板（微信、朋友圈、系统备忘录等），PC 端快速复制原文追溯链接并提示反馈。
- 🤖 **零心智负担创作流 (Google Gemini Pro 自动翻译)**:
  - 创作者无需关心翻译，在手机或电脑上**只写纯中文发布**。
  - GitHub Actions 自动调用 Google Gemini Pro API 进行文学级翻译，补全英、日、韩、越四国译文并自动提交，构建上线全球边缘节点。
- 📡 **2026 AI-Ready & GEO 检索优化**:
  - 严格遵循 `/llms.txt`（精炼摘要）与 `/llms-full.txt`（全文语料）规范，便于 ChatGPT、Perplexity、Claude 等 AI 搜索引擎精准抓取与检索。
  - 自动注入 `schema.org/SocialMediaPosting` 结构化数据 (JSON-LD) 与多语言 `hreflang` 标签。
  - 纯静态开放 JSON API (`/api/memos.json`) 与 RSS 2.0 订阅源 (`/rss.xml`)。
- 🐦 **自动同步至 Twitter (X)**:
  - 提交新金句后，GitHub Actions 在部署成功后自动调用 Twitter 官方 Free API 秒级发推（完全免费）。

---

## ✍️ 日常写作与发布工作流（双端支持，零心智负担）

你可以完全保持现有的中文写作习惯，无需手动翻译或配置多语言字段：

### 📱 方式一：手机端（GitHub App）随时随地发布
1. 打开手机端 **GitHub App**，进入本仓库；
2. 浏览至 `src/content/memos/` 目录，点击右上角添加新文件（如 `2026-09-06-thought.md`）；
3. 填写纯中文 Frontmatter 与正文：
   ```markdown
   ---
   date: 2026-09-06T12:00:00+08:00
   tags: ["思考", "认知"]
   mood: "💡"
   source: "纳瓦尔"
   ---

   你的纯中文金句内容...
   ```
4. 点击 **Commit changes** 提交。云端 GitHub Actions 会自动捕获提交，调用 Gemini 生成 4 种语言翻译，并驱动 Cloudflare Pages 更新发布！

### 💻 方式二：PC 端（Obsidian）本地极速沉淀
1. 将本仓库作为 Obsidian 的一个 Vault 或子目录打开；
2. 在 `src/content/memos/` 下使用你喜欢的模板新建卡片，只填中文；
3. 通过 **Obsidian Git 插件**（或快捷键）直接 Push 到 GitHub；
4. **小贴士**：下次在电脑端打开 Obsidian 时，Git 插件执行 `git pull`，GitHub Actions 机器人自动补齐的多语言译文就会同步拉取回本地库。

### ⌨️ 方式三：本地终端交互式录入 (`npm run new`)
在本地电脑终端执行交互式引导命令：
```bash
npm run new
```
终端会引导输入正文、出处、标签、心情与置顶，若本地 `.env` 配置了 `GEMINI_API_KEY`，还会立即在本地完成翻译并保存。

### 🎫 方式四：GitHub Issues 便捷发布
在 GitHub 仓库中提交一条标题带有特定前缀的 Issue，内置工作流也会自动将其转换成 Markdown 并补齐翻译发布。

---

## 🚀 本地开发与命令指南

```bash
# 1. 克隆项目并进入目录
git clone https://github.com/dustyat/quotes.git
cd quotes

# 2. 安装依赖
npm install

# 3. 启动本地开发服务 (支持实时热重载)
npm run dev
# 浏览器打开: http://localhost:4321

# 4. 批量补齐现存金句的多语言翻译 (需配置 GEMINI_API_KEY)
npm run translate

# 5. 全站静态构建 (1 秒生成 126+ 页面)
npm run build

# 6. 本地预览构建产物
npm run preview
```

---

## ☁️ 部署至 Cloudflare Pages 教程

本项目已内置全自动化持续部署流水线 `.github/workflows/deploy.yml` 与自动翻译流水线 `.github/workflows/auto-translate.yml`。

### 步骤一：推送到你的 GitHub 仓库
```bash
git push -u origin main
```

### 步骤二：在 GitHub 仓库中配置 Actions Secrets
进入 GitHub 仓库页面 -> **Settings** -> **Secrets and variables** -> **Actions** -> 点击 **New repository secret**，添加以下密钥：

| Secret 名称 | 是否必选 | 说明 |
| :--- | :---: | :--- |
| `GEMINI_API_KEY` | **必选** | 用于驱动 GitHub Actions 自动将中文翻译为英/日/韩/越四语种 |
| `CLOUDFLARE_API_TOKEN` | **必选** | Cloudflare API Token（需具备 Pages:Edit 权限） |
| `CLOUDFLARE_ACCOUNT_ID` | **必选** | Cloudflare 账号 ID（可在控制台主页右侧栏获取） |
| `CLOUDFLARE_PROJECT_NAME` | **必选** | Cloudflare Pages 项目名称（例如 `quotes`） |
| `TWITTER_API_KEY` | 可选 | Twitter Developer App Consumer Key |
| `TWITTER_API_SECRET` | 可选 | Twitter Developer App Consumer Secret |
| `TWITTER_ACCESS_TOKEN` | 可选 | Twitter Developer App Access Token |
| `TWITTER_ACCESS_SECRET` | 可选 | Twitter Developer App Access Secret |

> **说明**：配置好 `GEMINI_API_KEY` 和 Cloudflare 凭证后，以后每一次推送中文 Markdown，全自动化流水线就会在数十秒内自动翻译并完成全球边缘 CDN 发布！

---

## ⚙️ 个性化定制

打开 `src/utils/config.ts`，可自由定制您的站点信息与个人信息：
```typescript
export const SITE_CONFIG = {
  title: "Quotes",
  description: "精选智者格言、经典洞察与思维模型，记录穿越时空的智慧火花。",
  siteUrl: "https://quotes.dustyat.com", // 替换为您绑定的实际域名
  author: {
    name: "Alex",
    handle: "@quotes",
    avatar: "/avatar.svg", // 可替换为 public 目录下的头像图片
    bio: "思想策展人 / 保持好奇 / 摘录人类文明中那些照亮认知的字句。",
    twitter: "https://twitter.com",
    github: "https://github.com/dustyat/quotes"
  },
  slogan: "“他山之石，可以攻玉。”",
};
```

---

## 📄 路由与开放端点一览

| 页面 / 接口 | 中文 (默认) | English | 日本語 | 한국어 | Tiếng Việt |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **金句主时间流** | `/` | `/en/` | `/ja/` | `/ko/` | `/vi/` |
| **话题分类聚合** | `/tags` | `/en/tags` | `/ja/tags` | `/ko/tags` | `/vi/tags` |
| **话题独立页** | `/tags/[tag]` | `/en/tags/[tag]` | `/ja/tags/[tag]` | `/ko/tags/[tag]` | `/vi/tags/[tag]` |
| **单篇金句独立页**| `/memo/[id]` | `/en/memo/[id]` | `/ja/memo/[id]` | `/ko/memo/[id]` | `/vi/memo/[id]` |
| **关于本站** | `/about` | `/en/about` | `/ja/about` | `/ko/about` | `/vi/about` |

#### 开放数据与 AI 规范接口
- **AI 语义精简索引**: `/llms.txt`
- **AI 全文语料库**: `/llms-full.txt`
- **纯静态 JSON 开放接口**: `/api/memos.json`
- **RSS 2.0 订阅源**: `/rss.xml`
- **Sitemap 站点地图**: `/sitemap-index.xml`
- **Robots 规则**: `/robots.txt`

---

## 📄 开源许可证

本项目基于 [MIT License](LICENSE) 开源。欢迎 Star、Fork 或参与贡献！
