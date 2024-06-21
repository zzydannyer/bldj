<script setup lang="ts">
  import type { TabProps, TabsType, TabsProps, TabsInstance } from 'vant';
  import VideoCrates from '@/views/culture/components/videoCrates.vue';
  import ResponCrates from '@/views/culture/components/responsiBility.vue';

  const active = ref<TabProps['name']>('video');
  const ac = ref(0);
  function handleClick({ name }: TabProps) {
    active.value = name;
  }
</script>
<template>
  <!-- <div id="view-container"> -->

  <van-tabs
    v-model:active="active"
    class="menu z-[3]"
    :offset-top="200"
    sticky
    @click-tab="handleClick"
  >
    <van-tab name="video" title="影音库"></van-tab>
    <van-tab name="social" title="社会责任"></van-tab>
  </van-tabs>

  <VideoCrates v-if="active === 'video'" />
  <ResponCrates v-if="active === 'social'" />
  <!-- </div> -->
</template>
<style lang="scss" scoped>
  .menu {
    --van-tabs-bottom-bar-color: #ef3d3b;
    --van-tab-active-text-color: #ef3d3b;
  }
</style>
