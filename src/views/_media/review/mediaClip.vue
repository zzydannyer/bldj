<script setup lang="ts">
  import VideoClip from '@/components/VideoClip/index.vue';
</script>
<template>
  <div class="detail-container">
    <video-clip :url="''" :images="[]" />
  </div>
</template>

<style scoped>
  .detail-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    background-color: black;
    padding: 0;
  }
</style>
