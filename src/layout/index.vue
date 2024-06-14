<template>
  <section class="mask-layer" @click="closeNavPanel"><RouterView /></section>
  <BottomNav ref="BottomNavRef" />
</template>

<script setup lang="ts">
  import BottomNav from './BottomNav.vue';

  const BottomNavRef = ref<typeof BottomNav | null>(null);

  function closeNavPanel() {
    BottomNavRef.value?.changeVisible(false);
  }
</script>

<style lang="scss" scoped>
  .mask-layer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9;
  }
</style>
