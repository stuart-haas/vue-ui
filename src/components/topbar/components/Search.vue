<template>
  <div
    class="border border-gray-300 rounded inline-block px-4 pb-1.5 pt-1 w-96"
    :class="{ 'border-blue-500': hasFocus }"
  >
    <input
      type="text"
      placeholder="Search"
      class="outline-none"
      @focus="hasFocus = true"
      @blur="hasFocus = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const hasFocus = ref(false);
</script>
