import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://quotes.dustyat.com',
  integrations: [sitemap()],
  output: 'static',
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en', 'ja', 'ko', 'vi'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  build: {
    format: 'directory'
  }
});
