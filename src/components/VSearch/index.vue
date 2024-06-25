<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  defineOptions({
    name: 'VSearch'
  });

  const props = withDefaults(
    defineProps<{
      showPopIcon?: boolean;
      placeholder: string;
      showSearch?: boolean;
      showTabs?: boolean;
    }>(),
    {
      placeholder: '请输入搜索关键词',
      showPopIcon: true,
      showSearch: true,
      showTabs: false
    }
  );
  const emits = defineEmits(['handleSearch']);

  const showPopMenu = ref(false);

  const searchVal = defineModel('searchVal', { default: '' });
  const clear = () => {
    searchVal.value = '';
    emits('handleSearch');
  };

  defineSlots<{
    dropMenu: () => any;
    popMenu: () => any;
  }>();
</script>

<template>
  <van-sticky class="v-animation" style="height: 54px">
    <van-search
      v-if="showSearch"
      v-model="searchVal"
      :clearable="false"
      :placeholder="props.placeholder"
      shape="round"
      show-action
      @search="emits('handleSearch')"
    >
      <template #left>
        <van-icon
          v-if="showPopIcon"
          class="pr-2"
          name="filter-o"
          @click="showPopMenu = !showPopMenu"
        />
      </template>
      <template #right-icon>
        <van-icon v-show="searchVal" color="#ccc" name="clear" @click="clear" />
      </template>
      <template #action>
        <div @click="emits('handleSearch')">搜索</div>
      </template>
    </van-search>

    <slot name="dropMenu" />
  </van-sticky>

  <van-popup
    v-model:show="showPopMenu"
    position="top"
    round
    teleport="body"
    :z-index="1"
  >
    <slot name="popMenu" />
  </van-popup>
</template>

<style lang="scss" scoped>
  :deep() {
    .van-sticky {
      transition-property: all;
      transition-delay: 75ms;
      transition-duration: 200ms;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
  }
</style>
