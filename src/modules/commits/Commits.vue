<template>
  <div class="mb-4">
    <BranchDropdown
      :repository="item"
      v-model="queryParams.sha"
      @change="fetch"
    />
  </div>
  <div class="grid grid-cols-2">
    <div class="p-4 bg-gray-900" v-if="data && data.length">
      <div class="flex flex-col h-full justify-start">
        <Pagination :link="link" :goToPage="goToPage" />
        <CommitList :data="data" :setCommitDetail="setCommitDetail" />
      </div>
    </div>
    <div>
      <CommitDetail :data="commitDetail" :setFileDetail="setFileDetail" />
    </div>
  </div>
  <highlightjs v-if="fileRawData" autodetect :code="fileRawData" />
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, toRefs } from 'vue';
import { useFetch } from '@/composables';
import { Commit, File, Repository } from '@/api';
import {
  CommitDetail,
  Pagination,
  CommitList,
  BranchDropdown,
} from './components';

type Props = {
  item: Repository;
};

const props = defineProps<Props>();

const commitDetail = ref();
const fileDetail = ref();
const fileRawData = ref();

const queryParams = reactive({
  page: 1,
  per_page: 10,
  sha: '',
});

const { data, link, fetch } = useFetch<Commit[]>(
  `repos/${props.item.owner.login}/${props.item.name}/commits`,
  toRefs(queryParams)
);

onMounted(async () => {
  await fetch();
});

async function goToPage(value: string | number) {
  queryParams.page = value as number;
  await fetch();
}

function setCommitDetail(item: Commit) {
  commitDetail.value = item;
}

function setFileDetail(item: File, rawData: string) {
  fileDetail.value = item;
  fileRawData.value = rawData;
}
</script>
