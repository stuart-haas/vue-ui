<template>
  <th class="DataTable__Header DataTableHeader" align="left">{{ render }}</th>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { DataTableHeaderSchema } from '../types';

type Props = {
  header: DataTableHeaderSchema;
};

const props = defineProps<Props>();

const headerLabel = computed(() => props.header.label);

const render = computed(() =>
  props.header.render ? props.header.render() : headerLabel.value
);
</script>

<style lang="postcss" scoped>
.DataTableHeader {
  @apply p-2 border-b-2 border-gray-500 text-gray-700;
}
</style>
