<template>
  <header class="Topbar">
    <img class="Topbar__logo" src="/favicon.svg" />
    <Search class="Topbar__Search" />
    <Menu class="Topbar__Menu">
      <template #button>
        <Menu.Anchor>
          <template #default="{ toggle }">
            <Button @click="toggle" icon="fas fa-user-circle">
              Your Name
            </Button>
          </template>
        </Menu.Anchor>
      </template>
      <ActionList>
        <ActionList.Item icon="fas fa-user"> Account </ActionList.Item>
        <ActionList.Item icon="fas fa-sign-out-alt"> Logout </ActionList.Item>
        <ActionList.Divider />
        <ActionList.Item icon="fas fa-info"> Help </ActionList.Item>
      </ActionList>
    </Menu>
  </header>
</template>

<script setup lang="ts">
import { Search } from './components';
import { ActionList, Menu, Button } from '@/components';
</script>

<style lang="postcss" scoped>
.Topbar {
  @apply px-8 py-4 border-b border-gray-300 shadow flex items-center justify-between bg-white;
}
.Topbar__logo {
  @apply w-8 h-8;
}
</style>
