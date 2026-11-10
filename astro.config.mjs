// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://json2x.com',
  output: 'static',
  i18n: {
    locales: ['en', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false
    }
  },
  build: {
    format: 'file'
  },
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/500'),
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          es: 'es',
          ja: 'ja',
          fr: 'fr',
          de: 'de',
          pt: 'pt',
          ko: 'ko',
          it: 'it'
        }
      },
      namespaces: {
        xhtml: true
      },
      serialize(item) {
        if (item.links && item.links.length > 0) {
          const enLink = item.links.find((l) => l.lang === 'en');
          if (item.links.length === 8 && enLink) {
            const hasXDefault = item.links.some((l) => l.lang === 'x-default');
            return {
              ...item,
              links: hasXDefault
                ? item.links
                : [...item.links, { lang: 'x-default', url: enLink.url }]
            };
          }
          // Strip partial/orphan links if a route is not localized across all 8 locales
          const { links: _dropped, ...rest } = item;
          return rest;
        }
        return item;
      }
    })
  ]
});
