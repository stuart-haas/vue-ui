<template>
  <Page title="Dashboard">
    <Layout.Section>
      <Card>
        <DataTable :data="data" :cells="cells" :headers="headers" />
      </Card>
    </Layout.Section>
  </Page>
</template>

<script setup lang="ts">
import { Card, DataTable, Layout, Page } from '@/components';
import { useTable } from '@/composables';

type Data = {
  id: number;
  name: string;
  code: number;
  status: boolean;
};

const data = [
  {
    id: 1,
    name: 'test1',
    code: 123,
    status: true,
  },
  {
    id: 2,
    name: 'test2',
    code: 123,
    status: true,
  },
  {
    id: 3,
    name: 'test3',
    code: 123,
    status: true,
  },
  {
    id: 1,
    name: 'test4',
    code: 123,
    status: true,
  },
  {
    id: 2,
    name: 'test5',
    code: 123,
    status: true,
  },
];

const { cells, headers } = useTable<Data>({
  headerMap: [
    {
      label: 'Id',
    },
    {
      label: 'Name',
    },
    {
      label: 'Code',
    },
    {
      render: () => 'Status',
    },
  ],
  cellMap: [
    {
      name: 'id',
    },
    {
      name: 'name',
    },
    {
      name: 'code',
    },
    {
      render: ({ row }) => row.status,
    },
  ],
});
</script>
