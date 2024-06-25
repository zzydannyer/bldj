<script setup lang="ts">
  import ModelCrates from '@/views/workGroup/components/modelCrates.vue';
  import CareCrates from '@/views/workGroup/components/careCrates.vue';
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
    <van-tab name="model" title="劳模先进"></van-tab>
    <van-tab name="care" title="员工关爱"></van-tab>
    <van-tab name="youth" title="青春建工"></van-tab>
  </van-tabs>
  <ModelCrates v-if="active === 'model'" />
  <CareCrates v-if="active === 'care'" />
</template>
<style lang="scss" scoped>
  .menu {
    --van-tabs-bottom-bar-color: #ef3d3b;
    --van-tab-active-text-color: #ef3d3b;
  }
</style>
