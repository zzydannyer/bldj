<template>
  <van-button
    class="v-plain-button"
    :class="border ? 'show-border' : ''"
    :type="type"
    :color="BgColor[type]"
    :size="size"
    :round="round"
    :text="text"
  >
    <slot />
  </van-button>
</template>

<script setup lang="ts">
  import { TextColor, BgColor, BorderColor } from '@/constants';
  import { ButtonSize } from 'vant';

  defineOptions({
    name: 'VPlainButton'
  });
  const {
    type,
    size,
    border = false,
    text
  } = defineProps({
    type: String as PropType<
      'success' | 'info' | 'danger' | 'warning' | 'primary' | 'default'
    >,
    size: String as PropType<ButtonSize>,
    border: Boolean as PropType<boolean>,
    round: Boolean as PropType<boolean>,
    text: String
  });
  const borderColor = computed(() => BorderColor[type]);
  const textColor = computed(() => TextColor[type]);
</script>

<style lang="scss" scoped>
  .v-plain-button {
    color: v-bind(textColor) !important;

    &.show-border {
      border: 1px solid v-bind(borderColor) !important;
    }
  }
</style>
