<script setup lang="ts">
  import StudyCrates from '@/views/think/components/studyCrates.vue';
  import StatisticsCrates from '@/views/think/components/statisticsCrates.vue';

  const active = ref('model');
</script>
<template>
  <van-tabs
    v-model:active="active"
    class="menu z-[1]"
    :offset-top="45"
    sticky
    @click-tab="handleClick"
  >
    <van-tab name="study" title="学习记录"><StudyCrates /></van-tab>
    <van-tab name="statistics" title="统计考核"><StatisticsCrates /></van-tab>
  </van-tabs>
</template>
<style lang="scss" scoped>
  .menu {
    --van-tabs-bottom-bar-color: #ef3d3b;
    --van-tab-active-text-color: #ef3d3b;
  }
</style>
