import { ref, watch } from 'vue';

export type UsePaginationProps = {
  link: string;
}

export function usePagination(props: UsePaginationProps) {
  const links = ref();
  const currentPage = ref();
  const firstPage = ref();
  const prevPage = ref();
  const nextPage = ref();
  const lastPage = ref();

  watch(
    () => props.link,
    (value) => {
      makeLinks(value);
    }
  );

  function makeLinks(value: string) {
    if (value) {
      links.value = getLinks(value);
      firstPage.value = getPage(links.value.first);
      prevPage.value = getPage(links.value.prev);
      nextPage.value = getPage(links.value.next);
      lastPage.value = getPage(links.value.last);
      if (lastPage.value) {
        currentPage.value = +nextPage.value - 1;
      }
      if (firstPage.value) {
        currentPage.value = +prevPage.value + 1;
      }
    } else {
      links.value = null;
    }
  }

  function getLinks(link: string) {
    const parsedData: Record<string, unknown> = {};

    const splitData = link.split(',');

    for (const d of splitData) {
      const linkInfo = /<([^>]+)>;\s+rel="([^"]+)"/gi.exec(
        d
      ) as RegExpExecArray;

      parsedData[linkInfo[2]] = linkInfo[1];
    }

    return parsedData;
  }

  function getPage(link: string) {
    if (!link) {
      return null;
    }
    const params = new URLSearchParams(link.split('?')[1]);
    return params.get('page');
  }

  return {
    links,
    currentPage,
    firstPage,
    prevPage,
    nextPage,
    lastPage,
    getLinks,
    getPage,
    makeLinks,
  };
}
