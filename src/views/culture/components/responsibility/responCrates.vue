<script setup lang="ts">
  import { useGlobal } from '@/utils';
  import { Icon } from '@iconify/vue';
  import Help from '@/views/culture/components/responsibility/helping.vue';
  const { $parse } = useGlobal<GlobalPropertiesApi>();
  defineOptions({
    name: 'MediaList'
  });
  const router = useRouter();
  const active = ref(0);
</script>

<template>
  <van-tabs v-model:active="active" type="card">
    <van-tab title="党建帮扶" name="help"></van-tab>
    <van-tab title="消费扶贫" name="consumer"></van-tab>
    <van-tab title="社会公益" name="welfare"></van-tab>
  </van-tabs>
  <Help v-if="active === 'help'" />
  <Help v-if="active === 'consumer'" />
  <Help v-if="active === 'welfare'" />
</template>

<style lang="scss" scoped>
  //党建帮扶、消费扶贫、社会公益页面一样
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
