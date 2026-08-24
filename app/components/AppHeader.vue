<script setup lang="ts">
const { navigation } = useAppConfig()
</script>

<template>
  <header
    class="
      flex items-center justify-between gap-4
      py-2
    "
  >
    <AppLogo />

    <UNavigationMenu
      :items="navigation"
      aria-label="Ana menü"
      color="neutral"
      variant="link"
      class="
        rounded-full
        border border-default/70
        bg-muted/80 px-1.5
        shadow-lg shadow-neutral-950/5
        backdrop-blur-md
        sm:px-2.5
      "
      :ui="{
        list: 'gap-0.5',
        link: 'px-2 py-1 text-xs sm:px-2.5 sm:text-sm',
        linkLeadingIcon: 'hidden',
      }"
    >
      <template #list-trailing>
        <ColorModeButton />
      </template>
    </UNavigationMenu>
  </header>
</template>
