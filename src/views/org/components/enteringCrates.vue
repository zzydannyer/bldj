<script setup lang="ts">
  import { useGlobal } from '@/utils';
  import { Icon } from '@iconify/vue';
  import Business from '@/views/org/components/entering/business.vue';
  import Directorate from '@/views/org/components/entering/directorate.vue';
  const { $parse } = useGlobal<GlobalPropertiesApi>();
  defineOptions({
    name: 'MediaList'
  });
  const router = useRouter();
  const active = ref<string>('');
</script>
<template>
  <main class="mt-4 mb-4">
    <van-grid :border="false" :column-num="2" :gutter="20">
      <van-grid-item class="topbg" style="--bgColor: #e4f3fd">
        <div class="w-full text-center text-xs text-slate-500">
          <span class="text-2xl digital">54</span> 家
        </div>
        <div class="w-full tit text-center text-sm">完成工商备案</div>
        <div class="in-bg">
          <Icon icon="fluent:building-48-filled" />
        </div>
      </van-grid-item>
      <van-grid-item class="topbg" style="--bgColor: #fff1e9">
        <div class="w-full text-center text-xs text-slate-500">
          <span class="text-2xl digital-blue">27</span> 家
        </div>
        <div class="w-full tit text-center text-sm">通过董事会</div>
        <div class="in-bg">
          <Icon icon="fluent:building-48-filled" />
        </div>
      </van-grid-item>
    </van-grid>
    <van-tabs
      v-model:active="active"
      type="card"
      swipe-threshold="3"
      :scrollspy="true"
    >
      <van-tab title="完成工商备案" name="business"><Business /></van-tab>
      <van-tab title="通过董事会" name="directorate"><Directorate /></van-tab>
    </van-tabs>
  </main>
</template>
<style lang="scss" scoped>
  $baseColor: rgb(225, 1, 1);
  $borderColor: #e2e2e2;
  $textColor: #777;
  :deep(.van-tabs__wrap) {
    margin-top: 15px;
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
  .topbg {
    --bgColor: red;
    :deep(.van-grid-item__content) {
      @apply shadow-md relative overflow-hidden;
      border-radius: $border-radius;
      //border: solid 1px #fcc7c7;
      &::after {
        @apply absolute h-full aspect-square;
        content: '';
        border-radius: 50%;
        display: block;
        right: 0;
        top: 0;
        transform: translateX(65%);
        background-color: var(--bgColor);
        z-index: 0;
      }
    }

    .digital {
      color: #ca1c03;
    }
    .digital-blue {
      color: #0057db;
    }
    .bottom {
      @apply mt-2 pt-2;
      border-top: solid 1px #ffbea6;
    }
    .in-bg {
      @apply absolute;
      right: -10px;
      z-index: 1;
      color: rgba(255, 255, 255, 0.9);
      font-size: 36px;
    }
    .tit {
      @apply text-xs;
    }
  }
</style>
