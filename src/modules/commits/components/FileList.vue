<template>
  <div class="flex flex-wrap gap-2 p-4">
    <div
      v-for="(item, index) in data"
      :key="index"
      class="p-2 rounded border-2 cursor-pointer hover:bg-slate-700 transition-colors duration-200"
      :class="[
        {
          'border-yellow-500': item.status == 'modified',
          'border-green-500': item.status == 'added',
          'border-red-500': item.status == 'removed',
          'border-orange-500': item.status == 'renamed',
        },
        activeIndex == index ? 'bg-slate-700' : 'bg-slate-900',
      ]"
      @click="getContents(item, index)"
    >
      <p class="text-white text-sm font-mono">
        <span v-if="item.previous_filename">
          {{ item.previous_filename }}
          <i class="fas fa-arrow-right text-xs mx-1" />
        </span>
        {{ item.filename }}
      </p>
      <div class="text-xs space-x-4 mt-1">
        <span class="text-green-500">
          <i class="fas fa-plus mr-1" />
          {{ item.additions }}
        </span>
        <span class="text-red-500">
          <i class="fas fa-minus mr-1" />
          {{ item.deletions }}
        </span>
        <span class="text-yellow-500">
          <i class="fas fa-pen mr-1" />
          {{ item.changes }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import axios from 'axios';
import { File } from '@/api';
import { SetFileDetail } from '../types';

type Props = {
  data: File[];
  setFileDetail: SetFileDetail;
};

const props = defineProps<Props>();

const activeItem = ref();
const activeIndex = ref();

watch(
  () => props.data,
  (value) => {
    const index =
      activeItem.value &&
      value.findIndex((r) => r.filename === activeItem.value.filename);
    activeIndex.value = index;
  }
);

async function getContents(item: File, index: number) {
  const { contents_url } = item;
  const response = await axios.post('http://localhost:3000/contents', {
    contents_url,
  });
  activeItem.value = item;
  activeIndex.value = index;
  props.setFileDetail(item, response.data);
}
</script>
