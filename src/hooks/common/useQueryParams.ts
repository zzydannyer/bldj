import { Ref } from 'vue';
export default function <T>(params: T): [Ref<QueryParams<T>>, () => void] {
  const queryParams = ref({
    params,
    pageNum: 1,
    pageSize: 10
  }) as Ref<QueryParams<T>>;

  function resetQueryParams() {
    queryParams.value = {
      params,
      pageNum: 1,
      pageSize: 10
    };
  }

  return [queryParams, resetQueryParams];
}
