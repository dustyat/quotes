import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://memos.example.com', // 替换为您的实际部署域名
  integrations: [sitemap()],
  output: 'static',
  build: {
    format: 'directory'
  }
});
