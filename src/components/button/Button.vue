<template>
  <button
    class="Button"
    :class="[
      `Button--variant-${variant}`,
      { 'Button--hasIcon': icon, 'Button--disabled': disabled },
    ]"
    :disabled="disabled"
  >
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
  disabled?: boolean;
};

withDefaults(defineProps<Props>(), {
  variant: 'base',
  disabled: false,
});
</script>

<style lang="postcss" scoped>
.Button {
  @apply border rounded px-4 py-2 space-x-4 transition-colors duration-200;
}
.Button--disabled {
  @apply opacity-50;
}
.Button--variant-base {
  @apply bg-white border-gray-300 text-black hover:bg-gray-100;
}
.Button--variant-danger {
  @apply bg-red-100 border-red-500 text-red-700 hover:bg-red-200;
}
.Button--variant-success {
  @apply bg-green-100 border-green-500 text-green-700 hover:bg-green-200;
}
</style>
