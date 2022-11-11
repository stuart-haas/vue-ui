<template>
  <router-view v-slot="{ Component }">
    <transition :name="name">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
type Props = {
  name?: string;
};

withDefaults(defineProps<Props>(), {
  name: 'fade',
});
</script>
