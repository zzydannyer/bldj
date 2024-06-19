<template>
  <!--  {{ route.path }}-->
  <RouterView />

  <section
    class="mask-layer"
    :style="{
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? 'auto' : 'none'
    }"
    @click.self="visible = false"
  />
  <BottomNav v-model:visible="visible" />
</template>

<script setup lang="ts">
  import BottomNav from './BottomNav.vue';
  const visible = ref(false);
  const route = useRoute();
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
    transition: all 0.3s;
  }
</style>
