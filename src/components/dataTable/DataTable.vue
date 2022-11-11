<template>
  <table class="DataTable">
    <thead class="DataTable__header_group">
      <DataTableHeader
        v-for="(header, index) in headerMap"
        :key="index"
        :header="header"
      />
    </thead>
    <tbody class="DataTable__body">
      <DataTableRow
        v-for="(row, index) in data"
        :key="index"
        :row="row"
        :cells="cellMap"
      />
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { DataTableRow, DataTableHeader } from './components';
import {
  DataTableCellSchema,
  DataTableHeaderSchema,
  DataTableDataSchema,
} from './types';

type Props = {
  data: DataTableDataSchema[];
  headers?: DataTableHeaderSchema[];
  cells?: DataTableCellSchema[];
};

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  headers: () => [],
  cells: () => [],
});

const headerMap = computed(() => {
  if (props.headers.length) {
    return props.headers;
  }
  return props.data.length
    ? Object.keys(props.data[0]).map((e) => ({
        label: e,
      }))
    : [];
});

const cellMap = computed(() => {
  if (props.cells.length) {
    return props.cells;
  }
  return props.data.length
    ? Object.keys(props.data[0]).map((e) => ({
        name: e,
      }))
    : [];
});
</script>

<style lang="postcss" scoped>
.DataTable {
  @apply table-fixed w-full;
}
</style>
