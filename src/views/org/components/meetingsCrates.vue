<script setup lang="ts">
  import { useGlobal } from '@/utils';
  import { Icon } from '@iconify/vue';
  import All from '@/views/culture/social/helping.vue';
  import Group from '@/views/culture/social/helping.vue';
  const { $parse } = useGlobal<GlobalPropertiesApi>();
  defineOptions({
    name: 'MediaList'
  });
  const router = useRouter();
  const active = ref<string>('');
</script>
<template>
  <main class="mt-2 pb-[600PX] pt-2">
    <section class="px-[16PX]">
      <van-button
        block
        class="button"
        size="small"
        to="/org/detailMeeting"
        type="primary"
        text="新增"
        round
      />
    </section>

    <van-tabs
      v-model:active="active"
      type="card"
      swipe-threshold="3"
      :scrollspy="true"
    >
      <van-tab title="全部" name="all"></van-tab>
      <van-tab title="党小组" name="group"></van-tab>
      <van-tab title="党支部" name="branch"></van-tab>
      <van-tab title="支部党员" name="member"></van-tab>
      <van-tab title="党课" name="lecture"></van-tab>
    </van-tabs>
    <All v-if="active === 'all'" />
    <Group v-if="active === 'group'" />
  </main>
</template>

<style lang="scss" scoped>
  .button {
    @apply font-bold;
    --van-button-primary-background: #e22001;
    --van-button-primary-border-color: #e22001;
  }
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
