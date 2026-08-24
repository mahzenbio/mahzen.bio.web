<script setup lang="ts">
const { data: page } = await useAsyncData(
  'contact-page',
  () => queryCollection('contact').first(),
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
    <section class="border-b border-default">
      <UContainer class="py-14 sm:py-16 lg:py-20">
        <h1
          class="
            text-pretty text-3xl font-medium tracking-tight text-highlighted
            sm:text-4xl
          "
        >
          {{ page.title }}
        </h1>

        <p class="mt-4 max-w-2xl text-pretty text-base text-muted">
          {{ page.description }}
        </p>
      </UContainer>
    </section>

    <UContainer class="py-14 sm:py-16">
      <ContactForm v-bind="page.form" />
    </UContainer>
  </UPage>
</template>
