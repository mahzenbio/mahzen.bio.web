<script setup lang="ts">
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

        <p class="mt-6 text-sm text-dimmed">
          {{ posts?.length ?? 0 }} yazı
        </p>
      </UContainer>
    </section>

    <UContainer class="py-14 sm:py-16">
      <UBlogPosts v-if="posts?.length" orientation="horizontal">
        <Motion
          v-for="(post, index) in posts"
          :key="post.id"
          :initial="{ opacity: 0, transform: 'translateY(12px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ duration: 0.35, delay: Math.min(index, 2) * 0.08 }"
          :in-view-options="{ once: true }"
        >
          <BlogPostCard :post="post" />
        </Motion>
      </UBlogPosts>

      <UEmpty
        v-else
        icon="i-lucide-pen-line"
        title="Henüz yayımlanmış bir yazı yok."
      />
    </UContainer>
  </UPage>
</template>
