<script setup lang="ts">
  import { useGlobal } from '@/utils';
  const { $parse } = useGlobal<GlobalPropertiesApi>();

  defineOptions({
    name: 'MediaList'
  });

  const router = useRouter();
  const active = ref(0);
</script>

<template>
  <van-tabs v-model:active="active" type="card">
    <van-tab title="党建帮扶">内容 1</van-tab>
    <van-tab title="消费扶贫">内容 2</van-tab>
    <van-tab title="社会公益">内容 3</van-tab>
  </van-tabs>
</template>

<style lang="scss" scoped>
  $baseColor: red;
  :deep(.van-tabs__wrap) {
    .van-tabs__nav--card {
      border: 1px solid $baseColor;
    }

    .van-tab--card.van-tab--active {
      background-color: $baseColor;
    }

    .van-tab__text {
      color: $baseColor;
    }
    .van-tab--card {
      border-color: $baseColor;
    }
    .van-tab--active .van-tab__text {
      color: white;
    }
  }
</style>
