<template>
  <div class="Popover">
    <slot name="trigger" :toggle="toggle" />
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
</script>

<style lang="postcss" scoped>
.Popover {
  @apply relative;
}
.Popover__child {
  @apply absolute z-10;
}
</style>
