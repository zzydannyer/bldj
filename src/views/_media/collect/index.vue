<script setup lang="ts">
  import { userCollect } from '@/api/_media';
  import {
    showDialog,
    PickerOption,
    showConfirmDialog,
    showSuccessToast,
    showFailToast
  } from 'vant';
  import { treeResourceCategory, delUserCollect } from '@/api/_media';
  import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next';
  import 'vue-waterfall-plugin-next/dist/style.css';
  import { _today, _5_years_ago, joinDate, dateFormatter } from '@/utils/date';
  import { useGlobal } from '@/utils';

  defineOptions({
    name: 'MediaCollect'
  });

  const { $parse } = useGlobal<GlobalPropertiesApi>();

  interface SearchParams {
    projectName: string;
    resourceType: string;
    shootingTime: string;
    endshootingTime: string;
    mediaType: string;
    collectTimeChoose: string[];
  }

  const router = useRouter();
  const visibleShootingTimePopup = ref(false);
  const endvisibleShootingTimePopup = ref(false);
  const resourceTypeQueryText = ref('');
  const shootingTimeQueryText = ref('');
  const endshootingTimeQueryText = ref('');
  const mediaTypeQueryArray = ref([]);
  const listRef = ref();
  // 初始化
  const initQueryParams = () => ({
    projectName: '',
    resourceType: '',
    collectTimeChoose: [],
    shootingTime: '',
    endshootingTime: '',
    mediaType: ''
  });

  const queryParams = reactive<SearchParams>(initQueryParams());
  // 重置
  const resetQuery = () => {
    Object.assign(queryParams, initQueryParams());
    resourceTypeQueryText.value = '';
    mediaTypeQueryArray.value = [];
    shootingTimeQueryText.value = '';
    endshootingTimeQueryText.value = '';
  };
  // 获取资源分类列表
  const categoryOptions = ref<any[]>([]);
  const getResourceCategoryList = async () => {
    const { data } = await treeResourceCategory();
    categoryOptions.value = data as any[];
  };

  //开始时间确认
  const confirmDatePicker = ({ selectedOptions }: PickerOption) => {
    queryParams.collectTimeChoose[0] = $parse(
      joinDate(selectedOptions, 'value', '-'),
      'YYYY-MM-DD HH:mm:ss'
    );
    shootingTimeQueryText.value = joinDate(selectedOptions, 'text');
    if (
      queryParams.collectTimeChoose[1] &&
      queryParams.collectTimeChoose[0] > queryParams.collectTimeChoose[1]
    ) {
      showDialog({
        message: '结束时间小于开始时间\n请重新选择'
      });
    } else {
      shootingTimeQueryText.value = joinDate(selectedOptions, 'text');
      visibleShootingTimePopup.value = false;
    }
  };
  //结束时间确认
  const endconfirmDatePicker = ({ selectedOptions }: PickerOption) => {
    queryParams.collectTimeChoose[1] = $parse(
      joinDate(selectedOptions, 'value', '-'),
      'YYYY-MM-DD HH:mm:ss'
    );
    endshootingTimeQueryText.value = joinDate(selectedOptions, 'text');
    if (queryParams.collectTimeChoose[0] > queryParams.collectTimeChoose[1]) {
      showDialog({
        message: '结束时间小于开始时间\n请重新选择'
      });
    } else {
      endshootingTimeQueryText.value = joinDate(selectedOptions, 'text');
      endvisibleShootingTimePopup.value = false;
    }
  };
  const query = reactive({
    pageSize: 10,
    currentPage: 1
  });
  // 删除
  const handleDelete = (id: number) => {
    showConfirmDialog({
      title: '确定删除吗?'
    })
      .then(() => {
        delUserCollect(id).then((res) => {
          if (res.code == 200) {
            handleSearch();
            showSuccessToast('删除成功');
          }
        });
      })
      .catch(() => {
        // on cancel
      });
  };
  // 重新请求
  const handleSearch = () => {
    if (shootingTimeQueryText.value) {
      if (!endshootingTimeQueryText.value)
        return showFailToast('请填写结束时间');
    }
    if (endshootingTimeQueryText.value) {
      if (!shootingTimeQueryText.value) return showFailToast('请填写开始时间');
    }
    visibleShootingTimePopup.value = false;
    listRef.value.onRefresh();
  };
  // 跳转至详情页
  const handleView = (id: number) => {
    router.push('/media/collect/detail/' + id);
  };

  const options = {
    // 唯一key值
    rowKey: 'id',
    // 卡片之间的间隙
    gutter: 10,
    // 是否有周围的gutter
    hasAroundGutter: false,
    // 卡片在PC上的宽度
    width: 320,
    // 自定义行显示个数，主要用于对移动端的适配
    breakpoints: {
      1920: {
        rowPerView: 6
      },
      1200: {
        // 当屏幕宽度小于等于1200
        rowPerView: 5
      },
      1080: {
        // 当屏幕宽度小于等于1200
        rowPerView: 4
      },
      700: {
        // 当屏幕宽度小于等于800
        rowPerView: 3
      },
      450: {
        // 当屏幕宽度小于等于500
        rowPerView: 2
      }
    },
    // 动画效果 https://animate.style/
    animationEffect: 'animate__zoomInUp',
    // 动画时间
    animationDuration: 300,
    // 动画延迟
    animationDelay: 125,
    // 背景色
    // backgroundColor: "#fffff0",
    // 图片字段选择器，如果层级较深，使用 xxx.xxx.xxx 方式
    imgSelector: 'src.original',
    // 加载配置
    // loadProps: {
    //   loading,
    //   ImageError
    // },
    // 是否懒加载
    lazyload: true,
    style: {
      background: 'transparent'
    }
  };

  onBeforeMount(getResourceCategoryList);
</script>

<template>
  <main class="list-container">
    <v-search
      placeholder="请输入项目名称"
      v-model:searchVal="queryParams.projectName"
      @handle-search="handleSearch"
    >
      <template #popMenu>
        <!-- 拍摄时间 -->
        <van-field
          is-link
          readonly
          label="开始时间"
          placeholder="请选择开始时间"
          :model-value="shootingTimeQueryText"
          @click="visibleShootingTimePopup = true"
        />
        <van-popup
          v-model:show="visibleShootingTimePopup"
          :close-on-click-overlay="false"
          round
          teleport="body"
          position="bottom"
        >
          <van-date-picker
            title="拍摄时间"
            :min-date="_5_years_ago"
            :max-date="new Date()"
            :formatter="dateFormatter"
            @confirm="confirmDatePicker"
            @cancel="visibleShootingTimePopup = false"
          />
        </van-popup>
        <van-field
          :rules="[{ required: true, message: '请填写结束时间' }]"
          is-link
          readonly
          label="结束时间"
          placeholder="请选结束时间"
          :model-value="endshootingTimeQueryText"
          @click="endvisibleShootingTimePopup = true"
        />
        <van-popup
          v-model:show="endvisibleShootingTimePopup"
          :close-on-click-overlay="false"
          round
          teleport="body"
          position="bottom"
        >
          <van-date-picker
            title="拍摄时间"
            :min-date="_5_years_ago"
            :max-date="new Date()"
            :formatter="dateFormatter"
            @confirm="endconfirmDatePicker"
            @cancel="endvisibleShootingTimePopup = false"
          />
        </van-popup>

        <van-button
          block
          plain
          type="primary"
          class="border-0"
          @click="resetQuery"
        >
          重置
        </van-button>
      </template>
    </v-search>

    <v-inset-list
      :shows="['search']"
      :list-fn="userCollect"
      :query-params="queryParams"
      ref="listRef"
    >
      <template #list="{ list }">
        <Waterfall class="bg-transparent" :list="list" v-bind="options">
          <template #item="{ item }">
            <v-card style="padding: 10px" body-class="flex flex-col gap-2">
              <LazyImg style="" :url="item.thumbUrl" />
              <span class="text-base font-semibold line-clamp-2">
                {{ item.projectName }}
              </span>

              <span class="text-sm truncate text-gray-500">
                {{ '收藏于 ' + $parse(item.collectTime) }}
              </span>
              <v-plain-button
                class="px-4 self-end"
                round
                type="danger"
                size="mini"
                text="查 看"
                @click="handleView(item.id)"
              />
              <v-plain-button
                class="px-4 self-end"
                round
                type="danger"
                size="mini"
                text="删 除"
                @click="handleDelete(item.id)"
              />
            </v-card>
          </template>
        </Waterfall>
      </template>
    </v-inset-list>
  </main>
</template>

<style lang="scss" scoped>
  .lazy__box {
    padding-bottom: 0 !important;
    height: auto;
    max-height: 15rem;

    :deep(.lazy__resource) {
      position: relative;
      left: unset;
      top: unset;
      bottom: unset;
      right: unset;
    }

    .lazy__img[lazy='loading'] {
      padding: 5em 0;
      width: 48px;
    }

    .lazy__img[lazy='loaded'] {
      width: 100%;
      height: auto !important;
      aspect-ratio: auto;
    }

    .lazy__img[lazy='error'] {
      padding: 5em 0;
      width: 48px;
    }
  }

  .animate__zoomInUp {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
</style>
