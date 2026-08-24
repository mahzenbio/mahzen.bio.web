<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <section class="relative isolate overflow-hidden bg-muted/30">
    <NuxtImg
      :src="page.hero.image"
      :alt="page.hero.imageAlt"
      width="2400"
      height="1000"
      sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"
      preload
      fetchpriority="high"
      class="absolute inset-0 -z-10 size-full object-cover object-right"
    />

    <div
      class="
        absolute inset-0 -z-10
        bg-linear-to-r from-default via-default/80 to-default/20
      "
    />

    <UContainer class="py-20 sm:py-28 lg:py-36">
      <div class="max-w-3xl">
        <UBadge
          :label="page.hero.badge"
          color="neutral"
          variant="subtle"
          size="sm"
        />

        <h1
          class="
            mt-6 text-balance text-4xl font-medium tracking-tight
            text-highlighted
            sm:text-5xl lg:text-6xl
          "
        >
          {{ page.title }}
        </h1>

        <p class="mt-6 max-w-2xl text-pretty text-base text-muted sm:text-lg">
          {{ page.description }}
        </p>

        <UButton
          to="/blog"
          :label="page.hero.actionLabel"
          trailing-icon="i-lucide-arrow-right"
          color="neutral"
          size="lg"
          class="mt-8"
        />
      </div>
    </UContainer>
  </section>
</template>
