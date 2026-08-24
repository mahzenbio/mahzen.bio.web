<script setup lang="ts">
import type { BlogCollectionItem } from '@nuxt/content'

defineProps<{
  posts: BlogCollectionItem[]
}>()
</script>

<template>
  <UBlogPosts orientation="horizontal" class="gap-x-8 gap-y-14 lg:gap-y-16">
    <Motion
      v-for="(post, index) in posts"
      :key="post.id"
      :initial="{ opacity: 0, transform: 'translateY(24px)' }"
      :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
      :transition="{
        duration: 0.65,
        delay: (index % 3) * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }"
      :in-view-options="{ once: true, margin: '-80px' }"
    >
      <BlogPostCard :post="post" />
    </Motion>
  </UBlogPosts>
</template>
