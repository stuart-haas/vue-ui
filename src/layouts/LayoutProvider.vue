<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script setup lang="ts">
import LayoutDefault from '@/layouts/LayoutDefault.vue';
import { markRaw, ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const layout = ref();
const route = useRoute();

onMounted(async () => {
  setLayout(route.meta?.layout);
});

watch(
  () => route.meta?.layout as string | undefined,
  async (metaLayout) => {
    setLayout(metaLayout);
  }
);

async function setLayout(metaLayout: unknown) {
  try {
    const component =
      metaLayout && (await import(/* @vite-ignore */ `./${metaLayout}.vue`));
    layout.value = markRaw(component?.default || LayoutDefault);
  } catch (e) {
    layout.value = markRaw(LayoutDefault);
  }
}
</script>
