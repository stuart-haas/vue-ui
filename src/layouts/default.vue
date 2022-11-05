<template>
  <div class="flex min-h-full">
    <div class="flex-1">
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
main {
  @apply min-h-full py-4 px-8 bg-gray-100;
}
</style>
