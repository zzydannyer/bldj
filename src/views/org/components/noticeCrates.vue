<script setup lang="ts">
  import { useGlobal } from '@/utils';
  import { Icon } from '@iconify/vue';
  import Party from '@/views/discipline/components/integrity/party.vue';
  import Supervision from '@/views/discipline/components/integrity/supervision.vue';
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
    <van-tab title="公示" name="party"></van-tab>
    <van-tab title="公告" name="supervision"></van-tab>
    <van-tab title="通知" name="supervision"></van-tab>
  </van-tabs>
  <Party v-if="active === 'party'" />
  <Supervision v-if="active === 'supervision'" />
</template>

<style lang="scss" scoped>
  $baseColor: rgb(225, 1, 1);
  $borderColor: #e2e2e2;
  $textColor: #777;
  :deep(.van-tabs__wrap) {
    margin-top: 20px;
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
