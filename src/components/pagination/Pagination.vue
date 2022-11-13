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
import { ref, watch } from 'vue';
import { Dropdown, Button } from '@/components';

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

const links = ref();
const firstPage = ref();
const prevPage = ref();
const nextPage = ref();
const lastPage = ref();

const emit = defineEmits(['update:page', 'update:perPage']);

watch(
  () => props.link,
  (value) => {
    if (value) {
      links.value = getLinks(value);
      firstPage.value = getPage(links.value.first);
      prevPage.value = getPage(links.value.prev);
      nextPage.value = getPage(links.value.next);
      lastPage.value = getPage(links.value.last);
    } else {
      links.value = null;
    }
  }
);

async function goToPage(e: string | number) {
  emit('update:page', e);
  await props.fetch();
}

async function onUpdatePerPage(e: string | number) {
  emit('update:perPage', e);
  await props.fetch();
}

function getLinks(link: string) {
  let parsedData: Record<string, unknown> = {};

  const splitData = link.split(',');

  for (let d of splitData) {
    const linkInfo = /<([^>]+)>;\s+rel="([^"]+)"/gi.exec(d) as RegExpExecArray;

    parsedData[linkInfo[2]] = linkInfo[1];
  }

  return parsedData;
}

function getPage(link: string) {
  if (!link) {
    return null;
  }
  const params = new URLSearchParams(link.split('?')[1]);
  return params.get('page');
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
