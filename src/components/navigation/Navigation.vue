<template>
  <nav class="app-nav">
    <a class="app-nav-item">
      <i class="app-nav-item__icon fas fa-user" />
      <span class="app-nav-item__text">Account</span>
    </a>
    <a class="app-nav-item">
      <i class="app-nav-item__icon fas fa-luggage-cart" />
      <span class="app-nav-item__text">Orders</span>
    </a>
    <a class="app-nav-item">
      <i class="app-nav-item__icon fas fa-cog" />
      <span class="app-nav-item__text">Settings</span>
    </a>
  </nav>
</template>

<style lang="postcss" scoped>
.app-nav {
  @apply bg-gray-200 p-8 pr-12 border-r border-gray-300 space-y-4;
}
.app-nav-item {
  @apply block text-black cursor-pointer hover:text-indigo-500 transition-colors duration-200;
}
.app-nav-item__icon {
  @apply inline;
}
.app-nav-item__text {
  @apply ml-8 font-semibold;
}
</style>
