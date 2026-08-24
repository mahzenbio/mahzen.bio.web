<script setup lang="ts">
const { navigation } = useAppConfig()
</script>

<template>
  <header
    class="
      sticky top-0 z-50
      border-b border-default
      bg-default/80 backdrop-blur-md
    "
  >
    <UContainer
      class="
        flex h-16 items-center justify-between gap-4
      "
    >
      <AppLogo />

      <UNavigationMenu
        :items="navigation"
        aria-label="Ana menü"
        color="neutral"
        variant="link"
        :ui="{
          list: 'gap-1',
          link: 'px-2 py-1 text-sm',
          linkLeadingIcon: 'hidden',
        }"
      >
        <template #list-trailing>
          <ColorModeButton />
        </template>
      </UNavigationMenu>
    </UContainer>
  </header>
</template>
