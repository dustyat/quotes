#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

function extractSection(body, headerKeyword) {
  const regex = new RegExp(`###\\s*[^\\r\\n]*${headerKeyword}[^\\r\\n]*\\r?\\n+([\\s\\S]*?)(?=(?:\\r?\\n###\\s*|$))`, 'i');
  const match = body.match(regex);
  if (!match) return '';
  let text = match[1].trim();
  if (text === '_No response_') return '';
  return text;
}

export function parseIssueBody(body, createdAt = null) {
  let content = '';
  let source = '';
  const tags = new Set();
  let mood = '';
  let pinned = false;
  let targetDate = createdAt ? new Date(createdAt) : new Date();

  // 1. 判断是否匹配 Issue Form 模板格式
  const formContent = extractSection(body, '金句正文');

  if (formContent) {
    // === 结构化模板模式 ===
    content = formContent;

    // 来源
    source = extractSection(body, '来源');

    // 常用标签快捷多选 (- [x] 思考)
    const tagsSection = extractSection(body, '常用标签');
    if (tagsSection) {
      const checkboxMatches = tagsSection.matchAll(/-\s*\[x\]\s*([^\r\n]+)/gi);
      for (const m of checkboxMatches) {
        const tag = m[1].trim();
        if (tag) tags.add(tag);
      }
    }

    // 自定义补充标签
    const customTags = extractSection(body, '其它补充标签');
    if (customTags) {
      customTags.split(/[,，]/).map(t => t.trim()).filter(Boolean).forEach(t => tags.add(t));
    }

    // 心情表情 (如 "💡 (灵感/洞察)" -> "💡")
    const rawMood = extractSection(body, '心情');
    if (rawMood) {
      const firstToken = rawMood.split(/\s+/)[0].trim();
      mood = firstToken || rawMood;
    }

    // 自定义日期
    const customDateStr = extractSection(body, '自定义发布时间');
    if (customDateStr) {
      const parsed = new Date(customDateStr.replace(/\./g, '-'));
      if (!isNaN(parsed.getTime())) {
        targetDate = parsed;
      }
    }

    // 置顶
    const pinnedSection = extractSection(body, '置顶设置');
    if (pinnedSection && /-\s*\[x\]/i.test(pinnedSection)) {
      pinned = true;
    }

  } else {
    // === 纯文本自由模式兼容 ===
    let rawText = body.trim();

    // 尝试匹配 "> 来源：xxx" / "> 出处：xxx"
    const sourceMatch = rawText.match(/>\s*(?:来源|出处|作者)[：:]\s*([^\r\n]+)/i);
    if (sourceMatch) {
      source = sourceMatch[1].trim();
      rawText = rawText.replace(sourceMatch[0], '');
    }

    // 尝试匹配 "> 标签：xxx"
    const tagsMatch = rawText.match(/>\s*(?:标签|分类|Tags?)[：:]\s*([^\r\n]+)/i);
    if (tagsMatch) {
      tagsMatch[1].split(/[,，]/).map(t => t.trim()).filter(Boolean).forEach(t => tags.add(t));
      rawText = rawText.replace(tagsMatch[0], '');
    }

    // 尝试匹配 "> 心情：xxx"
    const moodMatch = rawText.match(/>\s*(?:心情|表情|Mood)[：:]\s*([^\r\n]+)/i);
    if (moodMatch) {
      mood = moodMatch[1].trim();
      rawText = rawText.replace(moodMatch[0], '');
    }

    content = rawText.trim();
  }

  if (!content) {
    throw new Error('❌ 未能解析出金句正文内容，请检查 Issue 内容！');
  }

  return {
    content,
    source,
    tags: Array.from(tags),
    mood,
    pinned,
    date: targetDate,
  };
}

export function generateMemoFile({ content, source, tags, mood, pinned, date }, outputDir) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  const baseFilename = `${year}-${month}-${day}-${hours}${minutes}${seconds}`;
  let filename = `${baseFilename}.md`;
  let counter = 1;

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  while (fs.existsSync(path.join(outputDir, filename))) {
    filename = `${baseFilename}-${counter++}.md`;
  }

  let frontmatter = `---
date: ${date.toISOString()}
`;

  if (pinned) {
    frontmatter += `pinned: true\n`;
  }
  if (tags && tags.length > 0) {
    frontmatter += `tags: ${JSON.stringify(tags)}\n`;
  }
  if (source) {
    frontmatter += `source: "${source.replace(/"/g, '\\"')}"\n`;
  }
  if (mood) {
    frontmatter += `mood: "${mood.replace(/"/g, '\\"')}"\n`;
  }
  frontmatter += `likes: 0\n---\n\n`;

  const fullText = frontmatter + content + '\n';
  const filePath = path.join(outputDir, filename);

  fs.writeFileSync(filePath, fullText, 'utf-8');
  return { filename, filePath };
}

// CLI 执行入口
async function main() {
  const isTest = process.argv.includes('--test');

  if (isTest) {
    console.log('🧪 正在运行测试解析用例...');
    const sampleBody = `### 金句正文

反过来想，总是反过来想。
对于复杂的系统，倒过来看问题往往能够带来意想不到的清晰。

### 来源 / 出处 / 作者

查理·芒格 ·《穷查理宝典》

### 常用标签（可快捷多选）

- [x] 思考
- [x] 读书笔记
- [ ] 投资

### 其它补充标签

思维模型, 决策

### 心情 / 微标表情

💡 (灵感/洞察)

### 自定义发布时间（可选）

2026-09-04 14:00:00

### 置顶设置

- [x] 📌 将此条金句置顶在首页最上方
`;

    const parsed = parseIssueBody(sampleBody);
    console.log('✅ 解析结果:', parsed);

    const testDir = path.resolve(process.cwd(), 'src/content/memos');
    const { filename, filePath } = generateMemoFile(parsed, testDir);
    console.log(`🎉 测试文件生成成功: ${filePath}`);

    // 清理测试文件
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log('🧹 测试文件已清理完毕');
    }
    return;
  }

  const issueBody = process.env.ISSUE_BODY;
  const issueCreatedAt = process.env.ISSUE_CREATED_AT;

  if (!issueBody) {
    console.error('❌ 缺少环境变量 ISSUE_BODY');
    process.exit(1);
  }

  const parsed = parseIssueBody(issueBody, issueCreatedAt);
  const targetDir = path.resolve(process.cwd(), 'src/content/memos');
  const { filename } = generateMemoFile(parsed, targetDir);

  console.log(`✅ 成功生成金句文件: src/content/memos/${filename}`);
}

// 仅在直接执行时调用 main
if (process.argv[1] && (path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname) || process.argv[1].endsWith('publish-from-issue.mjs'))) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
