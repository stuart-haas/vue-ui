<template>
  <button class="Button" :class="[`Button--${variant}`]">
    <i v-if="icon" :class="icon" />
    <span class="font-semibold">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
type Props = {
  variant?: string;
  icon?: string;
};

withDefaults(defineProps<Props>(), {
  variant: 'base',
});
</script>

<style lang="postcss" scoped>
.Button {
  @apply border rounded px-4 py-2 space-x-4 transition-colors duration-200;
}
.Button--base {
  @apply bg-white border-gray-300 text-black hover:bg-gray-100;
}
.Button--danger {
  @apply bg-red-100 border-red-500 text-red-700 hover:bg-red-200;
}
</style>
