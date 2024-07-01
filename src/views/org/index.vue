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
    class="menu"
    :offset-top="45"
    sticky
    @click-tab="handleClick"
  >
    <van-tab name="frame" title="组织架构"><FrameCrates /></van-tab>
    <van-tab name="building" title="党建实务"><BuildingCrates /></van-tab>
    <van-tab name="notice" title="通知公告"><NoticeCrates /></van-tab>
    <van-tab name="entering" title="党建入章"><EnteringCrates /></van-tab>
    <van-tab name="meetings" title="三会一课"><MeetingsCrates /></van-tab>
    <van-tab name="transition" title="换届选举"><TransitionCrates /></van-tab>
  </van-tabs>
</template>
<style lang="scss" scoped>
  .menu {
    --van-tabs-bottom-bar-color: #ef3d3b;
    --van-tab-active-text-color: #ef3d3b;
  }
</style>
