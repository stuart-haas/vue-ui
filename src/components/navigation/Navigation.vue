<template>
  <nav class="Navigation">
    <slot />
  </nav>
</template>

<style lang="postcss" scoped>
.Navigation {
  @apply bg-gray-200 p-8 border-r border-gray-300 space-y-4;
}
</style>
