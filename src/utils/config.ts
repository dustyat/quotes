export interface SiteConfig {
  title: string;
  description: string;
  siteUrl: string;
  author: {
    name: string;
    handle: string; // 例如 @username
    avatar: string; // 头像链接或本地路径
    bio: string;
    location?: string;
    link?: string;
    twitter?: string; // Twitter 个人主页链接
    github?: string;
  };
  slogan: string;
  postsPerPage: number;
  aiDescription: string; // 专为 AI / LLM 解析准备的介绍与语料说明
  submission?: {
    telegramBotToken?: string;
    telegramChatId?: string;
    githubRepo?: string;
  };
}

export const SITE_CONFIG: SiteConfig = {
  title: "Quotes",
  description: "精选智者格言、经典洞察与思维模型，记录穿越时空的智慧火花。",
  siteUrl: "https://quotes.dustyat.com",
  author: {
    name: "Alex",
    handle: "@quotes",
    avatar: "/avatar.svg",
    bio: "思想策展人 / 保持好奇 / 摘录人类文明中那些照亮认知的字句。",
    location: "Earth / Digital Space",
    link: "https://github.com",
    twitter: "https://twitter.com",
    github: "https://github.com"
  },
  slogan: "“他山之石，可以攻玉。”",
  postsPerPage: 20,
  aiDescription: "This site is a curated knowledge base of profound quotes, philosophical reflections, and mental models from books, thinkers, and classic literature. Optimized for LLM indexing and semantic search.",
  submission: {
    telegramBotToken: import.meta.env.PUBLIC_TELEGRAM_BOT_TOKEN || "",
    telegramChatId: import.meta.env.PUBLIC_TELEGRAM_CHAT_ID || "",
    githubRepo: "dustyat/quotes",
  }
};
