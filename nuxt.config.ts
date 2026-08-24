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

      // On Vercel, NuxtImg emits /_vercel/image URLs that only exist at runtime.
      // The crawler would follow them and fail the build with a 404.
      ignore: ['/_vercel'],
    },
  },
})
