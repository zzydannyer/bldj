<template>
  <main class="bottom-nav-container">
    <!-- 中间更多菜单按钮 -->
    <section class="nav-trigger" @click="visible = !visible">
      <div class="icon-border">
        <img class="icon-more" :src="useIcon('nav-more')" />
      </div>
    </section>
    <!-- 底部导航 -->
    <section class="bottom-nav">
      <van-grid clickable :column-num="2">
        <van-grid-item icon="photo-o" text="首页" />
        <van-grid-item icon="photo-o" text="我的" />
      </van-grid>
    </section>
    <!-- 更多菜单 -->
    <section
      class="nav-panel"
      :class="{
        visible: visible
      }"
    >
      <span class="nav-text" v-for="(item, index) in list" :key="item" @click="changeRoute(item, index)"> {{ item }}</span>
      <div
        class="nav-panel-active"
        :style="{
          transform: `translateX(-50%) rotate(${rotates[curIndex]}deg)`
        }"
      />
    </section>
  </main>
</template>

<script setup lang="ts">
  import { useIcon } from '@/utils/assets';
  const list = ['政治', '思想', '组织', '记录', '工团', '文化'];
  const rotates = ['-75', '-45', '-15', '15', '45', '75'];
  const visible = ref(false);
  const curItem = ref('');
  const curIndex = ref(0);

  function changeRoute(item: string, index: number) {
    curItem.value = item;
    curIndex.value = index;
    // visible.value = false;
  }

  function changeVisible(val: boolean) {
    visible.value = val;
  }
  defineExpose({
    changeVisible
  });
</script>

<style lang="scss" scoped>
  .bottom-nav-container {
    @apply fixed bottom-0 left-0 w-full;
    z-index: 10;
    .bottom-nav {
      @apply h-[90PX];
      z-index: 0;
      background-image: linear-gradient(to bottom, #fce9e7, #fff);
    }
    .nav-trigger {
      @apply w-[70PX] h-[70PX] bg-white rounded-full top-0 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2;
      z-index: 1;
      .icon-border {
        @apply absolute-center w-[90%] h-[90%] rounded-full;
        border: 1px solid #ebdfdd;
        background-image: linear-gradient(to bottom, #fff, #fef0ee);
        .icon-more {
          @apply absolute-center w-[50%] h-[50%];
        }
      }
    }
    .nav-panel {
      @apply w-0 h-0 rounded-full top-0 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 transition-all duration-300 ease-in-out overflow-hidden;
      z-index: -1;
      background-image: radial-gradient(circle, #ff4f22, #e10101);
    }
    .nav-panel.visible {
      @apply w-[240PX] h-[240PX];
    }
    .nav-panel-active {
      @apply absolute w-[27%] h-1/2 top-0 left-1/2 transition-all duration-300 ease-in-out;
      z-index: 0;
      transform-origin: bottom center;
      background: url('@/assets/images/nav-panel-active.png') no-repeat;
      background-size: 100% 100%;
    }
    .nav-text {
      @apply absolute text-white;
      z-index: 1;
      &:nth-child(1) {
        top: 36%;
        left: 6%;
      }
      &:nth-child(2) {
        top: 18%;
        left: 16%;
      }
      &:nth-child(3) {
        top: 6%;
        left: 33%;
      }
      &:nth-child(4) {
        top: 6%;
        right: 33%;
      }
      &:nth-child(5) {
        top: 18%;
        right: 16%;
      }
      &:nth-child(6) {
        top: 36%;
        right: 6%;
      }
    }
  }
</style>
