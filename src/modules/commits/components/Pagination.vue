<template>
  <div class="flex items-center justify-between mb-4">
    <div v-if="links" class="space-x-8 text-center">
      <button
        :disabled="!firstPage"
        @click="goToPage(firstPage)"
        class="text-white cursor-pointer"
        :class="{ 'opacity-50': !firstPage }"
      >
        <i class="fas fa-angle-double-left" />
      </button>
      <button
        :disabled="!prevPage"
        @click="goToPage(prevPage)"
        class="text-white cursor-pointer"
        :class="{ 'opacity-50': !prevPage }"
      >
        <i class="fas fa-angle-left" />
      </button>
      <button
        :disabled="!nextPage"
        @click="goToPage(nextPage)"
        class="text-white cursor-pointer"
        :class="{ 'opacity-50': !nextPage }"
      >
        <i class="fas fa-angle-right" />
      </button>
      <button
        :disabled="!lastPage"
        @click="goToPage(lastPage)"
        class="text-white cursor-pointer"
        :class="{ 'opacity-50': !lastPage }"
      >
        <i class="fas fa-angle-double-right" />
      </button>
    </div>
    <span class="text-white text-sm">
      {{ currentPage }} of
      {{ lastPage || currentPage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { usePagination } from '@/composables';
import { watch } from 'vue';

type Props = {
  link: any;
  goToPage: any;
};

const props = defineProps<Props>();

const {
  links,
  currentPage,
  firstPage,
  prevPage,
  nextPage,
  lastPage,
  makeLinks,
} = usePagination({
  link: props.link,
});

watch(
  () => props.link,
  (value) => {
    makeLinks(value);
  },
  { immediate: true }
);
</script>
