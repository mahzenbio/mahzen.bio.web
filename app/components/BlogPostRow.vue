<script setup lang="ts">
import type { BlogCollectionItem } from '@nuxt/content'

defineProps<{
  post: BlogCollectionItem
}>()
</script>

<template>
  <ULink
    :to="post.path"
    class="
      group grid grid-cols-[88px_1fr] items-center gap-x-5 gap-y-3
      px-4 py-6
      transition-colors duration-300
      hover:bg-elevated/50
      sm:grid-cols-[160px_1fr_auto] sm:gap-x-8 sm:px-6 sm:py-8
      lg:px-8
    "
  >
    <div
      class="
        aspect-square overflow-hidden rounded-lg
        bg-elevated/60 ring-1 ring-default
      "
    >
      <AppImage
        :src="post.image"
        :alt="post.imageAlt"
        width="320"
        height="320"
        sizes="xs:88px sm:160px md:160px lg:160px xl:160px xxl:160px"
        loading="lazy"
        class="
          size-full object-cover
          transition-transform duration-600 ease-out
          group-hover:scale-[1.06]
          motion-reduce:transition-none motion-reduce:group-hover:scale-100
        "
      />
    </div>

    <div class="min-w-0">
      <p class="eyebrow text-dimmed">
        {{ formatDate(post.date) }}
      </p>

      <h2
        class="
          mt-3 text-pretty text-lg font-semibold tracking-tight
          text-highlighted
          transition-colors duration-300
          group-hover:text-toned
          sm:text-xl
        "
      >
        {{ post.title }}
      </h2>

      <p
        class="
          mt-2 text-pretty text-sm leading-relaxed text-muted
          line-clamp-2
        "
      >
        {{ post.description }}
      </p>
    </div>

    <UIcon
      name="i-lucide-arrow-right"
      class="
        col-start-2 size-4 shrink-0 text-dimmed
        transition-all duration-300 ease-out
        group-hover:translate-x-1 group-hover:text-highlighted
        sm:col-start-3
      "
    />
  </ULink>
</template>
