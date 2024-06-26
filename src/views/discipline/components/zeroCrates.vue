<script setup lang="ts">
  import { useGlobal } from '@/utils';
  import { Icon } from '@iconify/vue';
  import Eight from '@/views/discipline/components/zero/eight.vue';
  const { $parse } = useGlobal<GlobalPropertiesApi>();
  defineOptions({
    name: 'MediaList'
  });
  const router = useRouter();
  const active = ref<string>('');
</script>
<template>
  <van-tabs
    v-model:active="active"
    type="card"
    swipe-threshold="3"
    :scrollspy="true"
  >
    <van-tab title="落实中央八项规定精神" name="eight"></van-tab>
    <van-tab title="深化“四责协同" name="four"></van-tab>
    <van-tab title="廉政风险防控" name="government"></van-tab>
  </van-tabs>
  <Eight v-if="active === 'eight'" />
  <Four v-if="active === 'four'" />
  <Government v-if="active === 'government'" />
</template>

<style lang="scss" scoped>
  //青年思想引领、全面从严治团、青年岗位建功、服务青年成才、页面一样
  $baseColor: rgb(225, 1, 1);
  $borderColor: #e2e2e2;
  $textColor: #777;
  :deep(.van-tabs__wrap) {
    margin-top: 30px;
    border-radius: 10px;
    padding: 3px 0;
    overflow: hidden;
    .van-tabs__nav--card {
      border: 1px solid $borderColor;
    }

    .van-tab--card.van-tab--active {
      background-color: $baseColor;
    }

    .van-tab__text {
      color: $textColor;
    }
    .van-tab--card {
      border-color: $borderColor;
    }
    .van-tab--active .van-tab__text {
      color: white;
    }
  }
</style>
