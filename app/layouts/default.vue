<template>
  <UContainer
    class="
      flex min-h-screen flex-col
      border-default
      pt-4 sm:border-x sm:pt-6
    "
  >
    <AppHeader />

    <UMain class="flex-1">
      <slot />
    </UMain>

    <AppFooter />
  </UContainer>
</template>
