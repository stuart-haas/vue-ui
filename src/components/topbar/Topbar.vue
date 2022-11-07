<template>
  <header class="app-topbar">
    <img src="/favicon.svg" class="w-8 h-8" />
    <Search />
    <div></div>
  </header>
</template>

<script setup lang="ts">
import { Search } from './components';
</script>

<style lang="postcss" scoped>
.app-topbar {
  @apply px-8 py-4 border-b border-gray-300 shadow flex items-center justify-between;
}
</style>
