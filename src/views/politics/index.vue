<script setup lang="ts">
  import FirstCrates from '@/views/politics/components/firstCrates.vue';
  import DiscussionCrates from '@/views/politics/components/discussionCrates.vue';
  import KeynoteCrates from '@/views/politics/components/keynoteCrates.vue';
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
    <van-tab name="first" title="第一议题制度"></van-tab>
    <van-tab name="discussion" title="党委议事决策"></van-tab>
    <van-tab name="keynote" title="重点工作督办"></van-tab>
  </van-tabs>
  <FirstCrates v-if="active === 'first'" />
  <DiscussionCrates v-if="active === 'discussion'" />
  <KeynoteCrates v-if="active === 'keynote'" />
</template>
<style lang="scss" scoped>
  .menu {
    --van-tabs-bottom-bar-color: #ef3d3b;
    --van-tab-active-text-color: #ef3d3b;
  }
</style>
