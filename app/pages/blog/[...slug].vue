<script setup lang="ts">
const route = useRoute()
const { data: settings } = useSiteSettings()

const name = settings.value?.name ?? ''
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

// Studio bir yazıyı her alan dolmadan kaydedebiliyor; eksik alan sayfayı
// düşürmemeli, sadece ilgili satır görünmemeli.
const imageUrl = computed(() =>
  post.value?.image ? new URL(post.value.image, siteUrl).href : undefined,
)

const publishedAt = computed(() => toValidDate(post.value?.date))

const metaItems = computed(() => [
  post.value?.category,
  post.value?.minRead ? `${post.value.minRead} dk okuma` : null,
].filter((item): item is string => Boolean(item)))

useSeoMeta({
  title: post.value.title,
  description: post.value.description,
  ogTitle: post.value.title,
  ogDescription: post.value.description,
  ogType: 'article',
  ogImage: imageUrl,
  ogImageAlt: post.value.imageAlt,
  articlePublishedTime: publishedAt.value?.toISOString(),
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
        'datePublished': publishedAt.value?.toISOString(),
        'articleSection': post.value.category,
        'keywords': post.value.tags?.join(', '),
        'mainEntityOfPage': new URL(route.path, siteUrl).href,
        'publisher': { '@type': 'Organization', 'name': name },
      }),
    },
  ],
})
</script>

<template>
  <UPage v-if="post">
    <UContainer class="py-14 sm:py-20">
      <article class="mx-auto max-w-3xl">
        <ULink
          to="/blog"
          class="
            eyebrow group inline-flex items-center gap-2 text-muted
            transition-colors
            hover:text-highlighted
          "
        >
          <UIcon
            name="i-lucide-arrow-left"
            class="
              size-3.5 transition-transform duration-300 ease-out
              group-hover:-translate-x-1
            "
          />
          Blog
        </ULink>

        <AppImage
          v-if="post.image"
          :src="post.image"
          :alt="post.imageAlt"
          width="1280"
          height="720"
          sizes="xs:100vw sm:100vw md:100vw lg:768px xl:768px xxl:768px"
          preload
          fetchpriority="high"
          class="
            mt-8 aspect-16/10 w-full rounded-lg object-cover
            bg-elevated/60 ring-1 ring-default
          "
        />

        <header class="mt-10">
          <div class="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2 text-dimmed">
            <time v-if="publishedAt" :datetime="publishedAt.toISOString()">
              {{ formatDate(publishedAt) }}
            </time>

            <template v-for="(item, index) in metaItems" :key="item">
              <span v-if="publishedAt || index > 0" aria-hidden="true">·</span>

              <span>{{ item }}</span>
            </template>
          </div>

          <h1
            class="
              mt-5 text-balance text-3xl font-semibold tracking-tight
              text-highlighted
              sm:text-4xl lg:text-5xl
            "
          >
            {{ post.title }}
          </h1>

          <p class="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {{ post.description }}
          </p>
        </header>

        <USeparator class="my-10" />

        <div class="article-content">
          <ContentRenderer
            v-if="post.body"
            :value="post"
          />
        </div>

        <div
          v-if="post.tags?.length"
          class="mt-12 flex flex-wrap items-center gap-2"
        >
          <UBadge
            v-for="tag in post.tags"
            :key="tag"
            :label="tag"
            color="neutral"
            variant="subtle"
            size="sm"
          />
        </div>

        <USeparator class="my-12" />

        <ULink
          to="/blog"
          class="
            eyebrow group inline-flex items-center gap-2 text-muted
            transition-colors
            hover:text-highlighted
          "
        >
          <UIcon
            name="i-lucide-arrow-left"
            class="
              size-3.5 transition-transform duration-300 ease-out
              group-hover:-translate-x-1
            "
          />
          Tüm yazılar
        </ULink>
      </article>
    </UContainer>
  </UPage>
</template>
