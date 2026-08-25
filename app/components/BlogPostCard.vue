<script setup lang="ts">
import type { BlogCollectionItem } from '@nuxt/content'

const { post, featured = false } = defineProps<{
  post: BlogCollectionItem
  featured?: boolean
}>()

// Nuxt Image expects its own `breakpoint:value` syntax here, not CSS media queries.
const FEATURED_SIZES = 'xs:100vw sm:100vw md:100vw lg:50vw xl:50vw xxl:50vw'
const GRID_SIZES = 'xs:100vw sm:50vw md:50vw lg:33vw xl:33vw xxl:33vw'

const image = computed(() => ({
  src: post.image,
  alt: post.imageAlt,
  width: featured ? 1024 : 720,
  height: featured ? 576 : 540,
  sizes: featured ? FEATURED_SIZES : GRID_SIZES,
  // `as const` olmadan TS bunu `string`e genişletiyor, UBlogPost ise
  // `'eager' | 'lazy'` bekliyor.
  loading: featured ? ('eager' as const) : ('lazy' as const),
}))
</script>

<template>
  <UBlogPost
    :title="post.title"
    :description="post.description"
    :image="image"
    :to="post.path"
    :orientation="featured ? 'horizontal' : 'vertical'"
    variant="naked"
    :ui="{
      root: featured ? 'lg:gap-x-14' : 'h-full',
      header: [
        'rounded-lg ring-1 ring-default bg-elevated/60',
        featured ? 'aspect-16/10' : 'aspect-4/3',
      ].join(' '),
      image: [
        'object-cover w-full h-full',
        'transition-transform duration-600 ease-out',
        'group-hover/blog-post:scale-[1.04]',
        'motion-reduce:transition-none motion-reduce:group-hover/blog-post:scale-100',
      ].join(' '),
      body: featured
        ? 'lg:px-0 flex flex-col justify-center'
        : 'px-0! pt-5 pb-0! flex-1 flex flex-col',
      meta: 'mb-3',
      date: 'eyebrow text-dimmed',
      title: [
        featured ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl',
        'font-semibold tracking-tight text-pretty',
        'transition-colors duration-300 group-hover/blog-post:text-toned',
      ].join(' '),
      description: [
        featured ? 'mt-4 text-base' : 'mt-2.5 text-sm line-clamp-3',
        'text-muted leading-relaxed',
      ].join(' '),
      footer: 'mt-auto pt-5',
    }"
  >
    <template #date>
      {{ formatDate(post.date) }}
    </template>

    <template #footer>
      <span
        class="
          eyebrow inline-flex items-center gap-2 text-muted
          transition-opacity duration-300
          sm:opacity-0
          sm:group-hover/blog-post:opacity-100
        "
      >
        Oku
        <UIcon name="i-lucide-arrow-right" class="size-3.5" />
      </span>
    </template>
  </UBlogPost>
</template>
