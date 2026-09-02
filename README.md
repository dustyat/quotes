# 🏛️ Quotes (纯静态 Twitter 风格智者语录与金句空间)

基于 **Astro 5+ / 最新版** 构建的现代极简金句语录、思维模型与经典洞察纯静态站点。融合 Twitter / Threads 的美学排版与移动端专属体验，**全面针对 2026 AI 检索与 GEO 流量推广进行优化**，支持 **一键生成精美金句海报**，并通过 **GitHub Actions 自动构建部署到 Cloudflare Pages 并自动同步发推至 Twitter (X)**。

---

## ✨ 核心特性

- ⚡ **极致纯静态 (Astro SSG)**: 0 客户端 JS 运行时负担，秒级加载，零数据库，终身免费托管。
- 🎨 **2026 现代极简设计**:
  - 经典 Twitter/Threads 三栏式自适应布局。
  - 纯黑 OLED Dark Mode 与优雅 Clean Light Mode 随心切换。
  - 大字号金句排版，精致引用来源与心情表情微标。
- 📱 **移动端深度适配**:
  - 沉浸式毛玻璃 Floating 底部导航栏。
  - 适配手机屏幕手势与 iOS/Android 安全区（Safe Area Insets）。
- 🖼️ **一键生成金句海报 (Card to Image)**:
  - 内置 Canvas 实时海报引擎，点击即可生成拍立得/小红书/推特风格的高颜值金句分享图，一键保存或复制。
- 🤖 **2026 AI-Ready & GEO 优化**:
  - 遵循 `/llms.txt` 与 `/llms-full.txt` 规范，让 ChatGPT、Perplexity、Claude 等 AI 搜索引擎精准索引。
  - 自动注入 `schema.org/SocialMediaPosting` 结构化数据 (JSON-LD)。
  - 纯静态开放 JSON API (`/api/memos.json`) 与 RSS 2.0 订阅源。
- 🔄 **自动同步至 Twitter (X)**:
  - 提交 Markdown 到 GitHub，GitHub Actions 自动构建部署并调用 Twitter 官方 Free API 秒级发推（完全免费）。

---

## 🚀 快速上手与本地开发

### 1. 安装依赖与启动
```bash
# 进入项目目录
cd weibo

# 安装依赖
npm install

# 启动本地开发服务 (支持实时热重载)
npm run dev
```
打开浏览器访问: `http://localhost:4321`

### 2. 交互式快速发布新金句
无需手动手写 Frontmatter，运行一行命令交互式生成：
```bash
npm run new
```
终端会提示您输入：
1. 金句正文 (Content)
2. 来源/出处 (Source，如：查理·芒格 / 《置身事内》)
3. 话题标签 (Tags，如：思考, 读书笔记)
4. 心情表情 (Mood，如：💡, ☕, 🌌)
5. 是否置顶 (Pinned)

脚本将自动在 `src/content/memos/` 生成标准 Markdown 文件。

### 3. 本地构建与预览
```bash
# 静态构建
npm run build

# 本地预览静态产物
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
# 或: docker build -t whisper-quotes .

# 2. 运行容器 (映射到 8080 端口)
npm run docker:run
# 或: docker run -d -p 8080:80 --name whisper-quotes whisper-quotes
```
停止与清理：
```bash
docker stop whisper-quotes && docker rm whisper-quotes
```

---

## ☁️ 部署至 Cloudflare Pages 教程

本项目已内置全自动化流水线 `.github/workflows/deploy.yml`。

### 步骤一：推送到 GitHub
1. 在 GitHub 上新建一个仓库（例如 `my-memos`，公开或私有均可）。
2. 在本地执行：
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit"
   git branch -M main
   git remote add origin https://github.com/你的用户名/my-memos.git
   git push -u origin main
   ```

### 步骤二：获取 Cloudflare 凭证
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)。
2. 进入 **Workers & Pages** -> **Create application** -> **Pages** -> 点击 **Connect to Git** 或选择 **Direct Upload** 创建一个项目（记下 Project Name，例如 `my-memos`）。
3. 获取 **Account ID**：在 Cloudflare 控制台右侧栏即可复制 `Account ID`。
4. 创建 **API Token**：
   - 点击右上角个人头像 -> **My Profile** -> **API Tokens** -> **Create Token**。
   - 使用 **Cloudflare Pages** 模板，权限选择 `Pages:Edit`，生成 Token 并保存。

### 步骤三：在 GitHub 仓库中配置 Secrets
进入 GitHub 仓库页面 -> **Settings** -> **Secrets and variables** -> **Actions** -> 点击 **New repository secret**，添加以下三个密钥：

| Secret 名称 | 说明 | 示例 |
| :--- | :--- | :--- |
| `CLOUDFLARE_API_TOKEN` | 上一步生成的 Cloudflare API Token | `xxxxxxxx...` |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 账号 ID | `xxxxxxxx...` |
| `CLOUDFLARE_PROJECT_NAME` | Cloudflare Pages 项目名称 | `my-memos` |

配置好后，以后每次 `git push main`，GitHub Actions 就会在 30 秒内自动编译并完成全球部署！

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

> **提示**：如果未配置上述 Twitter Secret，部署流程仍会正常成功完成并自动跳过同步发推，不会报错中断。

---

## ⚙️ 个性化定制

打开 `src/utils/config.ts`，您可以修改站长信息：
```typescript
export const SITE_CONFIG = {
  title: "Whisper & Quotes",
  description: "现代极简个人金句与微语录...",
  siteUrl: "https://your-domain.com", // 替换为您绑定的实际域名
  author: {
    name: "你的名字",
    handle: "@yourhandle",
    avatar: "/avatar.svg", // 可替换为 public 目录下的头像图片
    bio: "你的个人简介...",
    twitter: "https://twitter.com/yourhandle",
    github: "https://github.com/yourhandle"
  },
  slogan: "“用简洁的文字，定格深邃的思考。”",
};
```

---

## 📄 页面与开放端点一览

- **主页时间流**: `/`
- **话题分类**: `/tags`
- **单条金句独立页**: `/memo/[id]`
- **关于作者**: `/about`
- **AI 语义索引**: `/llms.txt`
- **AI 全文语料**: `/llms-full.txt`
- **静态开放 JSON API**: `/api/memos.json`
- **RSS 2.0 订阅**: `/rss.xml`
- **Robots 规则**: `/robots.txt`
