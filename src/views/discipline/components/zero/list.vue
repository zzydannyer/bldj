<template>
  <van-space class="subtext" :size="2" fill>
    <Icon icon="solar:user-linear" class="color" /> <span> {{ name }}</span>
  </van-space>
  <van-space class="subtext" :size="2" fill>
    <Icon icon="ion:time-outline" class="color1" /> <span> {{ time }}</span>
  </van-space>
  <van-space class="subtext" :size="2" fill>
    <Icon icon="tabler:eye-discount" class="color2" /> <span> {{ count }}</span>
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
