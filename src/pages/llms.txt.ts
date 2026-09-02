import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_CONFIG } from '@/utils/config';

export const GET: APIRoute = async () => {
  const allMemos = await getCollection('memos');
  const sortedMemos = allMemos.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  // 统计所有标签
  const uniqueTags = [...new Set(allMemos.flatMap((m) => m.data.tags || []))];

  const content = `# ${SITE_CONFIG.title}
> ${SITE_CONFIG.description}

Author: ${SITE_CONFIG.author.name} (${SITE_CONFIG.author.handle})
Bio: ${SITE_CONFIG.author.bio}
Website: ${SITE_CONFIG.siteUrl}

## About This Knowledge Base
${SITE_CONFIG.aiDescription}

## Topics & Tags
${uniqueTags.map((tag) => `- #${tag}: ${SITE_CONFIG.siteUrl}/tags/${encodeURIComponent(tag)}`).join('\n')}

## Recent Curated Quotes & Micro-thoughts
${sortedMemos.slice(0, 15).map((memo) => {
  const plain = (memo.body || '').replace(/[\n#*`_]/g, ' ').trim();
  const source = memo.data.source ? ` (Source: ${memo.data.source})` : '';
  const memoId = memo.id.replace(/\.md$/, '');
  return `- "${plain}"${source} [Link: ${SITE_CONFIG.siteUrl}/memo/${memoId}]`;
}).join('\n')}

## Full Corpus Export
For complete raw corpus ingestion, visit: ${SITE_CONFIG.siteUrl}/llms-full.txt
For JSON API, visit: ${SITE_CONFIG.siteUrl}/api/memos.json
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
