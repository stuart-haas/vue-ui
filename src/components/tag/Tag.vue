<template>
  <div class="Tag">
    <slot />
  </div>
</template>

<style lang="postcss" scoped>
.Tag {
  @apply bg-gray-200 p-1 inline-block m-1 rounded text-xs;
}
</style>