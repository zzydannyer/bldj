<template>
  <div class="px-4">
    <van-button block type="primary" class="button" size="small">上传素材</van-button>
  </div>
  <van-pull-refresh>
    <div class="grid gap-3 grid-cols-2 px-4 pb-60">
      <div v-for="i in 10" :key="i" class="sub-content">
        <van-image fit="cover" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
        <van-text-ellipsis :content="text" />
        <div class="text2">2023-07-12 10:22</div>
      </div>
    </div>
  </van-pull-refresh>
</template>

<script setup lang="ts">
  const list = [];

  const text = '沙家邦红色党建活动';
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
