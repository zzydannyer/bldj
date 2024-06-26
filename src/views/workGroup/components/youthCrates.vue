<script setup lang="ts">
  import { useGlobal } from '@/utils';
  import { Icon } from '@iconify/vue';
  import Help from '@/views/workGroup/components/youthachievements/think.vue';
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
    <van-tab title="青年思想引领" name="think"></van-tab>
    <van-tab title="全面从严治团" name="strict"></van-tab>
    <van-tab title="青年岗位建功" name="positions"></van-tab>
    <van-tab title="服务青年成才" name="service "></van-tab>
  </van-tabs>
  <Help v-if="active === 'think'" />
  <Help v-if="active === 'strict'" />
  <Help v-if="active === 'positions'" />
  <Help v-if="active === 'service'" />
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
