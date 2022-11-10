<template>
  <main class="Layout__Main">
    <slot />
  </main>
</template>

<style lang="postcss" scoped>
.Layout__Main {
  @apply bg-gray-200 w-full min-h-full p-8;
}
</style>
