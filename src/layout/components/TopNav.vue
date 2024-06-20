<script setup lang="ts"></script>
<template>
  <main class="top-nav">
    <span>首页</span>
  </main>
</template>

<style lang="scss" scoped>
  .top-nav {
    @apply w-full h-[45PX] fixed left-0 text-center text-white font-semibold;
    z-index: 2;
    // prettier-ignore
    line-height: 45PX;
    background: url('@/assets/images/topnav-bg.png') no-repeat;
    background-size: cover;
    background-position: left bottom;
    // top: constant(safe-area-inset-top);
    top: env(safe-area-inset-top);
  }
</style>
