<template>
  <Page title="Repositories">
    <Layout.Section>
      <Card>
        <div class="space-x-4 mb-4 flex items-center justify-between">
          <Dropdown
            v-model="queryParams.visibility"
            @change="fetch"
            label="Visibility"
            name="visibility"
            :items="visibilityItems"
          />
          <div class="space-x-4 mb-4 flex items-center">
            <Dropdown
              v-model="queryParams.sort"
              @change="fetch"
              label="Sort"
              name="sort"
              :items="sortItems"
            />
            <Dropdown
              v-model="queryParams.direction"
              @change="fetch"
              label="Direction"
              name="direction"
              :items="directionItems"
            />
          </div>
        </div>
        <DataTable :data="data" :cells="cells" :headers="headers">
          <template #appendHeader>
            <DataTable.Header align="center"> Topics </DataTable.Header>
            <DataTable.Header align="right"> Actions </DataTable.Header>
          </template>
          <template #appendCell="{ row }">
            <DataTable.Cell align="center">
              <Tag v-for="(topic, index) in row.topics" :key="index">
                {{ topic }}
              </Tag>
            </DataTable.Cell>
            <DataTable.Cell align="right">
              <Link :to="`/repositories/${row.owner.login}/${row.name}`">
                View
              </Link>
            </DataTable.Cell>
          </template>
        </DataTable>
        <Pagination
          v-model:page="queryParams.page"
          v-model:perPage="queryParams.per_page"
          :link="link"
          :fetch="fetch"
        />
      </Card>
    </Layout.Section>
  </Page>
</template>

<script setup lang="ts">
import {
  Card,
  DataTable,
  Layout,
  Page,
  Tag,
  Link,
  Dropdown,
  Pagination,
} from '@/components';
import { useTable, useFetch, QueryParams } from '@/composables';
import { onMounted, toRefs, reactive } from 'vue';
import { DateTime } from 'luxon';
import { Repository } from '@/api';

const visibilityItems = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Public',
    value: 'public',
  },
  {
    label: 'Private',
    value: 'private',
  },
];

const sortItems = [
  {
    label: 'Created',
    value: 'created',
  },
  {
    label: 'Updated',
    value: 'updated',
  },
  {
    label: 'Pushed',
    value: 'pushed',
  },
  {
    label: 'Full Name',
    value: 'full_name',
  },
];

const directionItems = [
  {
    label: 'Descending',
    value: 'desc',
  },
  {
    label: 'Ascending',
    value: 'asc',
  },
];

const queryParams = reactive({
  sort: 'created',
  visibility: 'all',
  direction: 'desc',
  per_page: 10,
  page: 1,
});

const { data, link, fetch } = useFetch<Repository[]>(
  'user/repos',
  toRefs(queryParams as QueryParams)
);

onMounted(async () => {
  await fetch();
});

const { cells, headers } = useTable<Repository>({
  headerMap: [
    {
      label: 'Name',
      attributes: () => ({ align: 'left', colspan: 2 }),
    },
    {
      label: 'Description',
      attributes: () => ({ colspan: 2, align: 'left' }),
    },
    {
      label: 'Visibility',
      attributes: () => ({ align: 'center' }),
    },
    {
      label: 'Created',
      attributes: () => ({ align: 'left' }),
    },
    {
      label: 'Last Pushed',
      attributes: () => ({ align: 'left' }),
    },
  ],
  cellMap: [
    {
      name: 'name',
      attributes: () => ({ align: 'left', colspan: 2 }),
      component: () => Link,
      componentAttributes: ({ row }) => ({
        component: 'a',
        iconRight: 'fas fa-external-link-square-alt text-sm',
        href: row.html_url,
        target: '_blank',
      }),
    },
    {
      name: 'description',
      attributes: () => ({ colspan: 2, class: 'text-sm' }),
    },
    {
      attributes: () => ({ align: 'center' }),
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
