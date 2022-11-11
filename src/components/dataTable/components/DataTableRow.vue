<template>
  <tr class="DataTable__Row DataTableRow">
    <DataTableCell
      v-for="(cell, index) in cells"
      :key="index"
      :cell="cell"
      :row="row"
    />
  </tr>
</template>

<script setup lang="ts">
import { DataTableCell } from '.';
import { DataTableCellSchema, DataTableDataSchema } from '../types';

type Props = {
  row: DataTableDataSchema;
  cells: DataTableCellSchema[];
};

defineProps<Props>();
</script>
