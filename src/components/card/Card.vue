<template>
  <div class="Card">
    <h1 v-if="title" class="Card__title">{{ title }}</h1>
    <slot />
  </div>
</template>

<script setup lang="ts">
type Props = {
  title?: string;
};

defineProps<Props>();
</script>

<style lang="postcss" scoped>
.Card {
  @apply p-6 bg-white rounded shadow;
}
.Card__title {
  @apply text-xl font-semibold mb-4;
}
</style>
