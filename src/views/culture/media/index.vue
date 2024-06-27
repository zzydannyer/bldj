<script setup lang="ts">
  import AdvancedSearch from '@/views/culture/media/advanceSearch.vue';
  import useQueryParams from '@/hooks/queryParams';
  import MediaServer, { CultureMediaParams } from '@/api/culture/media';
  import { useStore } from '@/store';
  import { storeToRefs } from 'pinia';
  import { UserType } from '@/constants';
  import { useGlobal } from '@/utils';

  const { $useDict, $parse } = useGlobal<GlobalPropertiesApi>();
  // const product_type = $useDict([
  //   'product_type',
  //   'sys_yes_no',
  //   'sys_normal_disable',
  //   'acl_type'
  // ]);
  // setTimeout(() => {
  //   console.log(product_type);
  // }, 3000);
  const [queryParams, resetQueryParams] = useQueryParams<CultureMediaParams>(
    new CultureMediaParams()
  );

  const router = useRouter();

  const text = '沙家邦红色党建活动';
  const { userInfo } = useStore();
  const { userType } = storeToRefs(userInfo);

  const loading = ref(false);

  const checked = ref([]);
  const categoryOption = ref([]);

  const listRef = ref();
  function onSearch() {
    listRef.value.onRefresh();
  }
  async function getOptions() {
    const { data } = await MediaServer.GET_CATEGORY();

    switch (userType.value) {
      case UserType.Group:
        categoryOption.value = data[0].children;
        break;
      case UserType.Grassroots:
        categoryOption.value = data[1].children;
        break;
      default:
        categoryOption.value = [];
    }
  }

  onBeforeMount(getOptions);
</script>
<template>
  <main class="mt-2 pb-[600PX] pt-2 bg-white">
    <section class="px-[16PX]">
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
      @search="onSearch"
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

    <v-inset-list
      ref="listRef"
      v-model:loading="loading"
      :listFn="MediaServer.LIST_MEDIA_MAIN"
    >
      <template #list="{ list }">
        <div class="grid gap-2 grid-cols-2">
          <div
            v-for="item in list"
            :key="item.uid"
            class="sub-content"
            @click="router.push('/culture/mediaDetail')"
          >
            <van-image
              fit="cover"
              src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            />
            <van-text-ellipsis :content="text" />
            <div class="v-icon-text">2023-07-12 10:22</div>
          </div>
        </div>
      </template>
    </v-inset-list>
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
