<script setup lang="ts">
  import { listMedia, delMedia } from '@/api/media';
  import { submitMedia } from '@/api/media';
  import { MediaMainQuery } from '@/types/_media';
  import { showConfirmDialog } from 'vant';
  import { showSuccessToast } from 'vant';
  import { hasRole } from '@/directives/auth/index';
  import { hasAuth } from '@/utils/auth';
  import { useGlobal } from '@/utils';
  import { includes } from 'lodash';
  import ResourceType from '@/views/media/resourceType.tsx';

  defineOptions({
    name: 'MediaUpload'
  });

  const { $parse } = useGlobal<GlobalPropertiesApi>();
  const queryParams = reactive<MediaMainQuery>(new MediaMainQuery());
  const router = useRouter();
  const mediaTypeQueryArray = ref([]);

  const resetQuery = () => {
    Object.assign(queryParams, new MediaMainQuery());
    mediaTypeQueryArray.value = [];
  };
  const listRef = ref();
  const handleSearch = () => {
    queryParams.shootingTime = queryParams.shootingTime ? $parse(queryParams.shootingTime, 'YYYY-MM-DD HH:mm:ss') : '';
    listRef.value.onRefresh();
  };

  const onChangeMediaType = (value: string[]) => {
    if (value.length === 2 || value.length === 0) {
      queryParams.mediaType = '';
      return;
    }
    queryParams.mediaType = value[0];
  };

  // 提交
  const handleSubmit = (id: number) => {
    showConfirmDialog({
      title: '是否确认提交？'
    })
      .then(() => {
        submitMedia(id).then(() => {
          showSuccessToast('提交成功');
          handleSearch();
        });
      })
      .catch(() => {
        // on cancel
      });
  };

  //刪除
  const handleDelete = (id: number) => {
    showConfirmDialog({
      title: '是否确认刪除？'
    })
      .then(() => {
        delMedia(id).then(() => {
          showSuccessToast('删除成功');
          handleSearch();
        });
      })
      .catch(() => {
        // on cancel
      });
  };

  // 分享面板
  const show = ref(false);
  const actions = [
    { name: '新增视频', path: '/media/upload/create/2' },
    { name: '新增图片', path: '/media/upload/create/1' }
  ];
  const onSelect = (item: any) => {
    // 默认情况下点击选项时不会自动收起
    show.value = false;
    router.push(item.path);
  };

  // 修改素材上传
  const handleEdit = (id: number) => {
    router.push({
      path: '/media/upload/update/' + id
    });
  };

  const handleDetail = (id: number) => {
    router.push({
      path: '/media/upload/detail/' + id
    });
  };

  const handleCreate = () => {
    show.value = true;
  };
</script>

<template>
  <main class="list-container">
    <v-search placeholder="请输入项目名称" v-model:searchVal="queryParams.projectName" @handle-search="handleSearch">
      <template #popMenu>
        <!-- 资源类别 -->
        <resource-type :required="false" v-model="queryParams.resourceType" />

        <!-- 拍摄时间 -->
        <v-date-picker v-model="queryParams.shootingTime" label="拍摄时间" placeholder="请选择拍摄时间" />

        <van-button block plain type="primary" class="border-0" @click="resetQuery"> 重置 </van-button>
      </template>
    </v-search>

    <!-- 新增按鈕 -->
    <van-floating-bubble axis="xy" magnetic="x" v-if="hasAuth('multimedia:media:add')">
      <van-button type="primary" size="large" round @click="handleCreate">
        <van-swipe vertical class="button-swipe" :autoplay="4000" :duration="600" :touchable="false" :show-indicators="false">
          <van-swipe-item>
            <van-icon name="plus" />
          </van-swipe-item>
          <van-swipe-item class="whitespace-nowrap">新增</van-swipe-item>
        </van-swipe>
      </van-button>
    </van-floating-bubble>

    <!-- 分享面板 -->
    <van-action-sheet
      v-model:show="show"
      :actions="actions"
      cancel-text="取消"
      @select="onSelect"
      close-on-click-action
      close-on-popstate
      teleport="body"
    />
    <!-- 列表 -->
    <v-inset-list :shows="['search']" :list-fn="listMedia" :query-params="queryParams" ref="listRef">
      <template #default="{ row, index }">
        <v-card body-class="flex flex-between gap-2">
          <van-image width="100" height="100" fit="cover" :src="row.thumbnailUrl" />
          <section class="flex-1">
            <van-text-ellipsis class="v-list-title" :content="row.mediaTitle" rows="2" />
            <v-plain-tag class="mt-1" type="success">
              {{ row.resourceTypeName }}
            </v-plain-tag>
            <div class="flex gap-1 mt-1">
              <span class="v-author">
                <van-icon name="contact-o" />
                {{ row.author }}
              </span>
              <span class="v-date">
                <van-icon name="clock-o" />
                {{ $parse(row.shootingTime) }}
              </span>
            </div>
          </section>

          <section class="absolute right-2 bottom-2">
            <van-button class="px-4" round type="default" hairline size="mini" text="查 看" @click="handleDetail(row.id)" />
            <van-button
              class="px-4"
              text="提 交"
              round
              size="mini"
              type="success"
              @click="handleSubmit(row.id)"
              v-if="includes(['0', '4', '8'], row.mediaStatus)"
              v-auth="['multimedia:media:submit']"
            />
            <van-button
              class="px-4"
              text="修 改"
              round
              type="primary"
              size="mini"
              @click="handleEdit(row.id)"
              v-if="includes(['0', '3'], row.mediaStatus) || hasRole('admin')"
              v-auth="['multimedia:media:edit']"
            />
            <van-button
              class="px-4"
              text="删 除"
              round
              type="danger"
              size="mini"
              @click="handleDelete(row.id)"
              v-if="includes(['0', '3'], row.mediaStatus) || hasRole('admin')"
              v-auth="['multimedia:media:remove']"
            />
          </section>
        </v-card>
      </template>
    </v-inset-list>
  </main>
</template>

<style scoped>
  .button-swipe {
    height: 40px;
    line-height: 40px;
  }
</style>
