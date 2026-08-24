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

const imageUrl = computed(() => new URL(post.value!.image, siteUrl).href)

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
        'publisher': { '@type': 'Organization', 'name': name },
      }),
    },
  ],
})
</script>

<template>
  <UPage v-if="post">
    <article>
      <section class="border-b border-default">
        <UContainer class="py-12 sm:py-16">
          <UButton
            to="/blog"
            icon="i-lucide-arrow-left"
            label="Yazılar"
            color="neutral"
            variant="link"
            size="sm"
            class="mb-8 px-0"
          />

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
              mt-5 max-w-4xl text-pretty text-3xl font-medium tracking-tight
              text-highlighted
              sm:text-4xl lg:text-5xl
            "
          >
            {{ post.title }}
          </h1>

          <p class="mt-4 max-w-2xl text-pretty text-base text-muted sm:text-lg">
            {{ post.description }}
          </p>
        </UContainer>
      </section>

      <UContainer class="py-12 sm:py-16">
        <NuxtImg
          :src="post.image"
          :alt="post.imageAlt"
          width="1280"
          height="720"
          sizes="(max-width: 1024px) 100vw, 1024px"
          preload
          fetchpriority="high"
          class="
            mx-auto aspect-video w-full max-w-5xl rounded-xl object-cover
            ring ring-default
          "
        />

        <div class="article-content mx-auto mt-14 max-w-3xl">
          <ContentRenderer
            v-if="post.body"
            :value="post"
          />
        </div>

        <div
          v-if="post.tags?.length"
          class="mx-auto mt-12 flex max-w-3xl flex-wrap items-center gap-2"
        >
          <UBadge
            v-for="tag in post.tags"
            :key="tag"
            :label="tag"
            color="neutral"
            variant="outline"
            size="sm"
          />
        </div>

        <USeparator class="mx-auto my-12 max-w-3xl" />

        <UContentSurround
          :surround="surround"
          class="mx-auto max-w-3xl"
        />
      </UContainer>
    </article>
  </UPage>
</template>
