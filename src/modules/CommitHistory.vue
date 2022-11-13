<template>
  <div class="bg-gray-900">
    <div class="grid grid-cols-2 gap-4">
      <div class="p-4" v-if="commitList && commitList.length">
        <div class="flex flex-col h-full justify-start">
          <div class="flex items-center justify-between mb-4">
            <div v-if="links" class="space-x-8 text-center">
              <button
                :disabled="!firstPage"
                @click="goToPage(firstPage)"
                class="text-white cursor-pointer"
                :class="{ 'opacity-50': !firstPage }"
              >
                <i class="fas fa-angle-double-left" />
              </button>
              <button
                :disabled="!prevPage"
                @click="goToPage(prevPage)"
                class="text-white cursor-pointer"
                :class="{ 'opacity-50': !prevPage }"
              >
                <i class="fas fa-angle-left" />
              </button>
              <button
                :disabled="!nextPage"
                @click="goToPage(nextPage)"
                class="text-white cursor-pointer"
                :class="{ 'opacity-50': !nextPage }"
              >
                <i class="fas fa-angle-right" />
              </button>
              <button
                :disabled="!lastPage"
                @click="goToPage(lastPage)"
                class="text-white cursor-pointer"
                :class="{ 'opacity-50': !lastPage }"
              >
                <i class="fas fa-angle-double-right" />
              </button>
            </div>
            <span class="text-white text-sm">
              {{ page }} of
              {{ lastPage || page }}
            </span>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="(item, index) in commitList" :key="index">
              <div class="inline-block cursor-pointer">
                <div
                  @click="fetchCommit(item, index)"
                  class="bg-slate-700 rounded p-2 hover:bg-slate-600 transition-all duration-200 flex items-center space-x-2 border"
                  :class="[
                    activeIndex == index
                      ? 'bg-slate-600 border-green-500'
                      : 'border-transparent',
                  ]"
                >
                  <span class="text-white text-sm">{{
                    item.commit.message
                  }}</span>
                  <Popover>
                    <template #trigger="{ toggle }">
                      <button
                        @mouseover.stop="toggle"
                        @mouseout.stop="toggle"
                        class="block"
                      >
                        <i class="fas fa-info-circle text-white" />
                      </button>
                    </template>
                    <div
                      class="bg-slate-800 rounded p-2 shadow whitespace-nowrap border border-slate-600"
                    >
                      <span class="text-blue-300 text-xs text-right"
                        >Authored by {{ item.commit.author.name }}
                        {{ getRelativeDate(item.commit.author.date) }}</span
                      >
                    </div>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div v-if="commit" class="bg-gray-800 h-full">
          <header class="bg-slate-700 mb-2 p-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="flex items-center justify-between">
                  <a
                    :href="commit.html_url"
                    target="_blank"
                    class="font-semibold"
                  >
                    <span class="text-white text-lg">{{
                      commit.commit.message
                    }}</span>
                    <i class="fas fa-link ml-2 text-green-500" />
                  </a>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <a
                  :href="commit.author.html_url"
                  target="_blank"
                  class="block rounded-full overflow-hidden w-8 h-8"
                >
                  <img :src="commit.author.avatar_url" />
                </a>
                <p class="text-sm text-gray-300">
                  Authored by {{ commit.commit.author.name }}
                  {{ getRelativeDate(commit.commit.author.date) }}
                </p>
              </div>
            </div>
            <div>
              <span class="text-sm text-gray-300 mt-1 block">{{
                commit.sha
              }}</span>
            </div>
            <div class="text-xs space-x-4 mt-2">
              <span class="text-green-500">
                <i class="fas fa-plus mr-1" />
                {{ commit.stats.additions }}
              </span>
              <span class="text-red-500">
                <i class="fas fa-minus mr-1" />
                {{ commit.stats.deletions }}
              </span>
              <span class="text-blue-500">
                <i class="fas fa-calculator mr-1" />
                {{ commit.stats.total }}
              </span>
            </div>
          </header>
          <div class="flex flex-wrap gap-2 p-4">
            <div
              v-for="(item, index) in commit.files"
              :key="index"
              class="bg-gray-700 p-2 rounded"
              :class="{
                'border-2 border-yellow-500': item.status == 'modified',
                'border-2 border-green-500': item.status == 'added',
                'border-2 border-red-500': item.status == 'removed',
              }"
            >
              <p class="text-white text-sm">{{ item.filename }}</p>
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { Popover } from '@/components';
import { usePagination } from '@/composables';
import { getRelativeDate } from '@/utils';

type Props = {
  item: any;
};

const props = defineProps<Props>();

const commitList = ref();
const commit = ref();
const link = ref();
const activeIndex = ref(-1);
const page = ref(1);

const { links, firstPage, prevPage, nextPage, lastPage, makeLinks } =
  usePagination({
    link: link.value,
  });

onMounted(async () => {
  await fetchCommitList();
});

async function goToPage(value: number) {
  page.value = value;
  await fetchCommitList();
}

async function fetchCommitList() {
  const token = import.meta.env.VITE_GH_PERSONAL_ACCESS_TOKEN;
  const response = await axios.get(
    `https://api.github.com/repos/${props.item.owner.login}/${props.item.name}/commits?page=${page.value}&per_page=20`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  commitList.value = response.data;
  link.value = response.headers['link'];
  makeLinks(link.value);
}

async function fetchCommit(item: any, index: number) {
  const token = import.meta.env.VITE_GH_PERSONAL_ACCESS_TOKEN;
  const response = await axios.get(`${item.url}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
    },
  });

  commit.value = response.data;
  activeIndex.value = index;
}
</script>
