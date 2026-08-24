<script setup lang="ts">
import type { NuxtError } from '#app'

const { error } = defineProps<{
  error: NuxtError
}>()

const isNotFound = computed(() => {
  return error.statusCode === 404
})

const title = computed(() => {
  return isNotFound.value
    ? 'Bu sayfa bulunamadı'
    : 'Bir şeyler ters gitti'
})

const description = computed(() => {
  return isNotFound.value
    ? 'Aradığın yazı taşınmış veya hiç var olmamış olabilir.'
    : 'Beklenmeyen bir hata oluştu. Lütfen biraz sonra tekrar dene.'
})

useHead({
  title: title.value,
  meta: [
    {
      name: 'robots',
      content: 'noindex',
    },
  ],
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <UPage>
        <UError
          :status="error.statusCode"
          :title="title"
          :description="description"
          :redirect="undefined"
          :ui="{ links: 'mt-6' }"
        >
          <template #links>
            <UButton
              to="/"
              label="Tüm yazılar"
              icon="i-lucide-arrow-left"
              color="neutral"
              variant="subtle"
            />
          </template>
        </UError>
      </UPage>
    </NuxtLayout>
  </UApp>
</template>
