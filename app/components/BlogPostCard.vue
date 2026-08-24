<script setup lang="ts">
import type { BlogCollectionItem } from '@nuxt/content'

const { post, featured = false } = defineProps<{
  post: BlogCollectionItem
  featured?: boolean
}>()

const image = computed(() => ({
  src: post.image,
  alt: post.imageAlt,
  width: featured ? 1024 : 640,
  height: featured ? 640 : 400,
  sizes: featured
    ? '(max-width: 1024px) 100vw, 50vw'
    : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  loading: featured ? 'eager' : 'lazy',
}))
</script>

<template>
  <UBlogPost
    :title="post.title"
    :description="post.description"
    :image="image"
    :badge="post.category"
    :to="post.path"
    :orientation="featured ? 'horizontal' : 'vertical'"
    variant="naked"
    :ui="{
      root: featured ? 'lg:gap-x-12' : 'h-full',
      header: 'rounded-xl ring ring-default',
      body: featured ? 'lg:px-0' : 'flex-1 px-0! pt-4 pb-0!',
      title: featured
        ? 'text-2xl sm:text-3xl font-medium group-hover/blog-post:text-primary transition-colors'
        : 'text-lg font-medium group-hover/blog-post:text-primary transition-colors',
      description: featured ? 'mt-3 text-base' : 'mt-2 text-sm line-clamp-2',
      meta: 'mb-3',
    }"
  >
    <template #date>
      {{ formatDate(post.date) }} · {{ post.minRead }} dk
    </template>
  </UBlogPost>
</template>
