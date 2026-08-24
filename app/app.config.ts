import type { SiteAppConfig } from './types/site'

const site = {
  name: 'mahzen.bio',

  navigation: [
    {
      label: 'Yazılar',
      to: '/',
    },
    {
      label: 'İletişim',
      to: '/contact',
    },
  ],

  footer: {
    credits: `© ${new Date().getFullYear()} mahzen.bio`,

    links: [
      {
        icon: 'i-simple-icons-github',
        to: 'https://github.com/mahzenbio',
        ariaLabel: 'GitHub',
        target: '_blank',
      },
      {
        icon: 'i-lucide-mail',
        to: '/contact',
        ariaLabel: 'İletişim',
      },
      {
        icon: 'i-lucide-rss',
        to: '/rss.xml',
        ariaLabel: 'RSS akışı',
        target: '_blank',
      },
    ],
  },
} satisfies SiteAppConfig

export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral',
    },

    pageHero: {
      slots: {
        container: 'py-14 sm:py-18 lg:py-24',

        title: [
          'mx-0 max-w-2xl text-left',
          'text-pretty text-3xl font-medium',
          'sm:text-4xl lg:text-5xl',
        ].join(' '),

        description: [
          'mx-0 mt-3 max-w-2xl text-left',
          'text-pretty text-base text-muted',
        ].join(' '),
      },
    },

    blogPost: {
      slots: {
        title: 'text-lg text-pretty font-medium text-highlighted',
        description: 'mt-1.5 text-sm text-pretty line-clamp-3',
        date: 'text-xs text-muted',
        meta: 'flex items-center gap-2 mb-2.5',
      },
    },
  },

  ...site,
})
