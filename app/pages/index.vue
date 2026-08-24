<script setup lang="ts">
const { data: page } = await useAsyncData(
  'index-page',
  () => {
    return queryCollection('index')
      .first()
  },
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Ana sayfa içeriği bulunamadı',
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
      <h2 class="mb-8 text-lg font-medium text-highlighted">
        {{ page.blog.title }}
      </h2>

      <UBlogPosts
        v-if="posts?.length"
        orientation="horizontal"
        class="gap-8 lg:gap-y-10"
      >
        <Motion
          v-for="(post, index) in posts"
          :key="post.id"
          :initial="{ opacity: 0, transform: 'translateY(12px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ duration: 0.35, delay: Math.min(index, 3) * 0.08 }"
          :in-view-options="{ once: true }"
        >
          <BlogPostCard :post="post" />
        </Motion>
      </UBlogPosts>

      <UEmpty
        v-else
        icon="i-lucide-pen-line"
        :title="page.blog.empty"
      />
    </UPageSection>
  </UPage>
</template>
