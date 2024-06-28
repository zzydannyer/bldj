<template>
  <TopNav />
  <router-view v-slot="{ Component, route }">
    <transition name="fade-slide" appear>
      <keep-alive>
        <component :is="Component" :key="route.name" />
      </keep-alive>
    </transition>
  </router-view>
  <BottomNav />
</template>

<script setup lang="ts">
  import TopNav from './components/TopNav.vue';
  import BottomNav from './components/BottomNav.vue';
</script>

<style lang="scss" scoped>
  // margin-top: env(safe-area-inset-top)
</style>
