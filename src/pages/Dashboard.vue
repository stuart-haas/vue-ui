<template>
  <Page title="Dashboard">
    <Layout.Section>
      <Card>
        <div class="space-x-4 mb-4 flex items-center justify-between">
          <div>
            <label for="visibility" class="block text-sm">Visibility</label>
            <select
              id="visibility"
              class="border border-gray-300 bg-white rounded px-4 pb-1 pt-0.5 outline-blue-500"
              v-model="visibility"
              @change="fetch"
            >
              <option value="all">All</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div class="space-x-4 mb-4 flex items-center">
            <div>
              <label for="sort" class="block text-sm">Sort</label>
              <select
                id="sort"
                class="border border-gray-300 bg-white rounded px-4 pb-1 pt-0.5 outline-blue-500"
                v-model="sort"
                @change="fetch"
              >
                <option value="created">Created</option>
                <option value="updated">Updated</option>
                <option value="pushed">Pushed</option>
              </select>
            </div>
            <div>
              <label for="direction" class="block text-sm">Direction</label>
              <select
                id="direction"
                class="border border-gray-300 bg-white rounded px-4 pb-1 pt-0.5 outline-blue-500"
                v-model="direction"
                @change="fetch"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>
        <DataTable :data="data" :cells="cells" :headers="headers">
          <template #appendHeader>
            <DataTable.Header align="right"> Topics </DataTable.Header>
          </template>
          <template #appendCell="{ row }">
            <DataTable.Cell align="right">
              <Tag v-for="(topic, index) in row.topics" :key="index">
                {{ topic }}
              </Tag>
            </DataTable.Cell>
          </template>
        </DataTable>
        <div class="grid grid-cols-3 mt-4 items-center justify-items-center">
          <div v-if="links" class="space-x-4 text-sm justify-self-start">
            <Button :disabled="!links.first" @click="goToPage(firstPage)">
              First</Button
            >
            <Button :disabled="!links.prev" @click="goToPage(prevPage)">
              Prev</Button
            >
            <Button :disabled="!links.next" @click="goToPage(nextPage)">
              Next</Button
            >
            <Button :disabled="!links.last" @click="goToPage(lastPage)">
              Last</Button
            >
          </div>
          <div>
            <span>
              Page
              {{ page }} of
              {{ lastPage || page }}
            </span>
          </div>
          <div class="space-x-4 mb-4 flex items-center justify-self-end">
            <div>
              <label for="perPage" class="block text-sm">Per Page</label>
              <select
                id="perPage"
                class="border border-gray-300 bg-white rounded px-4 pb-1 pt-0.5 outline-blue-500"
                v-model="perPage"
                @change="fetch"
              >
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>
        </div>
      </Card>
    </Layout.Section>
  </Page>
</template>

<script setup lang="ts">
import { Button, Card, DataTable, Layout, Page, Tag } from '@/components';
import { useTable } from '@/composables';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { DateTime } from 'luxon';

type Data = {
  id: number;
  name: string;
  html_url: string;
  visibility: string;
  topics: string[];
  pushed_at: string;
  created_at: string;
};

const data = ref();
const links = ref();
const sort = ref('created');
const direction = ref('desc');
const visibility = ref('all');
const perPage = ref(25);
const page = ref(1);
const firstPage = ref();
const prevPage = ref();
const nextPage = ref();
const lastPage = ref();

onMounted(async () => {
  await fetch();
});

async function fetch() {
  const token = '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';
  const response = await axios.get(
    `https://api.github.com/user/repos?sort=${sort.value}&visibility=${visibility.value}&direction=${direction.value}&per_page=${perPage.value}&page=${page.value}`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  data.value = response.data;
  links.value = getLinks(response.headers['link'] as string);
  firstPage.value = getPage(links.value.first);
  prevPage.value = getPage(links.value.prev);
  nextPage.value = getPage(links.value.next);
  lastPage.value = getPage(links.value.last);
}

async function goToPage(value: number) {
  page.value = value;
  await fetch();
}

function getLinks(arr: string) {
  const data = (arr.length == 2 ? arr[1] : arr) as any;
  let parsedData: any = {};

  arr = data.split(',');

  for (let d of arr) {
    const linkInfo: any = /<([^>]+)>;\s+rel="([^"]+)"/gi.exec(d);

    parsedData[linkInfo[2]] = linkInfo[1];
  }

  return parsedData;
}

function getPage(link: string) {
  if (!link) {
    return '';
  }
  const params = new URLSearchParams(link.split('?')[1]);
  return params.get('page');
}

const { cells, headers } = useTable<Data>({
  headerMap: [
    {
      label: 'Name',
    },
    {
      label: 'Description',
      attributes: () => ({ colspan: 2 }),
    },
    {
      label: 'Visibility',
    },
    {
      label: 'Created',
    },
    {
      label: 'Last Pushed',
    },
  ],
  cellMap: [
    {
      name: 'name',
      component: () => 'a',
      componentAttributes: ({ row }) => ({
        class: 'text-blue-500 font-semibold',
        href: row.html_url,
        target: '_blank',
      }),
    },
    {
      name: 'description',
      attributes: () => ({ colspan: 2, class: 'text-sm' }),
    },
    {
      component: () => 'i',
      componentAttributes: ({ row }) => ({
        class:
          row?.visibility === 'private'
            ? 'text-red-500 fas fa-lock'
            : 'text-green-500 fas fa-globe',
      }),
    },
    {
      render: ({ row }) => {
        const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
        return DateTime.fromISO(row.created_at).setZone(timeZone).toRelative();
      },
    },
    {
      render: ({ row }) => {
        const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
        return DateTime.fromISO(row.pushed_at).setZone(timeZone).toRelative();
      },
    },
  ],
});
</script>
