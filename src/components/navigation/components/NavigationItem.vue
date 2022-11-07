<template>
  <component :is="component" class="app-nav-item">
    <i v-if="icon" class="app-nav-item__icon" :class="[icon]" />
    <span class="app-nav-item__text">
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
.app-nav-item {
  @apply text-black cursor-pointer hover:text-indigo-500 transition-colors duration-200 flex items-center justify-start space-x-4;
}
.app-nav-item__icon {
  @apply inline;
}
.app-nav-item__text {
  @apply font-semibold;
}
</style>
