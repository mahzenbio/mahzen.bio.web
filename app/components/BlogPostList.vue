<script setup lang="ts">
import type { BlogCollectionItem } from '@nuxt/content'

defineProps<{
  posts: BlogCollectionItem[]
}>()
</script>

<template>
  <div class="divide-y divide-default border-y border-default">
    <Motion
      v-for="(post, index) in posts"
      :key="post.id"
      :initial="{ opacity: 0, transform: 'translateY(20px)' }"
      :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
      :transition="{
        duration: 0.6,
        delay: Math.min(index, 4) * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }"
      :in-view-options="{ once: true, margin: '-60px' }"
    >
      <BlogPostRow :post="post" />
    </Motion>
  </div>
</template>
