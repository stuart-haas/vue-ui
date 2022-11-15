<template>
  <div
    class="Dropdown"
    :class="[{ 'Dropdown--active': active }]"
    @click="toggle"
    v-click-outside="close"
  >
    <TextField
      class="Dropdown__field"
      v-model="label"
      :name="name"
      :label="label"
      :iconRight="active ? 'fas fa-caret-left' : 'fas fa-caret-down'"
      readonly
    />
    <transition name="slide-fade">
      <div class="Dropdown__items" v-show="active">
        <div
          class="Dropdown__item"
          v-for="(item, index) in items"
          :key="index"
          @click="onClickItem(item)"
        >
          {{ item.label }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { DropdownItem } from './types';
import { TextField } from '../textField';

type Props = {
  name: string;
  label: string;
  items: DropdownItem[];
  modelValue?: string | number | boolean | null;
};

const props = defineProps<Props>();

const emit = defineEmits(['update:modelValue', 'change']);

const active = ref(false);

const activeItem = computed(() =>
  props.items.find((r) => r.value === props.modelValue)
);

const value = computed(() => activeItem.value?.value);

const label = computed(() => activeItem.value?.label);

function toggle() {
  active.value = !active.value;
}

function close() {
  active.value = false;
}

function onClickItem(item: DropdownItem) {
  const { value } = item;
  emit('update:modelValue', value);
  emit('change', value);
}
</script>

<style lang="postcss" scoped>
.Dropdown {
  @apply relative cursor-pointer;
}
.Dropdown--active .Dropdown__field {
  @apply rounded-t rounded-b-none;
}
.Dropdown__items {
  @apply absolute top-full left-0 bg-white rounded-b shadow border-b border-l border-r border-gray-300 z-10 w-full;
}
.Dropdown__item {
  @apply px-2 py-1 bg-white hover:bg-slate-200 transition-colors duration-200;
}
</style>
