<template>
  <component :is="component" class="Navigation__NavigationItem NavigationItem">
    <i v-if="icon" class="NavigationItem__icon" :class="[icon]" />
    <span class="NavigationItem__text">
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
.NavigationItem {
  @apply text-black cursor-pointer hover:text-blue-500 flex items-center justify-start space-x-4 duration-200 transition-colors ease-in;
}
.NavigationItem__icon {
  @apply inline;
}
.NavigationItem__text {
  @apply font-semibold;
}
</style>
