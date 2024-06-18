<script setup lang="ts">
  import { CSSProperties } from 'vue';
  defineOptions({
    name: 'VCard'
  });
  const { bodyClass, bodyStyle } = defineProps({
    bodyClass: [String, Array] as PropType<string | string[]>,
    bodyStyle: Object as PropType<CSSProperties>
  });
</script>
<template>
  <div class="v-card">
    <div class="v-card-title">
      <slot name="title"></slot>
    </div>
    <div class="v-card-body" :class="bodyClass" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  /* .v-card {
  overflow: hidden;
  padding: $body-padding;
  border-radius: $border-radius;
  background-color: $background-color;
  background-clip: padding-box;
  box-shadow: 0 4px 6px -1px #e0f2fe;
} */
  .v-card {
    @apply relative p-2 bg-white shadow-md shadow-sky-100 overflow-hidden rounded-md;
  }
</style>
<style></style>
