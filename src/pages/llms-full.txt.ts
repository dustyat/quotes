import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_CONFIG } from '@/utils/config';

export const GET: APIRoute = async () => {
  const allMemos = await getCollection('memos');
  const sortedMemos = allMemos.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  let content = `# Full Quotes & Memos Corpus - ${SITE_CONFIG.title}\n`;
  content += `Generated at: ${new Date().toISOString()}\n`;
  content += `Author: ${SITE_CONFIG.author.name}\n\n`;

  sortedMemos.forEach((memo, idx) => {
    const memoId = memo.id.replace(/\.md$/, '');
    content += `### Quote #${idx + 1} (${memo.data.date.toISOString().split('T')[0]})\n`;
    if (memo.data.source) {
      content += `Source: ${memo.data.source}\n`;
    }
    if (memo.data.tags && memo.data.tags.length > 0) {
      content += `Tags: ${memo.data.tags.map(t => '#' + t).join(', ')}\n`;
    }
    content += `URL: ${SITE_CONFIG.siteUrl}/memo/${memoId}\n\n`;
    content += `${(memo.body || '').trim()}\n\n`;
    content += `---\n\n`;
  });

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
