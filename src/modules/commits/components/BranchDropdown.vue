<template>
  <Dropdown :items="items" label="Branches" name="branches" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Dropdown } from '@/components';
import { useFetch } from '@/composables';

type Props = {
  repository: any;
};

const props = defineProps<Props>();

const { data, fetch } = useFetch<any[]>(
  `repos/${props.repository.owner.login}/${props.repository.name}/branches`
);

const items = ref<any[]>();

onMounted(async () => {
  await fetch();
  items.value = data.value?.map((r) => ({
    name: r.name,
    label: r.name,
  }));
});
</script>
