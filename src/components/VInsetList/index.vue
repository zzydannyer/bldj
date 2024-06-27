<script setup lang="ts" generic="T extends object">
  import { debounce } from 'lodash';
  import { QueryParams } from '@/types/params';

  defineOptions({
    name: 'VInsetList'
  });

  const {
    keyName = 'uid',
    listFn,
    listFilter
  } = defineProps({
    keyName: String as PropType<string>,
    listFn: Function as PropType<any>,
    listFilter: Function as PropType<() => {}>
  });

  const queryParams = defineModel('queryParams', {
    type: Object as PropType<QueryParams<T>>,
    default: () => ({
      params: {},
      pageSize: 10,
      pageNum: 1
    })
  });

  const loading = defineModel('loading', {
    type: Boolean,
    default: false
  });

  const list = ref([]);
  const computedList = computed(() =>
    listFilter ? listFilter(list.value) : list.value
  );

  const listRef = ref(null);

  const finished = ref(false);
  const refreshing = ref(false);

  const listTotal = ref(0);

  async function onLoad() {
    try {
      console.log(666);
      loading.value = true;
      const { rows, total } = await listFn(queryParams.value);

      if (refreshing.value) {
        list.value = [];
        refreshing.value = false;
      }

      list.value = list.value.concat(rows);
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

  const onRefresh = () => {
    refreshing.value = true;
    finished.value = false;
    queryParams.value.pageNum = 1;
    onLoad();
  };

  defineSlots<{
    row: (row: any, index: number) => any;
    list: (list: any) => any;
  }>();

  defineExpose({
    onLoad,
    onRefresh
  });
</script>

<template>
  <van-pull-refresh ref="listRef" v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      error-text="请求失败，请稍后重试"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <slot :list="computedList" name="list">
        <van-cell-group
          v-for="(row, index) in computedList"
          :key="row[keyName] ?? index"
          :border="true"
          :inset="true"
        >
          <slot :index="index" :row="row" name="row" />
        </van-cell-group>
      </slot>
    </van-list>
  </van-pull-refresh>
  <van-back-top teleport="body" z-index="9" />
</template>

<style lang="scss" scoped>
  .van-pull-refresh {
    padding: 0 $body-padding;

    .van-list {
      display: flex;
      flex-flow: column nowrap;
      gap: $list-gap;

      .van-cell-group {
        margin: 0;
      }
    }
  }
</style>
