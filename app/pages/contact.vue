<script setup lang="ts">
const { data: page } = await useAsyncData(
  'contact-page',
  () => {
    return queryCollection('contact')
      .first()
  },
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'İletişim sayfası içeriği bulunamadı',
    fatal: true,
  })
}

const { public: { siteUrl } } = useRuntimeConfig()

const title = page.value.seo?.title ?? page.value.title
const description = page.value.seo?.description ?? page.value.description
const ogImage = new URL('/og.png', siteUrl).href

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage,
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: ogImage,
})
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
    />

    <UPageSection
      :ui="{
        container: 'pt-0!',
      }"
    >
      <ContactForm v-bind="page.form" />
    </UPageSection>
  </UPage>
</template>
