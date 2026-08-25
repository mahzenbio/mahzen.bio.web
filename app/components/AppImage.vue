<script setup lang="ts">
// `src` eksik olabilir: Studio'dan kapak görseli seçilmeden kaydedilmiş bir
// yazıda koleksiyon `null` döndürür. O durumda hiç `<img>` basmıyoruz, kapsayan
// kutunun boş hâli görünür.
const props = defineProps<{
  src?: string | null
}>()

// Editors may paste an absolute URL instead of picking a file from the project.
// The image pipeline only transforms hosts it has been told about — on Vercel an
// unlisted host comes back as a 400 — so remote sources are passed through
// untouched while project images keep going through the optimiser.
const isRemote = computed(() => /^https?:\/\//i.test(props.src ?? ''))
</script>

<template>
  <NuxtImg
    v-if="src"
    :src="src"
    :provider="isRemote ? 'none' : undefined"
  />
</template>
