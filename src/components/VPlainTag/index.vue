<script setup lang="ts">
  import { TextColor, BgColor, BorderColor } from '@/constants';
  import { TagProps, TagSize } from 'vant';

  defineOptions({
    name: 'VPlainTag'
  });

  const {
    type,
    border = false,
    size = 'mini'
  } = defineProps({
    type: String as PropType<
      'success' | 'info' | 'danger' | 'warning' | 'primary' | 'default'
    >,
    border: Boolean as PropType<boolean>,
    size: String as PropType<TagSize>
    // mark: boolean;
    // show: boolean;
    // plain: boolean;
    // round: boolean;
    // closeable: boolean;
  });

  const borderColor = computed(() => BorderColor[type]);
</script>

<template>
  <van-tag
    :class="border ? 'v-plain-tag' : ''"
    :color="BgColor[type]"
    :size="size"
    :text-color="TextColor[type]"
  >
    <slot />
  </van-tag>
</template>

<style lang="scss" scoped>
  .v-plain-tag {
    border: 1px solid v-bind(borderColor);
  }
</style>
