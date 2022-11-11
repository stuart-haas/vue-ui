<template>
  <td class="DataTable__Cell DataTableCell">{{ render }}</td>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { DataTableCellSchema, DataTableDataSchema } from '../types';

type Props = {
  row: DataTableDataSchema;
  cell: DataTableCellSchema;
};

const props = defineProps<Props>();

const cellValue = computed(() => props.cell.name && props.row[props.cell.name]);

const render = computed(() =>
  props.cell.render ? props.cell.render({ row: props.row }) : cellValue.value
);
</script>

<style lang="postcss" scoped>
.DataTableCell {
  @apply p-2 border-b border-gray-200;
}
</style>
