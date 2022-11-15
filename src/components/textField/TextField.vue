<template>
  <div
    class="TextField"
    :class="[
      {
        'TextField--hasFocus': hasFocus,
        'TextField--inline': inline,
        'TextField--error': errors.length,
      },
      `TextField--type-${type}`,
    ]"
  >
    <label v-if="label" :for="name" class="TextField__label">
      {{ label }}
    </label>
    <div class="TextField__control">
      <div v-if="iconLeft" class="TextField__icon-left">
        <i :class="iconLeft" />
      </div>
      <component
        class="TextField__component"
        :class="[{ 'TextField__component--readonly': readonly }]"
        :is="component"
        :type="type"
        :id="name"
        :name="name"
        :value="inputValue"
        :placeholder="inputPlaceholder"
        :readonly="readonly"
        @keyup="onUpdate"
        @change="onUpdate"
        @focus="onFocus"
        @blur="onBlur"
      />
      <div v-if="iconRight" class="TextField__icon-right">
        <i :class="iconRight" />
      </div>
    </div>
    <div v-if="errors.length" class="TextField__errors">
      <span
        v-for="(error, index) in errors"
        :key="index"
        class="TextField__error"
      >
        <i class="TextField__error-icon fas fa-exclamation-circle" />
        <span class="TextField__error-text">{{ error }}</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useField } from 'vee-validate';

type Props = {
  component?: 'input' | 'textarea';
  type?: 'text' | 'hidden';
  name?: string;
  modelValue?: string | number | boolean | null;
  label?: string;
  placeholder?: string;
  standalone?: boolean;
  inline?: boolean;
  validation?: any;
  iconLeft?: string;
  iconRight?: string;
  readonly?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  component: 'input',
  type: 'text',
  standalone: false,
  inline: false,
  readonly: false,
});

const emit = defineEmits(['update:modelValue']);

const {
  value: inputValue,
  handleChange,
  handleBlur,
  errors,
} = useField(props.name as string, props.validation, {
  type: props.type,
  initialValue: props.modelValue,
  standalone: props.standalone,
});

const hasFocus = ref(false);

const inputPlaceholder = computed(() =>
  props.placeholder ? props.placeholder : props.label
);

watch(
  () => props.modelValue,
  (value) => {
    inputValue.value = value;
  }
);

function onUpdate(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
  handleChange(e);
}

function onFocus() {
  hasFocus.value = true;
}

function onBlur(e: Event) {
  hasFocus.value = false;
  handleBlur(e);
}
</script>

<style lang="postcss" scoped>
.TextField--type-hidden {
  @apply hidden;
}
.TextField--hasFocus .TextField__control {
  @apply border-blue-500;
}
.TextField--inline .TextField__label {
  @apply inline-block mr-2;
}
.TextField--error .TextField__control {
  @apply border-red-500;
}
.TextField__label {
  @apply block text-sm;
}
.TextField__icon-left {
  @apply mr-2;
}
.TextField__icon-right {
  @apply ml-2;
}
.TextField__control {
  @apply flex items-center justify-between border border-gray-300 rounded px-3 pb-1.5 pt-1 w-full bg-white transition duration-200;
}
.TextField__component {
  @apply outline-none flex-1;
}
.TextField__component--readonly {
  @apply cursor-pointer;
}
.TextField__errors {
  @apply mt-1;
}
.TextField__error {
  @apply block;
}
.TextField__error-icon {
  @apply mr-1 text-red-500 text-sm;
}
.TextField__error-text {
  @apply text-sm text-red-500;
}
</style>
