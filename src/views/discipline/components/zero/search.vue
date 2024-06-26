<template>
  <div class="m-4">
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      shape="round"
      @search="onSearch"
      class="mx-auto rounded-md"
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
</template>

<script setup lang="ts">
  import { Icon } from '@iconify/vue';
  import AdvancedCrates from '@/views/discipline/components/integrity/advancedSearch.vue';
  const list = [];
  const text = '沙家邦红色党建活动';
  import { ref } from 'vue';

  const show = ref(false);
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
