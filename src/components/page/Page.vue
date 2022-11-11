<template>
  <div class="Page">
    <slot name="title">
      <h1 v-if="title" class="Page__title">{{ title }}</h1>
    </slot>
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
.Page__title {
  @apply text-2xl font-semibold;
}
</style>
