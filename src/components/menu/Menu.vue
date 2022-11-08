<template>
  <div class="Menu" :class="{ 'Menu--active': active }" v-click-outside="close">
    <slot name="button" :toggle="toggle">
      <MenuAnchor />
    </slot>
    <Transition name="slide-fade">
      <div v-if="active" class="Menu__content">
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
provide('open', open);
provide('close', close);

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
.Menu {
  @apply relative;
}
.Menu__content {
  @apply absolute bg-white rounded shadow-md border border-gray-300 p-2 right-0 mt-2;
}
</style>
