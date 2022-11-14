<template>
  <div class="Popover" @mouseenter="open" @mouseleave="close">
    <slot name="anchor" :toggle="toggle" :close="close" :open="open" />
    <div class="Popover__child">
      <transition name="slide-fade">
        <slot v-if="active" />
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

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
</script>

<style lang="postcss" scoped>
.Popover {
  @apply relative;
}
.Popover__child {
  @apply absolute z-10 left-0;
}
</style>
