import { Ref } from 'vue';
import { QueryParams } from '@/types/params';

export default function <T>(params: T): [Ref<QueryParams<T>>, () => void] {
  const queryParams = ref({
    params,
    pageNum: 10,
    pageSize: 1
  }) as Ref<QueryParams<T>>;

  function resetQueryParams() {
    queryParams.value = {
      params,
      pageNum: 10,
      pageSize: 1
    };
  }

  return [queryParams, resetQueryParams];
}
