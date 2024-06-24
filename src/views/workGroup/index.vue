<script setup lang="ts">
  import ModelCrates from '@/views/workGroup/components/modelCrates.vue';
  import CareCrates from '@/views/workGroup/components/CareCrates.vue';
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
  <CarelCrates v-if="active === 'model'" />
</template>
<style scoped></style>
