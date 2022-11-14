<template>
  <Dropdown v-if="items" :items="items" label="Branches" name="branches" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Dropdown, DropdownItem } from '@/components';
import { useFetch } from '@/composables';
import { Branch, Repository } from '@/api';

type Props = {
  repository: Repository;
};

const props = defineProps<Props>();

const { data, fetch } = useFetch<Branch[]>(
  `repos/${props.repository.owner.login}/${props.repository.name}/branches`
);

const items = ref<DropdownItem[]>();

onMounted(async () => {
  await fetch();
  items.value = data.value?.map((r) => ({
    value: r.name,
    label: r.name,
  }));
});
</script>
