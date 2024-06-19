<script setup lang="ts">
  import type { TabProps, TabsType, TabsProps, TabsInstance } from 'vant';
  import VideoCrates from '@/views/culture/components/videoCrates.vue';
  const active = ref('video');
  function handleClick({ name }: TabsProps) {
    active.value = name;
  }
</script>
<template>
  <van-sticky :offset-top="0">
    <van-tabs v-model:active="active" class="menu" @click-tab="handleClick">
      <van-tab name="video" title="影音库"></van-tab>
      <van-tab name="social" title="社会责任">内容 2</van-tab>
    </van-tabs>
  </van-sticky>

  <VideoCrates v-if="active === 'video'" />
</template>
<style lang="scss" scoped>
  .menu {
    --van-tabs-bottom-bar-color: #ef3d3b;
    --van-tab-active-text-color: #ef3d3b;
  }
</style>
