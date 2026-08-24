<script setup lang="ts">
import { tr } from '@nuxt/ui/locale'

const { name } = useAppConfig()
const { public: { siteUrl } } = useRuntimeConfig()

const colorMode = useColorMode()
const route = useRoute()

const themeColor = computed(() => {
  return colorMode.value === 'dark'
    ? '#0a0a0a'
    : '#ffffff'
})

const canonical = computed(() => {
  return new URL(route.path, siteUrl).href
})

useHead({
  htmlAttrs: {
    lang: 'tr',
  },

  titleTemplate: (title) => {
    return title
      ? `${title} — ${name}`
      : `${name} — Notlar ve yazılar`
  },

  meta: [
    {
      name: 'theme-color',
      content: themeColor,
    },
  ],

  link: [
    {
      rel: 'canonical',
      href: canonical,
    },
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg',
    },
    {
      rel: 'icon',
      sizes: 'any',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'alternate',
      type: 'application/rss+xml',
      title: `${name} — Yazılar`,
      href: '/rss.xml',
    },
    {
      rel: 'sitemap',
      type: 'application/xml',
      href: '/sitemap.xml',
    },
  ],
})

useSeoMeta({
  ogSiteName: name,
  ogType: 'website',
  ogUrl: canonical,
  ogLocale: 'tr_TR',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <UApp :locale="tr">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
