<script setup lang="ts">
import type { BlogCollectionItem } from '@nuxt/content'

const { post, eager = false } = defineProps<{
  post: BlogCollectionItem
  eager?: boolean
}>()

const image = computed(() => {
  return {
    src: post.image,
    alt: post.imageAlt,
    width: 640,
    height: 360,
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    loading: eager ? 'eager' : 'lazy',
    fetchpriority: eager ? 'high' : 'auto',
  }
})
</script>

<template>
  <UBlogPost
    :title="post.title"
    :description="post.description"
    :image="image"
    :badge="post.category"
    :to="post.path"
    orientation="vertical"
    variant="subtle"
    class="h-full"
    :ui="{
      root: 'h-full',
      body: 'flex-1',
    }"
  >
    <template #date>
      {{ formatDate(post.date) }} · {{ post.minRead }} dk okuma
    </template>
  </UBlogPost>
</template>
