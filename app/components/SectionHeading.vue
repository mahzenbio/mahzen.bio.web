<script setup lang="ts">
defineProps<{
  title: string
  to?: string
  linkLabel?: string
}>()
</script>

<template>
  <div class="mb-8 flex items-end justify-between gap-4">
    <h2 class="text-xl font-medium text-highlighted">
      {{ title }}
    </h2>

    <UButton
      v-if="to && linkLabel"
      :to="to"
      :label="linkLabel"
      trailing-icon="i-lucide-arrow-right"
      color="neutral"
      variant="link"
      size="sm"
      class="shrink-0 px-0"
    />
  </div>
</template>
