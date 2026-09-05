import fs from 'fs';
import path from 'path';

// 读取 .env 中的 GEMINI_API_KEY
let apiKey = process.env.GEMINI_API_KEY;
if (!apiKey && fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf8');
  const match = envContent.match(/GEMINI_API_KEY=(.+)/);
  if (match) apiKey = match[1].trim();
}

if (!apiKey) {
  console.error('❌ 未在环境或 .env 中找到 GEMINI_API_KEY，请检查配置！');
  process.exit(1);
}

const MEMOS_DIR = path.resolve('src/content/memos');

// 简单 YAML Frontmatter 解析器
function parseMarkdown(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, rawFrontmatter: '', body: content.trim() };
  
  const rawFrontmatter = match[1];
  const body = match[2].trim();
  
  // 简易键值解析
  const lines = rawFrontmatter.split(/\r?\n/);
  let source = '';
  let hasTranslations = rawFrontmatter.includes('translations:');
  
  for (const line of lines) {
    if (line.startsWith('source:')) {
      source = line.replace('source:', '').trim().replace(/^["']|["']$/g, '');
    }
  }

  return { rawFrontmatter, body, source, hasTranslations };
}

// 格式化转义 YAML 字符串
function escapeYaml(str) {
  if (!str) return '""';
  return JSON.stringify(str);
}

// 调用 Gemini API 进行多语言文学翻译（支持自动重试与备选模型）
async function translateWithGemini(content, source) {
  const models = ['gemini-3.6-flash', 'gemini-flash-latest', 'gemini-2.5-flash-lite'];
  const prompt = `You are an expert literary translator specializing in philosophical quotes, aphorisms, and timeless wisdom.
Translate the following quote and its source into English (en), Japanese (ja), Korean (ko), and Vietnamese (vi).

Guidelines:
1. Tone must be philosophical, concise, and aphoristic, matching classic literary book translations.
2. For authors, thinkers, and book titles, use the canonical recognized translated names in each target language.
3. For Vietnamese (vi), ensure full and strictly accurate Vietnamese diacritical marks.
4. Output STRICT JSON format only:
{
  "en": { "content": "...", "source": "..." },
  "ja": { "content": "...", "source": "..." },
  "ko": { "content": "...", "source": "..." },
  "vi": { "content": "...", "source": "..." }
}

Content to translate:
${content}

Source to translate:
${source || '未知'}`;

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: 'application/json'
    }
  };

  let lastError = null;

  for (const model of models) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });

        if (res.status === 503 || res.status === 429) {
          console.log(`   ⚠️ ${model} 繁忙 (${res.status})，等待 2 秒后重试...`);
          await new Promise(r => setTimeout(r, 2000));
          continue;
        }

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`Gemini API Error (${res.status}): ${errText}`);
        }

        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error('No text returned from Gemini');
        return JSON.parse(text);
      } catch (err) {
        lastError = err;
        await new Promise(r => setTimeout(r, 1500));
      }
    }
  }

  throw lastError || new Error('All model attempts failed');
}

// 组装带多语言的 Frontmatter
function injectTranslations(rawFrontmatter, translations) {
  // 如果已有 translations，先剥离
  let cleanFm = rawFrontmatter.replace(/\ntranslations:[\s\S]*?(?=\n[a-zA-Z0-9_-]+:|$)/, '').trim();
  
  let transYaml = '\ntranslations:\n';
  for (const lang of ['en', 'ja', 'ko', 'vi']) {
    const item = translations[lang] || { content: '', source: '' };
    transYaml += `  ${lang}:\n`;
    transYaml += `    content: ${escapeYaml(item.content)}\n`;
    if (item.source) {
      transYaml += `    source: ${escapeYaml(item.source)}\n`;
    }
  }

  return cleanFm + transYaml;
}

async function main() {
  const isForce = process.argv.includes('--force');
  const files = fs.readdirSync(MEMOS_DIR).filter(f => f.endsWith('.md') && !f.startsWith('_'));
  
  console.log(`🌐 找到 ${files.length} 条金句 Markdown 文件，准备进行多语言翻译...`);

  let count = 0;
  for (const file of files) {
    const filePath = path.join(MEMOS_DIR, file);
    const rawContent = fs.readFileSync(filePath, 'utf8');
    const { rawFrontmatter, body, source, hasTranslations } = parseMarkdown(rawContent);

    if (hasTranslations && !isForce) {
      console.log(`⏩ [跳过] ${file} (已有翻译，使用 --force 可覆盖)`);
      continue;
    }

    console.log(`\n⏳ [翻译中] ${file}...`);
    console.log(`   正文: ${body.slice(0, 40)}...`);
    console.log(`   出处: ${source || '无'}`);

    try {
      const translations = await translateWithGemini(body, source);
      const newFrontmatter = injectTranslations(rawFrontmatter, translations);
      const newFileContent = `---\n${newFrontmatter}\n---\n\n${body}\n`;
      
      fs.writeFileSync(filePath, newFileContent, 'utf8');
      console.log(`✅ [已写入] ${file}`);
      console.log(`   EN: ${translations.en?.content?.slice(0, 35)}...`);
      console.log(`   JA: ${translations.ja?.content?.slice(0, 35)}...`);
      console.log(`   KO: ${translations.ko?.content?.slice(0, 35)}...`);
      console.log(`   VI: ${translations.vi?.content?.slice(0, 35)}...`);
      count++;

      // 适当延时防频控
      await new Promise(resolve => setTimeout(resolve, 800));
    } catch (err) {
      console.error(`❌ [失败] ${file}:`, err.message);
    }
  }

  console.log(`\n🎉 全部处理完毕！本次共成功翻译并写入 ${count} 条金句。`);
}

main().catch(console.error);
