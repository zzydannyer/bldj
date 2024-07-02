<template>
  <van-space class="subtext" :size="2" fill>
    <Icon icon="ant-design:home-outlined" class="color-green" />
    <span> 填报单位：{{ name }}</span>
  </van-space>
  <van-space class="subtext" :size="2" fill>
    <Icon icon="ph:paper-plane-tilt-light" class="color-cyan" />
    <span> 学习方式：{{ time }}</span>
  </van-space>
  <van-space class="subtext" :size="2" fill>
    <Icon icon="iwwa:year" class="color-light-blue" />
    <span> 学习年月：{{ count }}</span>
  </van-space>
  <van-space class="subtext" :size="2" fill>
    <Icon icon="ion:time-outline" class="color-purple" />
    <span> 填报时间：{{ count }}</span>
  </van-space>
</template>

<script setup lang="ts">
  import { Icon } from '@iconify/vue';

  const props = withDefaults(
    defineProps<{
      name: string;
      time: string;
      count: number;
    }>(),
    {
      name: '23123',
      time: '2014-06-07',
      count: 11
    }
  );
</script>

<style lang="scss" scoped>
  .subtext {
    @apply text-xs my-1.5;
    color: #3f3f3f;
    vertical-align: middle;
  }
  .color-green {
    color: #5cc16f;
  }
  .color-cyan {
    color: #5cb6c1;
  }
  .color-light-blue {
    color: #87d7f3;
  }
  .color-purple {
    color: #83a8fd;
  }
</style>
