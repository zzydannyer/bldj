import { Ref, UnwrapRef } from 'vue';

export default function <T, K>(
  queryParams: Ref<QueryParams<T>>,
  fetchList: (params: QueryParams<T>) => Promise<ResRows<K>>
) {
  const loading = ref(false);
  const list = ref<K[]>([]);
  const finished = ref(false);
  const refreshing = ref(false);
  const listTotal = ref(0);

  async function onLoad() {
    try {
      loading.value = true;
      const { rows, total } = await fetchList(queryParams.value);

      if (refreshing.value) {
        list.value = [];
        refreshing.value = false;
      }

      list.value = [...list.value, ...rows] as UnwrapRef<K[]>;
      listTotal.value = total;

      if (list.value.length >= listTotal.value) {
        finished.value = true;
      } else {
        queryParams.value.pageNum += 1;
      }
    } catch (e) {
      console.error(e);
      finished.value = true;
    } finally {
      loading.value = false;
    }
  }

  function onRefresh() {
    refreshing.value = true;
    finished.value = false;
    queryParams.value.pageNum = 1;
    onLoad();
  }
  return { list, loading, refreshing, finished, onLoad, onRefresh };
}
