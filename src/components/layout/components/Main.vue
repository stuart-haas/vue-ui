<template>
  <main class="app-layout__main">
    <slot />
  </main>
</template>

<style lang="postcss" scoped>
.app-layout__main {
  @apply bg-gray-200 w-full min-h-full;
}
</style>
