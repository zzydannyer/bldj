<template>
  <van-space class="subtext" :size="2">
    <Icon icon="mingcute:government-line" class="color2" />
    <span> {{ name }}</span>
  </van-space>
  <van-space class="subtext ml-10" :size="2">
    <Icon icon="ion:time-outline" class="color1" /> <span> {{ time }}</span>
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
  .color {
    color: rgb(194, 179, 88);
  }
  .color1 {
    color: rgb(0, 110, 225);
  }
  .color2 {
    color: rgb(88, 194, 107);
  }
</style>
