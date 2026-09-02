#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// 解析命令行参数
const isDryRun = process.argv.includes('--dry-run');

// 环境变量
const API_KEY = process.env.TWITTER_API_KEY;
const API_SECRET = process.env.TWITTER_API_SECRET;
const ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN;
const ACCESS_SECRET = process.env.TWITTER_ACCESS_SECRET;

async function main() {
  console.log('🚀 Twitter (X) 自动同步程序启动...');

  if (!API_KEY || !API_SECRET || !ACCESS_TOKEN || !ACCESS_SECRET) {
    if (isDryRun) {
      console.log('ℹ️  [Dry Run 模式] 未检测到 Twitter 环境变量，将仅执行内容解析测试。');
    } else {
      console.log('⚠️ 未检测到 Twitter API 凭据 (TWITTER_API_KEY 等)，跳过自动发推同步。');
      console.log('💡 若需自动同步，请在 GitHub 仓库 Settings -> Secrets 中配置相关凭据。');
      process.exit(0);
    }
  }

  // 1. 读取最新的 memo 文件
  const memosDir = path.resolve(process.cwd(), 'src/content/memos');
  if (!fs.existsSync(memosDir)) {
    console.log('❌ 未找到 memos 目录。');
    process.exit(0);
  }

  const files = fs.readdirSync(memosDir).filter(f => f.endsWith('.md'));
  if (files.length === 0) {
    console.log('ℹ️  没有发现 memo 文件。');
    process.exit(0);
  }

  // 按照文件名或文件修改时间找到最新的一条
  files.sort().reverse();
  const latestFile = files[0];
  const filePath = path.join(memosDir, latestFile);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  // 2. 解析 Frontmatter 和正文
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    console.log('❌ 无法解析 Frontmatter 结构。');
    process.exit(0);
  }

  const rawBody = match[2].trim();
  const frontmatterStr = match[1];

  // 提取 source 和 tags
  let source = '';
  const sourceMatch = frontmatterStr.match(/source:\s*"([^"]+)"/);
  if (sourceMatch) source = sourceMatch[1];

  let tags = [];
  const tagsMatch = frontmatterStr.match(/tags:\s*\[(.*?)\]/);
  if (tagsMatch) {
    tags = tagsMatch[1].split(',').map(t => t.replace(/["']/g, '').trim()).filter(Boolean);
  }

  // 3. 构建发送给 Twitter 的文本内容
  let tweetText = rawBody;
  if (source) {
    tweetText += `\n\n—— ${source}`;
  }
  if (tags.length > 0) {
    const hashTags = tags.map(t => `#${t.replace(/\s+/g, '')}`).join(' ');
    tweetText += `\n\n${hashTags}`;
  }

  console.log(`\n📄 最新金句文件: ${latestFile}`);
  console.log('📝 准备发布的推文内容:\n-----------------------------');
  console.log(tweetText);
  console.log('-----------------------------\n');

  if (isDryRun) {
    console.log('✅ [Dry Run] 推文解析与格式化测试成功完成！');
    process.exit(0);
  }

  // 4. 调用 Twitter API v2 发推
  try {
    const result = await postTweet(tweetText);
    console.log('🎉 成功同步发推至 Twitter (X)！ Tweet ID:', result?.data?.id || 'OK');
  } catch (error) {
    console.error('❌ 发推失败:', error.message || error);
    // 不强制中断 CI 构建
    process.exit(0);
  }
}

// OAuth 1.0a 签名与请求实现
async function postTweet(text) {
  const url = 'https://api.twitter.com/2/tweets';
  const method = 'POST';

  const oauthParams = {
    oauth_consumer_key: API_KEY,
    oauth_nonce: crypto.randomBytes(16).toString('hex'),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: ACCESS_TOKEN,
    oauth_version: '1.0',
  };

  // 生成签名基准字符串
  const paramString = Object.keys(oauthParams)
    .sort()
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(oauthParams[key])}`)
    .join('&');

  const baseString = `${method.toUpperCase()}&${encodeURIComponent(url)}&${encodeURIComponent(paramString)}`;
  const signingKey = `${encodeURIComponent(API_SECRET)}&${encodeURIComponent(ACCESS_SECRET)}`;

  const signature = crypto.createHmac('sha1', signingKey).update(baseString).digest('base64');
  oauthParams.oauth_signature = signature;

  const authHeader = 'OAuth ' + Object.keys(oauthParams)
    .sort()
    .map(key => `${encodeURIComponent(key)}="${encodeURIComponent(oauthParams[key])}"`)
    .join(', ');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorBody}`);
  }

  return await response.json();
}

main().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(0);
});
