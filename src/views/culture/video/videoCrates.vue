<template>
  <div class="pt-4 bg-white mt-4">
    <div class="px-2">
      <div class="mx-3.5">
        <van-button
          type="primary"
          block
          class="button"
          size="small"
          to="uploadMaterials"
          >上传素材</van-button
        >
      </div>

      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #action>
          <div is-link @click="showPopup">
            <Icon icon="carbon:filter" /><span>高级搜索</span>
          </div>
          <van-popup
            v-model:show="show"
            position="right"
            :style="{ width: '90%', height: '100%' }"
          >
            <AdvancedCrates
          /></van-popup>
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
</template>

<script setup lang="ts">
  import { Icon } from '@iconify/vue';
  import AdvancedCrates from '@/views/culture/video/advancedSearch.vue';
  const list = [];
  const text = '沙家邦红色党建活动';
  import { ref } from 'vue';
  const show = ref(false);
  const router = useRouter();
  const showPopup = () => {
    show.value = true;
  };
</script>

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
