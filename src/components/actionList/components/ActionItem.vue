<template>
  <component
    :is="component"
    class="ActionList__ActionItem"
    :class="[`ActionList__ActionItem--${variant}`]"
  >
    <i v-if="icon" class="ActionItem__icon" :class="icon" />
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
  component: 'span',
});
</script>

<style lang="postcss" scoped>
.ActionList__ActionItem {
  @apply flex items-center justify-start py-1 px-2 bg-white hover:bg-gray-200 rounded cursor-pointer transition-colors duration-200;
}
.ActionItem__icon {
  @apply mr-4;
}
.ActionItem__text {
  @apply whitespace-nowrap;
}
.ActionList__ActionItem--base {
  @apply text-black;
}
.ActionList__ActionItem--danger {
  @apply text-red-500;
}
</style>
