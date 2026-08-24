<script setup lang="ts">
const { data: page } = await useAsyncData(
  'index-page',
  () => queryCollection('index').first(),
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Ana sayfa içeriği bulunamadı',
    fatal: true,
  })
}

const { data: posts } = await useAsyncData(
  'index-posts',
  () => {
    return queryCollection('blog')
      .where('draft', '=', false)
      .order('date', 'DESC')
      .limit(7)
      .all()
  },
)

const featured = computed(() => posts.value?.[0])
const latest = computed(() => posts.value?.slice(1) ?? [])

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
    <HomeHero :page="page" />

    <UContainer v-if="featured" class="py-20 sm:py-24">
      <SectionHeading
        :eyebrow="page.blog.featuredEyebrow"
        :title="page.blog.featuredTitle"
      />

      <BlogPostCard :post="featured" featured />
    </UContainer>

    <UContainer v-if="latest.length" class="pb-20 sm:pb-28">
      <USeparator class="mb-20 sm:mb-24" />

      <SectionHeading
        :eyebrow="page.blog.latestEyebrow"
        :title="page.blog.latestTitle"
        to="/blog"
        :link-label="page.blog.allLabel"
      />

      <BlogPostGrid :posts="latest" />
    </UContainer>

    <UContainer v-if="!posts?.length" class="py-24">
      <UEmpty
        icon="i-lucide-pen-line"
        :title="page.blog.empty"
      />
    </UContainer>

    <section class="border-t border-default bg-muted/50">
      <UContainer class="py-20 text-center sm:py-24">
        <h2
          class="
            text-pretty text-2xl font-semibold tracking-tight text-highlighted
            sm:text-3xl
          "
        >
          {{ page.cta.title }}
        </h2>

        <p
          class="
            mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed
            text-muted
          "
        >
          {{ page.cta.description }}
        </p>

        <UButton
          to="/contact"
          :label="page.cta.label"
          trailing-icon="i-lucide-arrow-right"
          color="neutral"
          size="lg"
          class="mt-8"
        />
      </UContainer>
    </section>
  </UPage>
</template>
