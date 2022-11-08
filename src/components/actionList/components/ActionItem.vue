<template>
  <component
    :is="component"
    class="ActionList_ActionItem"
    :class="[`ActionList_ActionItem--${variant}`]"
  >
    <i v-if="icon" class="ActionItem_icon" :class="icon" />
    <span class="ActionItem_text">
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
.ActionList_ActionItem {
  @apply flex items-center justify-start py-1 px-2 bg-white hover:bg-gray-200 rounded cursor-pointer transition-colors duration-200;
}
.ActionItem_icon {
  @apply mr-4;
}
.ActionItem_text {
  @apply whitespace-nowrap;
}
.ActionList_ActionItem--base {
  @apply text-black;
}
.ActionList_ActionItem--danger {
  @apply text-red-500;
}
</style>
