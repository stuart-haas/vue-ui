<template>
  <div
    class="Dropdown"
    :class="[`Dropdown--active-${active}`]"
    @click="toggle"
    v-click-outside="close"
  >
    <label v-if="label" :for="name" class="Dropdown__label">
      {{ label }}
    </label>
    <TextField :value="modelValue" :name="name" type="hidden" />
    <div class="Dropdown__value">
      <span>{{ activeItem?.label }}</span>
      <slot name="icon">
        <i
          class="Dropdown__icon"
          :class="[active ? 'fas fa-caret-left' : 'fas fa-caret-down']"
        />
      </slot>
    </div>
    <transition name="slide-fade">
      <div class="Dropdown__items" v-show="active">
        <div
          class="Dropdown__item"
          v-for="(item, index) in items"
          :key="index"
          @click="onClickItem(item.value)"
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

function toggle() {
  active.value = !active.value;
}

function close() {
  active.value = false;
}

function onClickItem(value: string | number | boolean | null) {
  emit('update:modelValue', value);
  emit('change', value);
}
</script>

<style lang="postcss" scoped>
.Dropdown {
  @apply relative cursor-pointer;
}
.Dropdown--active-true .Dropdown__value {
  @apply rounded-t rounded-b-none;
}
.Dropdown__label {
  @apply block text-sm;
}
.Dropdown__value {
  @apply rounded-t rounded-b border border-gray-300 pl-3 pr-8 pb-1.5 pt-1 bg-white flex items-center justify-between;
}
.Dropdown__items {
  @apply absolute top-full left-0 bg-white rounded-b shadow border-b border-l border-r border-gray-300 z-10 w-full;
}
.Dropdown__item {
  @apply px-2 py-1 bg-white hover:bg-slate-200 transition-colors duration-200;
}
.Dropdown__icon {
  @apply absolute right-3;
}
</style>
