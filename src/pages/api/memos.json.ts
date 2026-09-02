import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_CONFIG } from '@/utils/config';
import { formatFullDate } from '@/utils/date';

export const GET: APIRoute = async () => {
  const allMemos = await getCollection('memos');
  const sortedMemos = allMemos.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const data = sortedMemos.map((memo) => {
    const memoId = memo.id.replace(/\.md$/, '');
    return {
      id: memoId,
      content: (memo.body || '').trim(),
      date: memo.data.date.toISOString(),
      formattedDate: formatFullDate(memo.data.date),
      pinned: memo.data.pinned || false,
      source: memo.data.source || null,
      mood: memo.data.mood || null,
      tags: memo.data.tags || [],
      author: memo.data.author || {
        name: SITE_CONFIG.author.name,
        handle: SITE_CONFIG.author.handle,
      },
      url: `${SITE_CONFIG.siteUrl}/memo/${memoId}`,
    };
  });

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=1800',
    },
  });
};
