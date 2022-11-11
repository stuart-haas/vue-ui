<template>
  <div class="Card">
    <slot />
  </div>
</template>

<style lang="postcss" scoped>
.Card {
  @apply p-6 bg-white rounded shadow;
}
</style>
