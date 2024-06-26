<script setup lang="ts">
  import { Icon } from '@iconify/vue';
  import AdvancedSearch from '@/views/culture/media/advancedSearch.vue';
  import useQueryParams from '@/hooks/queryParams';

  class Params {
    mediaTitleLike = '';
    authorLike = '';
    orgNameLike = '';
    resourceType = '';
  }
  const [queryParams, resetQueryParams] = useQueryParams<Params>(new Params());

  const router = useRouter();
  const list = [];
  const text = '沙家邦红色党建活动';
  import { ref } from 'vue';

  const show = ref(false);

  const showPopup = () => {
    show.value = true;
  };

  function onSearch() {
    console.log('onSearch');
  }
</script>
<template>
  <div class="pt-4 bg-white mt-4">
    <div class="px-2">
      <div class="mx-3.5">
        <van-button
          block
          class="button"
          size="small"
          to="uploadMaterials"
          type="primary"
          >上传素材</van-button
        >
      </div>

      <van-search
        v-model="queryParams.params.mediaTitleLike"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
      >
        <template #action>
          <div is-link @click="showPopup">
            <Icon icon="carbon:filter" /><span>高级搜索</span>
          </div>
        </template>
      </van-search>
    </div>
  </div>
  <van-pull-refresh>
    <div class="grid grid-2 gap-2 grid-cols-2 px-4 pb-64">
      <div
        v-for="i in 10"
        :key="i"
        class="sub-content"
        @click="router.push('/culture/videodetail')"
      >
        <van-image
          fit="cover"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
        <van-text-ellipsis :content="text" />
        <div class="text2">2023-07-12 10:22</div>
      </div>
    </div>
  </van-pull-refresh>

  <AdvancedSearch v-model:queryParams="queryParams" v-model:show="show" />
</template>

<style lang="scss" scoped>
  .button {
    @apply rounded-full font-bold;
    --van-button-primary-background: #e22001;
    --van-button-primary-border-color: #e22001;
  }
  .grid {
    @apply bg-white pt-3.5;
    .sub-content {
      @apply p-2 border-solid border-gray-200 rounded border mb-1 text-sm;
    }
    .text2 {
      @apply text-xs;
    }
  }
</style>
