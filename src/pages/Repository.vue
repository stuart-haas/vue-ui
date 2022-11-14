<template>
  <Page :title="name">
    <Layout.Section>
      <Card title="Commits">
        <Commits v-if="data" :item="data" />
      </Card>
    </Layout.Section>
  </Page>
</template>

<script setup lang="ts">
import { Page, Card, Layout } from '@/components';
import { Commits } from '@/modules';
import { onMounted } from 'vue';
import { useFetch } from '@/composables';
import { useRoute } from 'vue-router';

const route = useRoute();

const name = route.params.name as string;

const { data, fetch } = useFetch(`repos/${route.params.owner}/${name}`);

onMounted(async () => {
  await fetch();
});
</script>
