<script setup lang="ts">
  import IntegrityCrates from '@/views/discipline/components/integrityCrates.vue';
  import ZeroCrates from '@/views/discipline/components/zeroCrates.vue';
  const active = ref('model');
</script>
<template>
  <van-tabs
    v-model:active="active"
    class="menu z-[3]"
    :offset-top="200"
    sticky
    @click-tab="handleClick"
  >
    <van-tab name="integrity" title="廉情动态"></van-tab>
    <van-tab name="zero" title="零基管理"></van-tab>
  </van-tabs>
  <IntegrityCrates v-if="active === 'integrity'" />
  <ZeroCrates v-if="active === 'zero'" />
</template>
<style lang="scss" scoped>
  .menu {
    --van-tabs-bottom-bar-color: #ef3d3b;
    --van-tab-active-text-color: #ef3d3b;
  }
</style>
