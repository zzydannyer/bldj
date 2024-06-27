<script setup lang="ts">
  import FrameCrates from '@/views/org/components/frameCrates.vue';
  import BuildingCrates from '@/views/org/components/buildingCrates.vue';
  import NoticeCrates from '@/views/org/components/noticeCrates.vue';
  import EnteringCrates from '@/views/org/components/enteringCrates.vue';
  import MeetingsCrates from '@/views/org/components/meetingsCrates.vue';
  import TransitionCrates from '@/views/org/components/transitionCrates.vue';
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
    <van-tab name="frame" title="组织架构"></van-tab>
    <van-tab name="building" title="党建实务"></van-tab>
    <van-tab name="notice" title="通知公告"></van-tab>
    <van-tab name="entering" title="党建入章"></van-tab>
    <van-tab name="meetings" title="三会一课"></van-tab>
    <van-tab name="transition" title="换届选举"></van-tab>
  </van-tabs>
  <FrameCrates v-if="active === 'frame'" />
  <BuildingCrates v-if="active === 'building'" />
  <NoticeCrates v-if="active === 'notice'" />
  <EnteringCrates v-if="active === 'entering'" />
  <MeetingsCrates v-if="active === 'meetings'" />
  <TransitionCrates v-if="active === 'transition'" />
</template>
<style lang="scss" scoped>
  .menu {
    --van-tabs-bottom-bar-color: #ef3d3b;
    --van-tab-active-text-color: #ef3d3b;
  }
</style>
