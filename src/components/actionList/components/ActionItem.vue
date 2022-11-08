<template>
  <component
    :is="component"
    class="ActionList__ActionItem ActionItem"
    :class="[`ActionItem--variant-${variant}`, { 'ActionItem--hasIcon': icon }]"
  >
    <div v-if="icon" class="ActionItem__icon">
      <i :class="icon" />
    </div>
    <span class="ActionItem__text">
      <slot />
    </span>
  </component>
</template>

<script setup lang="ts">
type Props = {
  variant?: string;
  component?: string;
  icon?: string;
};

withDefaults(defineProps<Props>(), {
  variant: 'base',
  component: 'button',
});
</script>

<style lang="postcss" scoped>
.ActionItem {
  @apply w-full flex items-center justify-between py-2 px-4 space-x-8 bg-white hover:bg-gray-200 rounded cursor-pointer transition-colors duration-200;
}
.ActionItem__icon {
  @apply text-sm;
}
.ActionItem__text {
  @apply whitespace-nowrap text-sm;
}
.ActionItem--variant-base {
  @apply text-black;
}
.ActionItem--variant-danger {
  @apply text-red-500;
}
</style>
