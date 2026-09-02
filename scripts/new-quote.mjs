#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
  console.log('\n✨ 新建金句 / 碎碎念 (Quick Post Creator)\n');

  const content = await question('📝 请输入金句正文 (Content): ');
  if (!content.trim()) {
    console.error('❌ 金句内容不能为空！');
    rl.close();
    process.exit(1);
  }

  const source = await question('📖 来源/出处 (如: 查理·芒格 / 《置身事内》/ 留空): ');
  const tagsInput = await question('🏷️  标签 (英文逗号分隔，如: 思考,读书笔记 / 留空): ');
  const mood = await question('🌟 心情/微标 (如: 💡, ☕, 🌌, 📚 / 留空): ');
  const isPinned = await question('📌 是否置顶? (y/N): ');

  const now = new Date();
  const dateStr = now.toISOString();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  const filename = `${year}-${month}-${day}-${hours}${minutes}${seconds}.md`;
  const dirPath = path.resolve(process.cwd(), 'src/content/memos');

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const tags = tagsInput
    ? tagsInput.split(/[,，]/).map(t => t.trim()).filter(Boolean)
    : [];

  let frontmatter = `---
date: ${dateStr}
`;

  if (isPinned.trim().toLowerCase() === 'y') {
    frontmatter += `pinned: true\n`;
  }
  if (tags.length > 0) {
    frontmatter += `tags: ${JSON.stringify(tags)}\n`;
  }
  if (source.trim()) {
    frontmatter += `source: "${source.trim()}"\n`;
  }
  if (mood.trim()) {
    frontmatter += `mood: "${mood.trim()}"\n`;
  }
  frontmatter += `likes: 0\n---\n\n`;

  const fullContent = frontmatter + content.trim() + '\n';
  const filePath = path.join(dirPath, filename);

  fs.writeFileSync(filePath, fullContent, 'utf-8');

  console.log(`\n🎉 创建成功！文件路径: src/content/memos/${filename}`);
  console.log(`👉 运行 'git add .' -> 'git commit -m "add memo"' -> 'git push' 即可自动部署并同步发推！\n`);

  rl.close();
}

main().catch((err) => {
  console.error('Error:', err);
  rl.close();
  process.exit(1);
});
