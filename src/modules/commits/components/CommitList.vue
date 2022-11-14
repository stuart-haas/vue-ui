<template>
  <div class="space-y-2">
    <div v-for="(item, index) in data" :key="index">
      <div class="inline-block cursor-pointer">
        <div
          @click="fetch(item, index)"
          class="bg-slate-700 rounded p-1 hover:bg-slate-600 transition-all duration-200 flex items-center space-x-2 border-2"
          :class="[
            activeIndex == index
              ? 'bg-slate-600 border-green-500'
              : 'border-transparent',
          ]"
        >
          <span class="text-white text-sm">{{ item.commit.message }}</span>
          <span class="text-blue-300 text-xs text-right">
            Authored by {{ item.commit.author.name }}
            {{ getRelativeDate(item.commit.author.date) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getRelativeDate } from '@/utils';
import { ref, watch } from 'vue';
import { axiosInstance, Commit } from '@/api';
import { SetCommitDetail } from '../types';

type Props = {
  data: Commit[];
  setCommitDetail: SetCommitDetail;
};

const props = defineProps<Props>();

const activeItem = ref();
const activeIndex = ref(-1);

watch(
  () => props.data,
  (value) => {
    const index =
      activeItem.value &&
      value.findIndex((r) => r.node_id === activeItem.value.node_id);
    activeIndex.value = index;
  }
);

async function fetch(item: Commit, index: number) {
  const response = await axiosInstance.get(`${item.url}`);

  activeIndex.value = index;
  activeItem.value = response.data;

  props.setCommitDetail(activeItem.value);
}
</script>
