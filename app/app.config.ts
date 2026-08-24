import type { SiteAppConfig } from './types/site'

const site = {
  name: 'mahzen.bio',
  wordmark: 'mahzen',

  navigation: [
    {
      label: 'Yazılar',
      to: '/blog',
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

  },

  ...site,
})
