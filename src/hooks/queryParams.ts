import { Ref } from 'vue';

interface QueryParams<T> {
  params: T;
  pageNum: number;
  pageSize: number;
}

export default function <T>(params: T): [Ref<QueryParams<T>>, () => void] {
  const queryParams = ref({
    params: params,
    pageNum: 10,
    pageSize: 1
  }) as Ref<QueryParams<T>>;

  function resetQueryParams() {
    queryParams.value = {
      params: params,
      pageNum: 10,
      pageSize: 1
    };
  }

  return [queryParams, resetQueryParams];
}
