<template>
  <div class="Dropdown">
    <label :for="name" class="block text-sm">{{ label }}</label>
    <select
      :id="name"
      class="border border-gray-300 bg-white rounded px-4 pb-1 pt-0.5 outline-blue-500"
      :value="modelValue"
      @change="onChange"
    >
      <option v-for="(item, index) in items" :key="index" :value="item.value">
        {{ item.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { DropdownItem } from './types';

type Props = {
  name: string;
  label: string;
  items: DropdownItem[];
  modelValue?: string | number | boolean | null;
};

defineProps<Props>();

const emit = defineEmits(['update:modelValue']);

function onChange(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement)?.value);
}
</script>
