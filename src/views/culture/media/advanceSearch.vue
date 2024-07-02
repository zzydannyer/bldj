<script setup lang="ts">
  const show = ref(false);

  const searchInput = defineModel();

  const emit = defineEmits(['search', 'reset']);

  function handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      emit('search');
    }
  }

  function onListener() {
    document.addEventListener('keyup', handleKeyUp);
  }
  function offListener() {
    document.removeEventListener('keyup', handleKeyUp);
  }



  onBeforeMount(onListener);
  onBeforeUnmount(offListener);

  defineSlots<{
    default: () => any;
  }>();

  defineExpose({
    close: () => {
      show.value = false;
    }
  });
</script>
<template>
  <form action="/">
    <van-search
      v-model="searchInput"
      placeholder="请输入搜索关键词"
      show-action
      @clear="emit('search')"
    >
      <template #action>
        <van-icon class="mr-2 text-lg" name="filter-o" @click="show = true" />
      </template>
    </van-search>
  </form>

  <van-popup
    v-model:show="show"
    position="right"
    :style="{ width: '90%', height: '100%' }"
  >
    <van-cell-group class="van-safe-area-top" inset>
      <slot />
      <div class="flex gap-2 p-2">
        <van-button
          size="small"
          block
          class="grey-button"
          to="index"
          type="default"
          text="重置"
          @click="emit('reset')"
        />
        <van-button
          size="small"
          block
          class="button"
          to="index"
          type="primary"
          text="搜索"
          @click="emit('search')"
        />
      </div>
    </van-cell-group>
  </van-popup>
</template>

<style lang="scss" scoped>
  .button {
    @apply font-bold;
    --van-button-primary-background: #e22001;
    --van-button-primary-border-color: #e22001;
  }
  .grey-button {
    --van-button-default-background: #e8e8e8;
    --van-button-default-border-color: #e8e8e8;
  }
  .grid {
    @apply bg-white pt-3.5;
    .sub-content {
      @apply p-2 border-solid border-gray-200 rounded border mb-1 text-sm;
    }
    .text2 {
      @apply text-xs;
    }
  }
</style>
