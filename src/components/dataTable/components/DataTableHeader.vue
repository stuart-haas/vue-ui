<template>
  <th class="DataTable__Header DataTableHeader" v-bind="headerAttributes">
    <slot>
      <component :is="component" v-bind="componentAttributes">
        {{ render }}
      </component>
    </slot>
  </th>
</template>

<script setup lang="ts">
import { computed, ThHTMLAttributes } from 'vue';
import { DataTableHeaderSchema } from '../types';

type Props = {
  header?: DataTableHeaderSchema;
};

const props = defineProps<Props>();

const headerLabel = computed(() => props.header?.label);

const render = computed(() =>
  props.header?.render ? props.header.render() : headerLabel.value
);

const headerAttributesCallback = computed(
  () => (props.header?.attributes && props.header.attributes()) || {}
);

const headerAttributes = computed(() => ({
  ...headerAttributesCallback.value,
  align: 'left',
})) as ThHTMLAttributes;

const component = computed(() =>
  props.header?.component ? props.header?.component() : 'span'
);

const componentAttributes = computed(
  () =>
    props.header?.componentAttributes && props.header?.componentAttributes()
);
</script>

<style lang="postcss" scoped>
.DataTableHeader {
  @apply p-2 border-b-2 border-gray-500 text-gray-700;
}
</style>
