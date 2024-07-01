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
  <main class="bg-white pt-2 pb-40">
    <van-grid :border="false" :column-num="3" :gutter="16">
      <van-grid-item class="topbg" style="--bgColor: #e5f4fd">
        <div class="w-full text-center" style="z-index: 1">
          <span class="text-2xl digital-blue">54</span> 家
        </div>
        <div class="w-full tit text-center text-sm" style="z-index: 1">
          完成换届单位
        </div>
        <div class="in-bg">
          <Icon icon="fluent:building-48-filled" />
        </div>
      </van-grid-item>
      <van-grid-item class="topbg" style="--bgColor: #fef1e9">
        <div class="w-full text-center" style="z-index: 1">
          <span class="text-2xl digital-yellow">27</span> 家
        </div>
        <div class="w-full tit text-center text-sm" style="z-index: 1">
          延期换届单位
        </div>
        <div class="in-bg">
          <Icon icon="fluent:building-48-filled" />
        </div>
      </van-grid-item>
      <van-grid-item class="topbg" style="--bgColor: #ffe8e9">
        <div class="w-full text-center" style="z-index: 1">
          <span class="text-2xl digital">27</span> 家
        </div>
        <div class="w-full tit text-center text-sm" style="z-index: 1">
          逾期换届单位
        </div>
        <div class="in-bg">
          <Icon icon="fluent:building-48-filled" />
        </div>
      </van-grid-item>
    </van-grid>
    <section class="mt-6">
      <div class="v-card">
        <div class="v-card-title">中共百联集团有限公司总部</div>
        <div class="v-card-body" :class="bodyClass" :style="bodyStyle">
          <van-space class="subtext" :size="2">
            <Icon icon="mingcute:government-line" class="color2" />
            <span> 二级党组织</span>
          </van-space>
          <van-space class="subtext ml-10" :size="2">
            <Icon icon="ion:time-outline" class="color1" />
            <span> 2022-11-20</span>
          </van-space>
        </div>
        <div
          class="overdue"
          style="position: absolute; --bgColor: #e4f3fe; --fColor: #0076f1"
        >
          正常
        </div>
      </div>
      <div class="v-card greybg">
        <div class="v-card-title">中共百联集团有限公司总部</div>
        <div class="v-card-body" :class="bodyClass" :style="bodyStyle">
          <van-space class="subtext" :size="2">
            <Icon icon="mingcute:government-line" class="color2" />
            <span> 二级党组织</span>
          </van-space>
          <van-space class="subtext ml-10" :size="2">
            <Icon icon="ion:time-outline" class="color1" />
            <span> 2022-11-20</span>
          </van-space>
        </div>
        <div
          class="overdue"
          style="position: absolute; --bgColor: #fff0e0; --fColor: #ffab17"
        >
          延期
        </div>
      </div>
      <div class="v-card">
        <div class="v-card-title">中共百联集团有限公司总部</div>
        <div class="v-card-body" :class="bodyClass" :style="bodyStyle">
          <van-space class="subtext" :size="2">
            <Icon icon="mingcute:government-line" class="color2" />
            <span> 二级党组织</span>
          </van-space>
          <van-space class="subtext ml-10" :size="2">
            <Icon icon="ion:time-outline" class="color1" />
            <span> 2022-11-20</span>
          </van-space>
        </div>
        <div class="overdue" style="position: absolute">逾期</div>
      </div>
      <div class="v-card greybg">
        <div class="v-card-title">中共百联集团有限公司总部</div>
        <div class="v-card-body" :class="bodyClass" :style="bodyStyle">
          <van-space class="subtext" :size="2">
            <Icon icon="mingcute:government-line" class="color2" />
            <span> 二级党组织</span>
          </van-space>
          <van-space class="subtext ml-10" :size="2">
            <Icon icon="ion:time-outline" class="color1" />
            <span> 2022-11-20</span>
          </van-space>
        </div>
        <div
          class="overdue"
          style="position: absolute; --bgColor: #fff0e0; --fColor: #ffab17"
        >
          延期
        </div>
      </div>
    </section>
  </main>
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
    .digital-yellow {
      color: #f87001;
    }
    .bottom {
      @apply mt-2 pt-2;
      border-top: solid 1px #ffbea6;
    }
    .in-bg {
      @apply absolute;
      right: -10px;
      z-index: 1;
      color: #fff;
      font-size: 35px;
    }
  }
  .v-card-title {
    @apply text-sm font-bold pb-1 pt-1;
    color: rgb(51, 51, 51);
  }
  .v-card {
    @apply relative p-2 px-2 bg-white border overflow-hidden ml-4 mr-4 relative mt-3;
  }
  .greybg {
    background-color: #fafafa;
  }
  .subtext {
    @apply text-xs my-1.5;
    color: #3f3f3f;
    vertical-align: middle;
  }
  .color {
    color: rgb(194, 179, 88);
  }
  .color1 {
    color: rgb(0, 110, 225);
  }
  .color2 {
    color: rgb(88, 194, 107);
  }
  .overdue {
    --bgColor: #ffe1e0;
    --fColor: #fe7442;
    @apply rounded w-[50PX] h-[24PX] absolute text-xs
      font-bold text-center leading-6;
    background-color: var(--bgColor);
    color: var(--fColor);
    right: 10px;
    top: 20px;
  }
</style>
