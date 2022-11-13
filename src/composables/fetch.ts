import axios from 'axios';
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

export function useFetch(endpoint: string, queryParams?: ToRefs<QueryParams>) {
  const data = ref();
  const link = ref();

  async function fetch() {
    const urlSearchParams = new URLSearchParams();

    if (queryParams) {
      Object.entries(queryParams).forEach((e) => {
        urlSearchParams.append(e[0], e[1].value as string);
      });
    }

    const token = import.meta.env.VITE_GH_PERSONAL_ACCESS_TOKEN;
    const axiosInstance = axios.create({
      baseURL: 'https://api.github.com',
    });
    const response = await axiosInstance.get(
      `${endpoint}?${urlSearchParams.toString()}`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${token}`,
        },
      }
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
