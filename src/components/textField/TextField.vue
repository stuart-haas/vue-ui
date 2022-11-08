<template>
  <div
    class="TextField"
    :class="{
      'TextField--hasFocus': hasFocus,
      'TextField--inline': inline,
      'TextField--error': errors.length,
    }"
  >
    <label v-if="label" :for="name" class="TextField__label">
      {{ label }}
    </label>
    <div class="TextField__control">
      <div v-if="icon" class="TextField__icon">
        <i :class="icon" />
      </div>
      <component
        class="TextField__component"
        :is="component"
        :type="type"
        :id="name"
        :name="name"
        :value="value"
        :placeholder="inputPlaceholder"
        @keyup="onUpdate"
        @change="onUpdate"
        @focus="onFocus"
        @blur="onBlur"
      />
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
import { computed, ref } from 'vue';
import { useField } from 'vee-validate';

type Props = {
  component?: 'input' | 'textarea';
  type?: 'text';
  name?: string;
  value?: string;
  label?: string;
  placeholder?: string;
  standalone?: boolean;
  inline?: boolean;
  validation?: any;
  icon?: string;
};

const props = withDefaults(defineProps<Props>(), {
  component: 'input',
  type: 'text',
  standalone: false,
  inline: false,
});

const emit = defineEmits(['update:value']);

const { value, handleChange, handleBlur, errors } = useField(
  props.name as string,
  props.validation,
  {
    type: props.type,
    initialValue: props.value,
    standalone: props.standalone,
  }
);

const hasFocus = ref(false);

const inputPlaceholder = computed(() =>
  props.placeholder ? props.placeholder : props.label
);

function onUpdate(e: Event) {
  emit('update:value', (e.target as HTMLInputElement).value);
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
.TextField--hasFocus .TextField__control {
  @apply border-2 border-blue-500;
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
.TextField__icon {
  @apply inline mr-2;
}
.TextField__control {
  @apply border border-gray-300 rounded inline-block px-3 pb-1.5 pt-1 w-96 bg-white transition duration-200;
}
.TextField__component {
  @apply outline-none;
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
