<template>
  <div v-if="data" class="bg-gray-800 h-full">
    <header class="bg-slate-700 mb-2 p-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="flex items-center justify-between">
            <a :href="data.html_url" target="_blank" class="font-semibold">
              <span class="text-white text-lg">{{ data.commit.message }}</span>
              <i class="fas fa-link ml-2 text-green-500" />
            </a>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <a
            :href="data.author.html_url"
            target="_blank"
            class="block rounded-full overflow-hidden w-8 h-8"
          >
            <img :src="data.author.avatar_url" />
          </a>
          <p class="text-sm text-gray-300">
            Authored by {{ data.commit.author.name }}
            {{ getRelativeDate(data.commit.author.date) }}
          </p>
        </div>
      </div>
      <div class="text-xs space-x-4 mt-2">
        <Popover class="inline">
          <template #anchor>
            <button class="text-green-500 py-1 px-2 bg-slate-600 rounded">
              <i class="fas fa-plus mr-1" />
              {{ data.stats.additions }}
            </button>
          </template>
          <div class="mt-2 relative">
            <i
              class="fas fa-caret-up absolute text-2xl -top-4 text-white left-1/2 transform -translate-x-1/2 text-center"
            />
            <div class="p-1 bg-white text-black rounded">
              {{ data.stats.additions }} additions
            </div>
          </div>
        </Popover>
        <Popover class="inline">
          <template #anchor>
            <button class="text-red-500 py-1 px-2 bg-slate-600 rounded">
              <i class="fas fa-minus mr-1" />
              {{ data.stats.deletions }}
            </button>
          </template>
          <div class="mt-2 relative">
            <i
              class="fas fa-caret-up absolute text-2xl -top-4 text-white left-1/2 transform -translate-x-1/2 text-center"
            />
            <div class="p-1 bg-white text-black rounded">
              {{ data.stats.deletions }} deletions
            </div>
          </div>
        </Popover>
        <Popover class="inline">
          <template #anchor>
            <button class="text-blue-500 py-1 px-2 bg-slate-600 rounded">
              <i class="fas fa-calculator mr-1" />
              {{ data.stats.total }}
            </button>
          </template>
          <div class="mt-2 relative">
            <i
              class="fas fa-caret-up absolute text-2xl -top-4 text-white left-1/2 transform -translate-x-1/2 text-center"
            />
            <div class="p-1 bg-white text-black rounded">
              {{ data.stats.total }} total
            </div>
          </div>
        </Popover>
      </div>
    </header>
    <FileList :data="data.files" :setFileDetail="setFileDetail" />
  </div>
  <div
    v-else
    class="bg-gray-800 p-4 text-gray-300 text-center flex flex-col items-center justify-center h-full"
  >
    <p class="text-lg">
      <i class="fas fa-arrow-left mr-2" />
      Select a commit
    </p>
  </div>
</template>

<script setup lang="ts">
import { getRelativeDate } from '@/utils';
import { Popover } from '@/components';
import { FileList } from '.';
import { SetFileDetail } from '../types';
import { Commit } from '@/api';

type Props = {
  data: Commit;
  setFileDetail: SetFileDetail;
};

defineProps<Props>();
</script>
