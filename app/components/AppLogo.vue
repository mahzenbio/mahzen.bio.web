<script setup lang="ts">
const { data: settings } = useSiteSettings()

const wordmark = computed(() => settings.value?.wordmark ?? '')
</script>

<template>
  <ULink
    to="/"
    :aria-label="`${wordmark} — ana sayfa`"
    class="
      group flex items-center gap-2.5
      text-highlighted
      focus-visible:outline-2 focus-visible:outline-offset-4
      focus-visible:outline-primary
    "
  >
    <svg
      viewBox="0 0 32 32"
      class="size-7 shrink-0"
      fill="none"
      stroke="currentColor"
      stroke-width="2.4"
      stroke-linecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path class="arch arch-outer" d="M5 26V15a11 11 0 0 1 22 0v11" />
      <path class="arch arch-inner" d="M11 26v-8a5 5 0 0 1 10 0v8" opacity=".55" />
    </svg>

    <span class="text-lg font-medium tracking-tight">
      {{ wordmark }}
    </span>
  </ULink>
</template>

<style scoped>
/* The arches redraw from the outside in — a look down into the vault. */
.arch {
  stroke-dasharray: 90;
  stroke-dashoffset: 0;
}

.group:hover .arch-outer {
  animation: arch-draw 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.group:hover .arch-inner {
  animation: arch-draw 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.12s;
}

@keyframes arch-draw {
  from {
    stroke-dashoffset: 90;
  }
  to {
    stroke-dashoffset: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .group:hover .arch {
    animation: none;
  }
}
</style>
