<script setup lang="ts">
  import { text_color, bg_color, border_color } from '@/constants';
  import { TagProps, TagSize } from 'vant';

  defineOptions({
    name: 'VPlainTag'
  });

  const {
    type,
    border = false,
    size = 'mini'
  } = defineProps({
    type: String as PropType<'success' | 'info' | 'danger' | 'warning' | 'primary' | 'default'>,
    border: Boolean as PropType<boolean>,
    size: String as PropType<TagSize>
    // mark: boolean;
    // show: boolean;
    // plain: boolean;
    // round: boolean;
    // closeable: boolean;
  });

  const borderColor = computed(() => border_color[type]);
</script>

<template>
  <van-tag :class="border ? 'v-plain-tag' : ''" :text-color="text_color[type]" :color="bg_color[type]" :size="size">
    <slot />
  </van-tag>
</template>

<style lang="scss" scoped>
  .v-plain-tag {
    border: 1px solid v-bind(borderColor);
  }
</style>
