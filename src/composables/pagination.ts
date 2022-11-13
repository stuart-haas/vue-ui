import { ref, watch } from 'vue';

export function usePagination(props: any) {
  const links = ref();
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

  function makeLinks(value: any) {
    if (value) {
      links.value = getLinks(value);
      firstPage.value = getPage(links.value.first);
      prevPage.value = getPage(links.value.prev);
      nextPage.value = getPage(links.value.next);
      lastPage.value = getPage(links.value.last);
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
    firstPage,
    prevPage,
    nextPage,
    lastPage,
    getLinks,
    getPage,
    makeLinks,
  };
}
