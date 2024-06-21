<template>
  <TopNav />

  <RouterView />

  <BottomNav />
</template>

<script setup lang="ts">
  import TopNav from './components/TopNav.vue';
  import BottomNav from './components/BottomNav.vue';
</script>

<style lang="scss" scoped>
  // margin-top: env(safe-area-inset-top)
</style>
