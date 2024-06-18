<script setup lang="ts">
  import { useGlobal } from '@/utils';
  import { showConfirmDialog, showSuccessToast } from 'vant';
  import { listPublicResourceFile, delPublicResourceFile, updataIsHomeShow } from '@/api/media/publicResource';
  import { download } from '@/plugins/download';
  import useUserInfoStore from '@/store/modules/userInfo';
  import { hasAuth } from '@/utils/auth';
  import { Icon } from '@iconify/vue';
  import { emitter } from '@/plugins/mitt';

  defineOptions({
    name: 'PublicResource'
  });

  const userInfoStore = useUserInfoStore();
  const { $useDict, $parse } = useGlobal<GlobalPropertiesApi>();
  const { public_resourses_type } = $useDict('public_resourses_type');
  const listRef = ref();
  const route = useRoute();
  const router = useRouter();
  // 初始化
  const initQueryParams = () => ({
    projectName: '',
    resourceType: '',
    shootingTime: '',
    mediaType: '',
    resTitle: ''
  });
  const userId = userInfoStore.userId;
  const checked = ref(true);
  const queryParams = reactive(initQueryParams());
  // 重置
  const resetQuery = () => {
    queryParams.resTitle = '';
  };
  // 刷新首页重新赋值
  const handleSearch = () => {
    listRef.value.onRefresh();
  };
  //详情页
  const handleDetail = (id: number) => {
    router.push('/public/resource/detail/' + id);
  };
  // 切换的事件
  const switchChange = async (isHomeShow: any) => {
    await updataIsHomeShow(isHomeShow);
    showSuccessToast('切换成功');
  };
  // 跳转详情页
  const handleUpdate = (id: number) => {
    router.push('/public/resource/update/' + id);
  };
  // 下载
  const handleDown = (row: any) => {
    download(row.thumbUrl, row.name);
  };
  // 删除
  const handleDelete = (id: number) => {
    showConfirmDialog({
      title: '确定删除吗?'
    })
      .then(() => {
        delPublicResourceFile(id).then((res) => {
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
  // 刷新数据
  onMounted(() => emitter.on('refresh', handleSearch));

  onBeforeUnmount(() => emitter.off('refresh'));
</script>

<template>
  <main class="list-container">
    <v-search :showPopIcon="false" placeholder="请输入公共资源名称" v-model:searchVal="queryParams.resTitle" @handle-search="handleSearch" />

    <v-inset-list :shows="['search']" :list-fn="listPublicResourceFile" :query-params="queryParams" ref="listRef">
      <template #default="{ row, index }">
        <v-card body-class="flex gap-2">
          <van-image class="shink-0" width="100" height="100" :src="row.thumbUrl" />

          <section class="flex-1">
            <span class="v-list-title truncate-2">{{ row.resTitle }}</span>
            <div class="mt-2">
              <v-tag class="align-middle mr-1" plain :dictData="public_resourses_type" :value="row.fileType" />
              <van-switch
                size="14px"
                class="align-middle"
                v-model="row.isHomeShow"
                @change="switchChange(row)"
                active-value="1"
                inactive-value="0"
                active-color="#07c160"
                @click.stop
                v-auth="['publicresource:publicResourceFile:isHomeShow']"
              />
            </div>
          </section>
          <section class="absolute right-2 bottom-2">
            <van-button class="px-4" round type="default" hairline size="mini" text="查 看" @click="handleDetail(row.id)" />
            <van-button class="px-4" text="下 载" round size="mini" type="success" @click="handleDown(row)" />
            <van-button
              class="px-4"
              text="修 改"
              round
              type="primary"
              size="mini"
              @click="handleUpdate(row.id)"
              v-if="userId == row.creatorId"
              v-auth="['publicresource:publicResourceFile:update']"
            />
            <van-button class="px-4" text="删 除" round size="mini" type="danger" @click="handleDelete(row.id)" v-if="userId == row.creatorId" />
          </section>
        </v-card>
      </template>
    </v-inset-list>

    <!-- 新增按鈕 -->
    <van-floating-bubble axis="xy" magnetic="x" v-if="hasAuth('publicresource:publicResourceFile:add')">
      <van-button type="primary" size="large" round to="/public/resource/create">
        <van-swipe vertical class="button-swipe" :autoplay="4000" :duration="600" :touchable="false" :show-indicators="false">
          <van-swipe-item>
            <van-icon name="plus" />
          </van-swipe-item>
          <van-swipe-item class="whitespace-nowrap">新增</van-swipe-item>
        </van-swipe>
      </van-button>
    </van-floating-bubble>
  </main>
</template>

<style scoped>
  .button-swipe {
    height: 40px;
    line-height: 40px;
  }
</style>
