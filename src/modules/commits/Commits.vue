<template>
  <div class="grid grid-cols-2">
    <div class="p-4 bg-gray-900" v-if="data && data.length">
      <div class="flex flex-col h-full justify-start">
        <Pagination :link="link" :goToPage="goToPage" />
        <CommitList :data="data" :setActiveItem="setCommitDetail" />
      </div>
    </div>
    <div>
      <CommitDetail :data="commitDetail" :setFileDetail="setFileDetail" />
    </div>
  </div>
  <highlightjs v-if="fileDetail" autodetect :code="fileDetail" />
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, toRefs } from 'vue';
import { useFetch } from '@/composables';
import { Repository } from '@/api';
import { CommitDetail, Pagination, CommitList } from './components';

type Props = {
  item: Repository;
};

const props = defineProps<Props>();

const commitDetail = ref();
const fileDetail = ref();

const queryParams = reactive({
  page: 1,
  per_page: 10,
});

const { data, link, fetch } = useFetch(
  `repos/${props.item.owner.login}/${props.item.name}/commits`,
  toRefs(queryParams)
);

onMounted(async () => {
  await fetch();
});

async function goToPage(value: number) {
  queryParams.page = value;
  await fetch();
}

function setCommitDetail(data: any) {
  commitDetail.value = data;
}

function setFileDetail(data: any) {
  fileDetail.value = data;
}
</script>
