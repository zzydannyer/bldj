<script setup lang="ts">
  import AdvancedSearch from '@/views/culture/media/advanceSearch.vue';
  import MediaServer, {
    CultureMediaParams,
    MediaMain
  } from '@/api/culture/media';
  import { useStore } from '@/store';
  import { storeToRefs } from 'pinia';
  import { useGlobal } from '@/utils';
  import Hooks from '@/hooks';

  const { $useDict, $parse } = useGlobal<GlobalPropertiesApi>();
  const router = useRouter();
  const { userInfo } = useStore();
  const { userType } = storeToRefs(userInfo);

  const [categoryOption, getOptions] = Hooks.useCategory(userType.value);
  const [queryParams, resetQueryParams] =
    Hooks.useQueryParams<CultureMediaParams>(new CultureMediaParams());
  const { list, loading, refreshing, finished, onLoad, onRefresh } =
    Hooks.useList<CultureMediaParams, MediaMain>(
      queryParams,
      MediaServer.LIST_MEDIA_MAIN
    );

  const listRef = ref(null);

  const checked = ref([]);

  onBeforeMount(getOptions);
</script>
<template>
  <main class="mt-2 pt-2 bg-white">
    {{ checked }}
    <section class="px-4">
      <van-button
        block
        class="button"
        size="small"
        to="uploadMaterials"
        type="primary"
        text="上传素材"
        round
      />
    </section>
    <AdvancedSearch
      v-model="queryParams.params.mediaTitleLike"
      @search="onRefresh"
      @reset="resetQueryParams"
    >
      <!-- 媒体标题 -->
      <van-field
        v-model="queryParams.params.mediaTitleLike"
        input-align="left"
        label="媒体标题"
        label-align="top"
        placeholder="搜索媒体标题"
      />
      <!-- 作者 -->
      <van-field
        v-model="queryParams.params.authorLike"
        input-align="left"
        label="作者"
        label-align="top"
        placeholder="搜索作者"
      />
      <!-- 公司 -->
      <van-field
        v-model="queryParams.params.orgNameLike"
        input-align="left"
        label="公司"
        label-align="top"
        placeholder="搜索公司"
      />
      <!-- 素材类别 -->
      <v-picker
        label="素材类别"
        label-align="top"
        input-align="left"
        placeholder="搜索素材类别"
        v-model="queryParams.params.resourceType"
        :columns="categoryOption"
        :columns-field-names="{
          text: 'label',
          value: 'id'
        }"
      />

      <van-checkbox-group
        class="text-sm ml-4 my-4"
        v-model="checked"
        icon-size="16"
        direction="horizontal"
      >
        <van-checkbox name="isExce">优秀资源</van-checkbox>
        <van-checkbox name="isRecom">推荐资源</van-checkbox>
      </van-checkbox-group>
    </AdvancedSearch>

    <van-pull-refresh ref="listRef" v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        error-text="请求失败，请稍后重试"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <section class="grid gap-2 grid-cols-2 px-4">
          <div
            class="sub-content"
            v-for="row in list"
            :key="row.uid"
            @click="router.push('/culture/mediaDetail/' + row.uid)"
          >
            <VImage :src="row.fileList?.[0]?.url" />
            <van-text-ellipsis :content="row.mediaTitle" />
            <div class="v-icon-text">{{ $parse(row.submitTime) }}</div>
          </div>
        </section>
      </van-list>
    </van-pull-refresh>
    <van-back-top teleport="body" z-index="9" />
  </main>
</template>

<style lang="scss" scoped>
  .button {
    @apply font-bold;
    --van-button-primary-background: #e22001;
    --van-button-primary-border-color: #e22001;
  }

  .sub-content {
    @apply p-2 border-solid border-gray-200 rounded border mb-1 text-sm;
  }
</style>
