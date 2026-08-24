<script setup lang="ts">
import NumberFlow from '@number-flow/vue'

const { data: page } = await useAsyncData(
  'blog-page',
  () => queryCollection('blogPage').first(),
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Blog sayfası içeriği bulunamadı',
    fatal: true,
  })
}

const { data: posts } = await useAsyncData(
  'blog-posts',
  () => {
    return queryCollection('blog')
      .where('draft', '=', false)
      .order('date', 'DESC')
      .all()
  },
)

const count = computed(() => posts.value?.length ?? 0)

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
    <UContainer class="pb-20 pt-16 sm:pb-28 sm:pt-24">
      <h1
        class="
          text-pretty text-4xl font-semibold tracking-tight text-highlighted
          sm:text-5xl lg:text-6xl
        "
      >
        {{ page.title }}
      </h1>

      <p class="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted">
        {{ page.description }}
      </p>

      <p class="eyebrow mt-8 flex items-center gap-1.5 text-dimmed">
        <NumberFlow
          :value="count"
          class="tabular-nums text-toned"
        />
        yazı
      </p>

      <BlogPostList
        v-if="count"
        :posts="posts!"
        class="mt-12"
      />

      <UEmpty
        v-else
        icon="i-lucide-pen-line"
        title="Henüz yayımlanmış bir yazı yok."
        class="mt-12"
      />
    </UContainer>
  </UPage>
</template>
