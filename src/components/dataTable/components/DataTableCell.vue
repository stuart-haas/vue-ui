<template>
  <td class="DataTable__Cell DataTableCell" v-bind="cellAttributes">
    <slot>
      <component :is="component" v-bind="componentAttributes">
        {{ render }}
      </component>
    </slot>
  </td>
</template>

<script setup lang="ts">
import { computed, TdHTMLAttributes } from 'vue';
import { DataTableCellSchema, DataTableDataSchema } from '../types';

type Props = {
  row?: DataTableDataSchema;
  cell?: DataTableCellSchema;
  index?: number;
  data?: DataTableDataSchema[];
};

const props = defineProps<Props>();

const cellValue = computed(
  () => props.cell?.name && props.row && props.row[props.cell.name]
);

const render = computed(() =>
  props.cell?.render
    ? props.cell.render({
        row: props.row,
        index: props.index as number,
        data: props.data as DataTableDataSchema[],
      })
    : cellValue.value
);

const cellAttributesCallback = computed(
  () =>
    props?.cell?.attributes &&
    props.cell.attributes({
      row: props.row,
      index: props.index as number,
      data: props.data as DataTableDataSchema[],
    })
);

const cellAttributes = computed(() => ({
  ...cellAttributesCallback.value,
})) as TdHTMLAttributes;

const component = computed(() =>
  props?.cell?.component
    ? props.cell.component({
        row: props.row,
        index: props.index as number,
        data: props.data as DataTableDataSchema[],
      })
    : 'span'
);

const componentAttributes = computed(
  () =>
    props.cell?.componentAttributes &&
    props.cell.componentAttributes({
      row: props.row,
      index: props.index as number,
      data: props.data as DataTableDataSchema[],
    })
);
</script>

<style lang="postcss" scoped>
.DataTableCell {
  @apply p-2 border-b border-gray-200;
}
</style>
