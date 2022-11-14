<template>
  <div
    class="Popover"
    :class="[`Popover--position-${position}`]"
    @mouseenter="open"
    @mouseleave="close"
  >
    <slot name="anchor" :toggle="toggle" :close="close" :open="open" />
    <div class="Popover__child" :class="[`Popover__child--align-${align}`]">
      <transition name="slide-fade">
        <slot v-if="active" />
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type Props = {
  position?: 'relative' | 'absolute';
  align?: 'left' | 'right';
};

withDefaults(defineProps<Props>(), {
  position: 'relative',
  align: 'left',
});

const active = ref(false);

function toggle() {
  active.value = !active.value;
}

function open() {
  active.value = true;
}

function close() {
  active.value = false;
}

defineExpose({
  open,
});
</script>

<style lang="postcss" scoped>
.Popover--position-relative {
  @apply relative;
}
.Popover--position-absolute {
  @apply absolute top-full;
}
.Popover__child {
  @apply absolute z-10;
}
.Popover__child--align-left {
  @apply left-0;
}
.Popover__child--align-right {
  @apply right-0;
}
</style>
