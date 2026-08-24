<script setup lang="ts">
const route = useRoute()
const { name } = useAppConfig()
const { public: { siteUrl } } = useRuntimeConfig()

const { data: post } = await useAsyncData(
  route.path,
  () => {
    return queryCollection('blog')
      .path(route.path)
      .where('draft', '=', false)
      .first()
  },
)

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Yazı bulunamadı',
    fatal: true,
  })
}

const { data: surround } = await useAsyncData(
  `${route.path}-surround`,
  () => {
    return queryCollectionItemSurroundings(
      'blog',
      route.path,
      { fields: ['description'] },
    ).where('draft', '=', false).order('date', 'DESC')
  },
)

const imageUrl = computed(() => {
  return new URL(post.value!.image, siteUrl).href
})

useSeoMeta({
  title: post.value.title,
  description: post.value.description,
  ogTitle: post.value.title,
  ogDescription: post.value.description,
  ogType: 'article',
  ogImage: imageUrl,
  ogImageAlt: post.value.imageAlt,
  articlePublishedTime: new Date(post.value.date).toISOString(),
  articleSection: post.value.category,
  articleTag: post.value.tags,
  twitterTitle: post.value.title,
  twitterDescription: post.value.description,
  twitterImage: imageUrl,
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': post.value.title,
        'description': post.value.description,
        'image': imageUrl.value,
        'datePublished': new Date(post.value.date).toISOString(),
        'articleSection': post.value.category,
        'keywords': post.value.tags.join(', '),
        'mainEntityOfPage': new URL(route.path, siteUrl).href,
        'publisher': {
          '@type': 'Organization',
          'name': name,
        },
      }),
    },
  ],
})
</script>

<template>
  <UPage v-if="post">
    <UPageBody class="pt-8 sm:pt-10">
      <UButton
        to="/"
        icon="i-lucide-arrow-left"
        label="Tüm yazılar"
        color="neutral"
        variant="link"
        size="sm"
        class="-ml-2 px-2"
      />

      <article class="mt-6">
        <header class="mx-auto max-w-3xl">
          <div class="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
            <UBadge
              :label="post.category"
              color="neutral"
              variant="subtle"
            />

            <time :datetime="new Date(post.date).toISOString()">
              {{ formatDate(post.date) }}
            </time>

            <span aria-hidden="true">·</span>

            <span>{{ post.minRead }} dk okuma</span>
          </div>

          <h1
            class="
              mt-4 text-pretty text-3xl font-medium text-highlighted
              sm:text-4xl
            "
          >
            {{ post.title }}
          </h1>

          <p class="mt-3 text-pretty text-base text-muted sm:text-lg">
            {{ post.description }}
          </p>
        </header>

        <NuxtImg
          :src="post.image"
          :alt="post.imageAlt"
          width="1024"
          height="576"
          sizes="(max-width: 768px) 100vw, 1024px"
          preload
          fetchpriority="high"
          class="
            mt-8 aspect-video w-full rounded-lg object-cover
            ring ring-default
          "
        />

        <div class="article-content mx-auto mt-10 max-w-3xl">
          <ContentRenderer
            v-if="post.body"
            :value="post"
          />
        </div>

        <footer
          v-if="post.tags?.length"
          class="mx-auto mt-10 flex max-w-3xl flex-wrap items-center gap-2"
        >
          <UBadge
            v-for="tag in post.tags"
            :key="tag"
            :label="tag"
            color="neutral"
            variant="outline"
            size="sm"
          />
        </footer>
      </article>

      <USeparator class="my-10" />

      <UContentSurround
        :surround="surround"
        class="mx-auto max-w-3xl"
      />
    </UPageBody>
  </UPage>
</template>
