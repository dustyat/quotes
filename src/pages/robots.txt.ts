import type { APIRoute } from 'astro';
import { SITE_CONFIG } from '@/utils/config';

export const GET: APIRoute = async () => {
  const robots = `User-agent: *
Allow: /

# Explicitly welcome AI Search & Crawlers
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${SITE_CONFIG.siteUrl}/sitemap-index.xml
LLMs-txt: ${SITE_CONFIG.siteUrl}/llms.txt
`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
