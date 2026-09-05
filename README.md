# 🏛️ Quotes (现代极简智者语录与思维模型空间)

基于 **Astro 5+** 构建的现代极简金句语录、思维模型与经典洞察纯静态站点。融合 Twitter / Threads 的美学排版与极致阅读体验，**全面针对 2026 AI 检索与 GEO 流量推广进行深度优化**，支持 **纯前端生成极简金句海报**，提供多维社交分享矩阵，并通过 **GitHub Actions 自动构建部署至 Cloudflare Pages 全球边缘网络，同时可自动同步发推至 Twitter (X)**。

---

## ✨ 核心特性

- ⚡ **极致纯静态 (Astro 5+ SSG)**: 0 客户端 JS 运行时负担，秒级首屏加载，零数据库，终身免费托管于 Cloudflare Pages。
- 🌿 **极简现代时间轴美学**:
  - 彻底去除厚重外框与阴影，无界通透排版，沉浸回归文字本身。
  - 1px 细化微光时间轴线，心情表情（Mood Emoji）与卡片首行文字精准水平居中对齐。
  - 纯黑 OLED Dark Mode 与极简 Clean Light Mode 随心切换，色彩自适应。
- 🎲 **灵感漫游与随机卡片**:
  - 顶部首屏常驻「随机卡片」节点，支持免刷新毫秒级「换一换」，在经典思想流中偶遇顿悟。
- 🖼️ **纯前端极简海报引擎**:
  - 内置纯前端 Canvas 引擎，一键生成极简排版金句图。
  - 右下角内嵌极简纯色二维码，暗黑与浅色自适应反色，支持随时保存高清图片或直接复制到剪贴板，方便读者扫码溯源。
- 📤 **全端社交分享矩阵**:
  - **X (Twitter)**: 一键发推，自动携带精简摘要、来源出处、原文追溯链接与 `— via Quotes` 标识。
  - **Facebook**: 一键分享至 Facebook 动态。
  - **通用原生分享**: 移动端自动唤起系统原生分享面板（微信、朋友圈、系统便签等），PC 端快速复制原文追溯链接并提示反馈。
- 🌐 **全栈原生多语言 (i18n: 中 / EN / 日 / 韓 / 越)**:
  - 接入 **Astro 5+ 原生 `astro:i18n`** 路由：`/` (中文), `/en/` (English), `/ja/` (日本語), `/ko/` (한국어), `/vi/` (Tiếng Việt)。
  - **智能访客探测**：首访自动匹配浏览器/操作系统语言，平滑导向目标语种，并提供 `localStorage` 记忆。
  - **一键多语言海报与分享**：海报弹窗与卡片支持 5 国语言瞬间切换，自动适配西文/日韩衬线字体排版，右下角二维码精准溯源至对应语言独立页面。
  - **Google Gemini Pro 翻译流水线**：内置 `npm run translate` 与 `npm run new` 自动化文学级翻译，自动为金句补齐 4 国高质量译文与出处。
- 🤖 **2026 AI-Ready & GEO 检索优化**:
  - 严格遵循 `/llms.txt`（精炼摘要）与 `/llms-full.txt`（全文语料）规范，便于 ChatGPT、Perplexity、Claude 等 AI 搜索引擎精准抓取与检索。
  - 自动注入 `schema.org/SocialMediaPosting` 结构化数据 (JSON-LD) 与多语言 `hreflang` 标签。
  - 纯静态开放 JSON API (`/api/memos.json`) 与 RSS 2.0 订阅源 (`/rss.xml`)。
- 🔄 **自动同步至 Twitter (X)**:
  - 提交 Markdown 到 GitHub，GitHub Actions 自动构建部署并调用 Twitter 官方 Free API 秒级发推（完全免费）。

---

## 🚀 快速上手与本地开发

### 1. 安装依赖与启动
```bash
# 进入项目目录
cd quotes

# 安装依赖
npm install

# 启动本地开发服务 (支持实时热重载)
npm run dev
```
打开浏览器访问: `http://localhost:4321`

### 2. 交互式快速发布新金句 (支持 Gemini 自动翻译)
无需手动手写 Frontmatter，运行一行命令交互式录入：
```bash
npm run new
```
终端会引导您输入：
1. **金句正文 (Content)**
2. **来源/出处 (Source)**（如：查理·芒格 / 《置身事内》）
3. **话题标签 (Tags)**（如：思考, 读书笔记）
4. **心情表情 (Mood)**（如：💡, 🎲, ☕, 🌌）
5. **是否置顶 (Pinned)**

若在 `.env` 中配置了 `GEMINI_API_KEY`，脚本会在录入后**自动调用 Gemini Pro 生成英、日、韩、越四国译文**并存盘！

### 3. 一键批量补齐历史多语言翻译
为历史现存的金句自动补全多语言翻译：
```bash
npm run translate
```

### 4. 本地构建与产物预览
```bash
# 静态全量构建
npm run build

# 本地预览构建产物
npm run preview
```

---

## 🐳 Docker 本地一键容器化部署

本项目已预置基于 **Nginx Alpine** 的极轻量多阶段 Dockerfile（最终镜像体积小于 25MB，内存占用仅约 5MB，带 Gzip 压缩与静态长缓存优化）。

### 方式一：使用 Docker Compose（推荐）
```bash
# 一键编译并启动容器
docker compose up -d --build
```
启动后访问：`http://localhost:8080`

### 方式二：使用原生 Docker 命令
```bash
# 1. 构建 Docker 镜像
npm run docker:build
# 或: docker build -t quotes .

# 2. 运行容器 (映射到 8080 端口)
npm run docker:run
# 或: docker run -d -p 8080:80 --name quotes quotes
```
停止与清理容器：
```bash
docker stop quotes && docker rm quotes
```

---

## ☁️ 部署至 Cloudflare Pages 教程

本项目已内置全自动化流水线 `.github/workflows/deploy.yml`。

### 步骤一：推送到 GitHub
1. 在 GitHub 上新建仓库（例如 `quotes`）。
2. 在本地执行推送：
   ```bash
   git add .
   git commit -m "feat: initial commit"
   git branch -M main
   git remote add origin https://github.com/你的用户名/quotes.git
   git push -u origin main
   ```

### 步骤二：获取 Cloudflare 凭证
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)。
2. 进入 **Workers & Pages** -> **Create application** -> **Pages** -> 点击 **Connect to Git** 或选择 **Direct Upload** 创建一个项目（记下 Project Name，例如 `quotes`）。
3. 获取 **Account ID**：在 Cloudflare 控制台主页右侧栏复制 `Account ID`。
4. 创建 **API Token**：
   - 点击右上角头像 -> **My Profile** -> **API Tokens** -> **Create Token**。
   - 使用 **Cloudflare Pages** 模板，权限选择 `Pages:Edit`，生成 Token 并保存。

### 步骤三：在 GitHub 仓库中配置 Secrets
进入 GitHub 仓库页面 -> **Settings** -> **Secrets and variables** -> **Actions** -> 点击 **New repository secret**，添加以下三个密钥：

| Secret 名称 | 说明 | 示例 |
| :--- | :--- | :--- |
| `CLOUDFLARE_API_TOKEN` | 上一步生成的 Cloudflare API Token | `xxxxxxxx...` |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 账号 ID | `xxxxxxxx...` |
| `CLOUDFLARE_PROJECT_NAME` | Cloudflare Pages 项目名称 | `quotes` |

配置好后，每次 `git push main`，GitHub Actions 就会在数十秒内自动编译并完成全球 CDN 部署！

---

## 🐦 配置 Twitter (X) 自动发推同步 (100% 免费)

GitHub Actions 会在每次部署成功后自动调用 `scripts/sync-twitter.mjs` 将最新金句发布到您的 Twitter 账号。

### 步骤一：获取 Twitter 官方 Free API
1. 登录 [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)。
2. 创建一个 Project & App，默认即享受 **Free Tier（每月 500 条推文免费额度，个人完全用不完）**。
3. 在 App 的 **User authentication settings** 中：
   - App permissions 选择 **Read and write**。
   - Type of App 选择 **Web App**。
4. 进入 **Keys and Tokens** 标签页，生成并复制以下 4 个密钥：
   - `API Key` (Consumer Key)
   - `API Key Secret` (Consumer Secret)
   - `Access Token`
   - `Access Token Secret`

### 步骤二：在 GitHub 仓库添加 Twitter Secrets
进入 GitHub 仓库 **Settings** -> **Secrets and variables** -> **Actions**，添加以下 4 个 Secret：
- `TWITTER_API_KEY`
- `TWITTER_API_SECRET`
- `TWITTER_ACCESS_TOKEN`
- `TWITTER_ACCESS_SECRET`

> **提示**：如果未配置上述 Twitter Secret，部署流程仍会正常成功完成并自动跳过同步发推，不会中断部署。

---

## ⚙️ 个性化定制

打开 `src/utils/config.ts`，可自由定制您的站点信息与社交链接：
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

## 📄 页面与开放端点一览

- **主页时间流**: `/`
- **话题标签**: `/tags`
- **单条金句独立页**: `/memo/[id]`
- **关于本站**: `/about`
- **AI 语义索引**: `/llms.txt`
- **AI 全文语料**: `/llms-full.txt`
- **静态开放 JSON API**: `/api/memos.json`
- **RSS 2.0 订阅**: `/rss.xml`
- **Robots 规则**: `/robots.txt`
