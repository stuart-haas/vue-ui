<template>
  <div class="flex flex-wrap gap-2 p-4">
    <div
      v-for="(item, index) in data"
      :key="index"
      class="bg-gray-700 p-2 rounded border-2"
      :class="{
        'border-yellow-500': item.status == 'modified',
        'border-green-500': item.status == 'added',
        'border-red-500': item.status == 'removed',
        'border-orange-500': item.status == 'renamed',
      }"
      @click="getContents(item.contents_url)"
    >
      <p class="text-white text-sm">
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
    <div>
      {{ content }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

type Props = {
  data: any;
  setFileDetail: any;
};

const props = defineProps<Props>();

const content = ref();

async function getContents(url: any) {
  const response = await axios.post('http://localhost:3000/contents', {
    url,
  });
  props.setFileDetail(response.data);
}
</script>
