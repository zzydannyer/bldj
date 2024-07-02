<script setup lang="ts">
  import ModelCrates from '@/views/workGroup/components/modelCrates.vue';
  import CareCrates from '@/views/workGroup/components/careCrates.vue';
  import YouthCrates from '@/views/workGroup/components/youthCrates.vue';
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
    <van-tab name="model" title="劳模先进"><ModelCrates /></van-tab>
    <van-tab name="care" title="员工关爱"><CareCrates /></van-tab>
    <van-tab name="youth" title="青春建工"><YouthCrates /> </van-tab>
  </van-tabs>
</template>
<style lang="scss" scoped>
  .menu {
    --van-tabs-bottom-bar-color: #ef3d3b;
    --van-tab-active-text-color: #ef3d3b;
  }
</style>
