<script setup lang="ts">
const { footer } = useAppConfig()
</script>

<template>
  <UFooter
    :ui="{
      root: 'mt-24 border-t border-default',
      left: 'text-sm text-muted',
    }"
  >
    <template #left>
      {{ footer.credits }}
    </template>

    <template #right>
      <UButton
        v-for="link in footer.links"
        :key="link.to"
        :icon="link.icon"
        :to="link.to"
        :target="link.target"
        :aria-label="link.ariaLabel"
        color="neutral"
        variant="ghost"
        size="sm"
      />
    </template>
  </UFooter>
</template>
