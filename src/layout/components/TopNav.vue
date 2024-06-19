<script setup lang="ts"></script>
<template>
  <main class="top-nav"></main>
</template>

<style lang="scss" scoped>
  .top-nav {
    @apply w-full h-[60PX] fixed left-0;
    z-index: 2;
    background: url('@/assets/images/topnav-bg.png') no-repeat;
    background-size: cover;
    background-position: left bottom;
    // top: constant(safe-area-inset-top);
    top: env(safe-area-inset-top);
  }
</style>
