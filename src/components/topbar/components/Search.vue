<template>
  <TextField
    placeholder="Search"
    v-model:value="search"
    :validation="validation"
  >
    <template #prepend>
      <i class="fas fa-search text-gray-700" />
    </template>
  </TextField>
</template>

<script setup lang="ts">
import { TextField } from '@/components';
import { ref } from 'vue';
import { string } from 'yup';

const search = ref();

const validation = string().required().min(8);
</script>
