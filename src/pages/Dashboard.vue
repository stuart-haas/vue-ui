<template>
  <Page title="Dashboard">
    <Layout.Section>
      <Card>
        <div class="space-x-4 mb-4 flex items-center justify-between">
          <Dropdown
            v-model="visibility"
            @change="fetch"
            label="Visibility"
            name="visibility"
            :items="visibilityItems"
          />
          <div class="space-x-4 mb-4 flex items-center">
            <Dropdown
              v-model="sort"
              @change="fetch"
              label="Sort"
              name="sort"
              :items="sortItems"
            />
            <Dropdown
              v-model="direction"
              @change="fetch"
              label="Direction"
              name="direction"
              :items="directionItems"
            />
          </div>
        </div>
        <DataTable :data="data" :cells="cells" :headers="headers">
          <template #default="{ index }">
            <transition name="fade">
              <tr v-if="index === activeRow" class="border-b border-gray-300">
                <td colspan="9">
                  <div class="p-4 bg-gray-100 rounded my-4">
                    <p class="font-semibold">Commit History</p>
                    <div v-for="(item, index) in rowData" :key="index">
                      <a
                        :href="item.html_url"
                        target="_blank"
                        class="text-sm text-blue-500"
                        >{{ item.commit.message }}</a
                      >
                    </div>
                  </div>
                </td>
              </tr>
            </transition>
          </template>
          <template #appendHeader>
            <DataTable.Header align="center"> Topics </DataTable.Header>
            <DataTable.Header align="right"> Actions </DataTable.Header>
          </template>
          <template #appendCell="{ row, index }">
            <DataTable.Cell align="center">
              <Tag v-for="(topic, index) in row.topics" :key="index">
                {{ topic }}
              </Tag>
            </DataTable.Cell>
            <DataTable.Cell align="right">
              <ActionList.Item
                icon="fas fa-project-diagram"
                @click="toggleRow(row, index)"
              >
                View Commits
              </ActionList.Item>
            </DataTable.Cell>
          </template>
        </DataTable>
        <Pagination
          v-model:page="page"
          v-model:perPage="perPage"
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
  ActionList,
  Link,
  Dropdown,
  Pagination,
} from '@/components';
import { useTable } from '@/composables';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { DateTime } from 'luxon';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

type Data = {
  id: number;
  name: string;
  html_url: string;
  visibility: string;
  topics: string[];
  pushed_at: string;
  created_at: string;
  owner: any;
};

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

const activeRow = ref(-1);
const rowData = ref<any[]>([]);
const chartData = ref();
const data = ref();
const link = ref();
const sort = ref('created');
const direction = ref('desc');
const visibility = ref('all');
const perPage = ref(10);
const page = ref(1);

onMounted(async () => {
  await fetch();
});

async function fetch() {
  const token = import.meta.env.VITE_GH_PERSONAL_ACCESS_TOKEN;
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
  link.value = response.headers['link'];
}

async function toggleRow(row: any, index: number) {
  if (activeRow.value == index) {
    activeRow.value = -1;
    return;
  }
  activeRow.value = index;
  const token = import.meta.env.VITE_GH_PERSONAL_ACCESS_TOKEN;
  const response = await axios.get(
    `https://api.github.com/repos/${row.owner.login}/${row.name}/commits`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  rowData.value = response.data;

  chartData.value = {
    labels: rowData.value.map((r) => r.commit.message),
    datasets: [
      {
        data: rowData.value.map((r) => r.commit.author.date),
      },
    ],
  };
}

const { cells, headers } = useTable<Data>({
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
