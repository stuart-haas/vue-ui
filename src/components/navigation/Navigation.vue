<template>
  <nav class="app-nav">
    <slot />
  </nav>
</template>

<style lang="postcss" scoped>
.app-nav {
  @apply bg-gray-200 p-8 border-r border-gray-300 space-y-4;
}
</style>
