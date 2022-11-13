<template>
  <tr class="DataTable__Row DataTableRow">
    <slot name="prependCell" :row="row" :index="index" :data="data" />
    <DataTableCell
      v-for="(cell, index) in cells"
      :key="index"
      :cell="cell"
      :row="row"
      :index="index"
      :data="data"
    />
    <slot name="appendCell" :row="row" :index="index" :data="data" />
  </tr>
  <slot />
</template>

<script setup lang="ts">
import { DataTableCell } from '.';
import { DataTableCellSchema, DataTableDataSchema } from '../types';

type Props = {
  row: DataTableDataSchema;
  cells: DataTableCellSchema[];
  index: number;
  data: DataTableDataSchema[];
};

defineProps<Props>();
</script>
