<script setup lang="ts">
  import type { TabProps, TabsType, TabsProps, TabsInstance } from 'vant';
  import TabVideo from '@/views/culture/media/index.vue';
  import TabSocial from '@/views/culture/social/index.vue';

  const active = ref<TabProps['name']>('video');
  function handleClick({ name }: TabProps) {
    active.value = name;
  }
</script>
<template>
  <van-tabs
    v-model:active="active"
    class="menu"
    offset-top="45PX"
    sticky
    @click-tab="handleClick"
  >
    <van-tab name="video" title="影音库">
      <TabVideo />
    </van-tab>
    <van-tab name="social" title="社会责任">
      <TabSocial />
    </van-tab>
  </van-tabs>
</template>
<style lang="scss" scoped>
  .menu {
    --van-tabs-bottom-bar-color: #ef3d3b;
    --van-tab-active-text-color: #ef3d3b;
  }
</style>
