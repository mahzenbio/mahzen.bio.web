<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  to?: string
  linkLabel?: string
}>()
</script>

<template>
  <div
    class="
      mb-10 flex flex-col gap-4
      sm:mb-12 sm:flex-row sm:items-end sm:justify-between
    "
  >
    <div>
      <p v-if="eyebrow" class="eyebrow mb-3 text-dimmed">
        {{ eyebrow }}
      </p>

      <h2
        class="
          text-pretty text-2xl font-semibold tracking-tight text-highlighted
          sm:text-3xl
        "
      >
        {{ title }}
      </h2>
    </div>

    <ULink
      v-if="to && linkLabel"
      :to="to"
      class="
        eyebrow group inline-flex shrink-0 items-center gap-2
        border-b border-transparent pb-1 text-muted
        transition-colors
        hover:border-accented hover:text-highlighted
      "
    >
      {{ linkLabel }}

      <UIcon
        name="i-lucide-arrow-right"
        class="
          size-3.5 transition-transform duration-300 ease-out
          group-hover:translate-x-1
        "
      />
    </ULink>
  </div>
</template>
