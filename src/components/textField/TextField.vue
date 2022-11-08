<template>
  <div class="TextField" :class="{ 'TextField--inline': inline }">
    <label v-if="label" :for="name" class="TextField_label">
      {{ label }}
    </label>
    <div
      class="TextField_input"
      :class="{ 'TextField_input--hasFocus': hasFocus }"
    >
      <div v-if="$slots.prepend" class="TextField_prepend">
        <slot name="prepend" />
      </div>
      <component
        class="TextField_element"
        :is="component"
        :type="type"
        :id="name"
        :name="name"
        :value="value"
        :placeholder="inputPlaceholder"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
      />
    </div>
  </div>
  <div v-if="errorMessage" class="TextField_error">
    {{ errorMessage }}
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
};

const props = withDefaults(defineProps<Props>(), {
  component: 'input',
  type: 'text',
  standalone: false,
  inline: false,
});

const emit = defineEmits(['update:value']);

const { value, handleChange, handleBlur, errorMessage } = useField(
  props.name as string,
  undefined,
  {
    initialValue: props.value,
    standalone: props.standalone,
  }
);

const hasFocus = ref(false);

const inputPlaceholder = computed(() =>
  props.placeholder ? props.placeholder : props.label
);

function onChange(e: Event) {
  emit('update:value', (e.target as HTMLInputElement).value);
  handleChange(e);
}

function onFocus() {
  hasFocus.value = true;
}

function onBlur(e: Event) {
  handleBlur(e);
  hasFocus.value = false;
}
</script>

<style lang="postcss" scoped>
.TextField--inline .TextField_label {
  @apply inline-block mr-2;
}
.TextField_label {
  @apply block text-sm;
}
.TextField_prepend {
  @apply inline mr-2;
}
.TextField_input {
  @apply border border-gray-300 rounded inline-block px-3 pb-1.5 pt-1 w-96 bg-white transition duration-200;
}
.TextField_input--hasFocus {
  @apply border-2 border-indigo-500;
}
.TextField_element {
  @apply outline-none;
}
</style>
