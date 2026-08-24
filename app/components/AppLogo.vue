<script setup lang="ts">
const { name } = useAppConfig()
</script>

<template>
  <ULink
    to="/"
    :aria-label="`${name} — ana sayfa`"
    class="
      group flex items-center gap-2
      text-highlighted
      focus-visible:outline-2 focus-visible:outline-offset-4
      focus-visible:outline-primary
    "
  >
    <svg
      viewBox="0 0 32 32"
      class="size-6 sm:size-7"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M6 24V13a5 5 0 0 1 10 0v11M16 13a5 5 0 0 1 10 0v11"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="logo-mark"
      />
    </svg>

    <span
      class="
        text-sm font-medium tracking-tight
        sm:text-base
      "
    >
      {{ name }}
    </span>
  </ULink>
</template>

<style scoped>
/* The mark redraws itself on hover — the same restrained motion used elsewhere. */
.logo-mark {
  stroke-dasharray: 64;
  stroke-dashoffset: 0;
}

.group:hover .logo-mark {
  animation: logo-draw 0.9s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes logo-draw {
  from {
    stroke-dashoffset: 64;
  }
  to {
    stroke-dashoffset: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .group:hover .logo-mark {
    animation: none;
  }
}
</style>
