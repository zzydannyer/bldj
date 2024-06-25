<script setup lang="ts">
  import { debounce, pickBy, throttle } from 'lodash';
  import { isNotEmpty } from '@/utils';
  import { ComponentPublicInstance } from 'vue';
  import { emitter } from '@/plugins/mitt';

  defineOptions({
    name: 'VInsetList'
  });

  const {
    listFn,
    queryParams,
    shows = ['list'],
    keyName = 'id',
    rowsFilter
  } = defineProps({
    listFn: Function as PropType<any>,
    queryParams: Object as PropType<any>,
    shows: Array as PropType<any[]>,
    keyName: String as PropType<string>,
    rowsFilter: Function as PropType<() => {}>
  });
  const route = useRoute();
  const list = ref([]);
  const listRef = ref();
  const loading = ref(false);
  const finished = ref(false);
  const refreshing = ref(false);
  const proxy = getCurrentInstance()?.proxy as ComponentPublicInstance;

  // 记录滚动条位置
  const app = document.querySelector('#app')!;

  onBeforeRouteLeave(() => {});

  // 滚动隐藏头部
  onActivated(() => {});

  onDeactivated(() => {});

  onMounted(() => emitter.on('refresh', onRefresh));

  onBeforeUnmount(() => emitter.off('refresh'));

  const query = reactive({
    pageSize: 10,
    currentPage: 1
  });

  const listClass = computed(() => {
    const showsCopy = [...shows];
    return showsCopy.sort().join('-');
  });

  const _total = ref(0);

  /**
   * @description 加载数据
   */
  const onLoad = debounce(async () => {
    try {
      const filteEmpty = pickBy(toRaw(queryParams), isNotEmpty);
      const params = Object.assign({}, query, filteEmpty);
      const { rows, total } = await listFn(params);
      console.log('rows', rows);
      if (!rows) throw new Error('请求失败');
      // 刷新前列表清空
      if (refreshing.value) {
        list.value = [];
        refreshing.value = false;
      }

      list.value = list.value.concat(rows);
      _total.value = total;

      if (list.value.length >= _total.value) {
        finished.value = true;
      } else {
        query.currentPage += 1;
      }
    } catch (e) {
      finished.value = true;
    } finally {
      loading.value = false;
    }
  }, 1000);

  /**
   * @description 刷新数据
   */
  const onRefresh = () => {
    refreshing.value = true;
    // 清空列表数据
    finished.value = false;
    // 重新加载数据
    query.currentPage = 1;
    // 将 loading 设置为 true，表示处于加载状态
    loading.value = true;
    onLoad();
  };

  defineSlots<{
    default: (item: any) => any;
    list: (list: any) => any;
  }>();

  defineExpose({
    onLoad,
    onRefresh
  });
</script>

<template>
  <van-pull-refresh
    ref="listRef"
    v-model="refreshing"
    :class="listClass"
    @refresh="onRefresh"
  >
    <van-list
      v-model:loading="loading"
      error-text="请求失败，请稍后重试"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <slot :list="list" name="list">
        <van-cell-group
          v-for="(row, index) in list"
          :key="row[keyName] ?? index"
          :border="true"
          :inset="true"
        >
          <slot :index="index" :row="row" />
        </van-cell-group>
      </slot>
    </van-list>
  </van-pull-refresh>
  <van-back-top teleport="body" z-index="10" />
</template>

<style lang="scss" scoped>
  .van-pull-refresh {
    min-height: -webkit-fill-available;
    padding: $body-padding $body-padding 0;
    &.dropmenu-search {
      padding: calc($search-height + $dropmenu-height + $body-padding)
        $body-padding 0;
    }

    &.search-tabs {
      padding: calc($search-height + $tabs-height + $body-padding) $body-padding
        0;
    }

    &.search {
      padding: calc($search-height + $body-padding) $body-padding 0;
    }

    &.dropmenu {
      padding: calc($dropmenu-height + $body-padding) $body-padding 0;
    }

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
