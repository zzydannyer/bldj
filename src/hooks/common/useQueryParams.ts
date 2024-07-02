import { Ref } from 'vue';
import { cloneDeep } from 'lodash';
export default function <T extends object>(
  params: T
): [Ref<QueryParams<T>>, () => void] {
  function reinitialize(obj: T) {
    return cloneDeep(obj);
  }

  const queryParams = ref({
    params: reinitialize(params),
    pageNum: 1,
    pageSize: 10
  }) as Ref<QueryParams<T>>;

  function resetQueryParams() {
    queryParams.value = {
      params: reinitialize(params),
      pageNum: 1,
      pageSize: 10
    };
  }

  return [queryParams, resetQueryParams];
}
