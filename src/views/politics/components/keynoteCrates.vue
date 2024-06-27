<script setup lang="ts">
  import { useGlobal } from '@/utils';
  import { Icon } from '@iconify/vue';
  import File from '@/views/politics/components/keynote/files.vue';
  import Key from '@/views/politics/components/keynote/key.vue';
  import Special from '@/views/politics/components/keynote/special.vue';
  import Tip from '@/views/politics/components/keynote/tip.vue';
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
    <van-tab title="会议文件" name="files"></van-tab>
    <van-tab title="重点工作" name="key"></van-tab>
    <van-tab title="专项工作" name="special"></van-tab>
    <van-tab title="工作提示" name="tip"></van-tab>
  </van-tabs>
  <File v-if="active === 'files'" />
  <Key v-if="active === 'key'" />
  <Special v-if="active === 'special'" />
  <Tip v-if="active === 'tip'" />
</template>

<style lang="scss" scoped>
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
