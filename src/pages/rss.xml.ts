import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_CONFIG } from '@/utils/config';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const allMemos = await getCollection('memos');
  const sortedMemos = allMemos.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    site: context.site || SITE_CONFIG.siteUrl,
    items: sortedMemos.map((memo) => {
      const memoId = memo.id.replace(/\.md$/, '');
      const bodyText = memo.body || '';
      return {
        title: memo.data.source ? `[${memo.data.source}] ${bodyText.slice(0, 30)}...` : bodyText.slice(0, 40),
        pubDate: memo.data.date,
        description: bodyText,
        link: `/memo/${memoId}/`,
        categories: memo.data.tags,
      };
    }),
    customData: `<language>zh-CN</language>`,
  });
}
