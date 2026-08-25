<script setup lang="ts">
const props = defineProps<{
  src: string
}>()

// Editors may paste an absolute URL instead of picking a file from the project.
// The image pipeline only transforms hosts it has been told about — on Vercel an
// unlisted host comes back as a 400 — so remote sources are passed through
// untouched while project images keep going through the optimiser.
const isRemote = computed(() => /^https?:\/\//i.test(props.src))
</script>

<template>
  <NuxtImg
    :src="src"
    :provider="isRemote ? 'none' : undefined"
  />
</template>
