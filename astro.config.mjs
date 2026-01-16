import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://nosuicide.site',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    build: {
      cssMinify: true
    }
  }
});
