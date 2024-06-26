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
        v-model="form.searchValue"
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

  <AdvancedCrates v-model:show="show" />
</template>

<script setup lang="ts">
  import { Icon } from '@iconify/vue';
  import AdvancedCrates from '@/views/culture/components/video/advancedSearch.vue';

  const origin: Record<string, any> = {
    searchValue: ''
  };
  const form = reactive(origin);

  function resetForm() {
    for (const key in origin) {
      form[key] = origin[key];
    }
  }

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
