<template>
  <component :is="component" class="Navigation_NavigationItem">
    <i v-if="icon" class="NavigationItem_icon" :class="[icon]" />
    <span class="NavigationItem_text">
      <slot />
    </span>
  </component>
</template>

<script setup lang="ts">
type Props = {
  icon?: string;
  component?: string;
};

withDefaults(defineProps<Props>(), {
  component: 'router-link',
});
</script>

<style lang="postcss" scoped>
.Navigation_NavigationItem {
  @apply text-black cursor-pointer hover:text-indigo-500 flex items-center justify-start space-x-4;
}
.NavigationItem_icon {
  @apply inline;
}
.NavigationItem_text {
  @apply font-semibold;
}
</style>
