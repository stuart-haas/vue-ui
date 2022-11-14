import { axiosInstance } from '@/api';
import { ref, ToRefs } from 'vue';

export type Visibility = 'all' | 'public' | 'private';
export type Direction = 'asc' | 'desc';

export type QueryParams = {
  sort?: string;
  visibility?: Visibility;
  direction?: Direction;
  per_page?: number;
  page?: number;
};

export function useFetch<T = unknown>(
  endpoint: string,
  queryParams?: ToRefs<QueryParams>
) {
  const data = ref<T>();
  const link = ref();

  async function fetch() {
    const urlSearchParams = new URLSearchParams();

    if (queryParams) {
      Object.entries(queryParams).forEach((e) => {
        urlSearchParams.append(e[0], e[1].value as string);
      });
    }

    const response = await axiosInstance.get(
      `${endpoint}?${urlSearchParams.toString()}`
    );

    data.value = response.data;
    link.value = response.headers['link'];
  }

  return {
    fetch,
    data,
    link,
  };
}
