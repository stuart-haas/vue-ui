<template>
  <div class="Pagination">
    <div v-if="links" class="Pagination__navigation">
      <Button :disabled="!firstPage" @click="goToPage(firstPage)">
        First</Button
      >
      <Button :disabled="!prevPage" @click="goToPage(prevPage)"> Prev</Button>
      <Button :disabled="!nextPage" @click="goToPage(nextPage)"> Next</Button>
      <Button :disabled="!lastPage" @click="goToPage(lastPage)"> Last</Button>
    </div>
    <div class="Pagination__info">
      <span>
        Page
        {{ page }} of
        {{ lastPage || page }}
      </span>
    </div>
    <div class="Pagination__dropdown">
      <Dropdown
        v-if="nextPage"
        :modelValue="perPage"
        @update:modelValue="onUpdatePerPage"
        label="Per Page"
        name="perPage"
        :items="perPageItems"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Dropdown, Button } from '@/components';
import { usePagination } from '@/composables';

type Props = {
  page: string | number;
  perPage: string | number;
  link?: string;
  fetch: () => Promise<void>;
};

const perPageItems = [
  {
    label: '10',
    value: 10,
  },
  {
    label: '25',
    value: 25,
  },
  {
    label: '50',
    value: 50,
  },
  {
    label: '100',
    value: 100,
  },
];

const props = defineProps<Props>();

const { links, firstPage, prevPage, nextPage, lastPage } = usePagination(props);

const emit = defineEmits(['update:page', 'update:perPage']);

async function goToPage(value: string | number) {
  emit('update:page', value);
  await props.fetch();
}

async function onUpdatePerPage(value: string | number) {
  emit('update:perPage', value);
  await props.fetch();
}
</script>

<style lang="postcss" scoped>
.Pagination {
  @apply flex mt-4 items-center justify-between;
}
.Pagination__navigation {
  @apply space-x-4 text-sm;
}
.Pagination__dropdown {
  @apply space-x-4 mb-4 flex items-center;
}
</style>
