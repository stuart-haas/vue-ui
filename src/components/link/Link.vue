<template>
  <component :is="component" class="Link">
    <i v-if="iconLeft" :class="iconLeft" class="Link__icon_left" />
    <slot />
    <i v-if="iconRight" :class="iconRight" class="Link__icon_right" />
  </component>
</template>

<script setup lang="ts">
type Props = {
  component?: string;
  iconLeft?: string;
  iconRight?: string;
};

withDefaults(defineProps<Props>(), {
  component: 'router-link',
});
</script>

<style lang="postcss" scoped>
.Link {
  @apply text-blue-500 font-semibold whitespace-nowrap;
}
.Link__icon_left {
  @apply mr-2;
}
.Link__icon_right {
  @apply ml-2;
}
</style>
