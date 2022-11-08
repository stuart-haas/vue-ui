<template>
  <div class="Menu">
    <slot name="button" :toggle="toggle">
      <MenuAnchor />
    </slot>
    <Transition name="fade">
      <div v-if="active" class="Menu_child">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue';
import { MenuAnchor } from './components';

const active = ref<boolean>(false);

provide('toggle', toggle);

function toggle() {
  active.value = !active.value;
}
</script>

<style lang="postcss" scoped>
.Menu {
  @apply relative;
}
.Menu_child {
  @apply absolute bg-white rounded shadow-md border border-gray-300 p-2 right-0 mt-2;
}
</style>
