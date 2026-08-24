// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/content',
    'motion-v/nuxt',
    'nuxt-studio',
  ],

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },

  studio: {
    route: '/admin',

    repository: {
      provider: 'github',
      owner: 'mahzenbio',
      repo: 'mahzen.bio.web',
      branch: 'main',
    },
  },

  content: {
    experimental: {
      sqliteConnector: 'native',
    },
  },

  runtimeConfig: {
    resend: {
      apiKey: '',
      from: '',
      to: '',
    },

    public: {
      siteUrl: 'https://mahzenbio.vercel.app',
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/robots.txt', '/sitemap.xml', '/rss.xml'],
    },

    routeRules: {
      '/blog': { redirect: { to: '/', statusCode: 301 } },
    },
  },
})
