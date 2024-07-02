<script setup lang="ts">
  import { useGlobal } from '@/utils';
  import { Icon } from '@iconify/vue';
  import Search from '@/views/politics/components/keynote/search.vue';
  const { $parse } = useGlobal<GlobalPropertiesApi>();

  const router = useRouter();
  const active = ref(0);
  const text =
    ' 关于贯彻落实2023年全面从严治党工作会议和全面从严治党警示教育会议精神';
</script>

<template>
  <div class="pb-40">
    <Search />
    <section class="card">
      <van-text-ellipsis :content="text" rows="2" class="text-sm" />
      <div class="text-xs mt-2">责任部室：党委办公室（巡察办）</div>
      <div class="text-xs mt-2">
        下达:<span class="color-blue">16</span> 反馈:<span class="color-purple"
          >16</span
        >
        完成:<span class="color-green">16</span> 部分:<span class="color-yellow"
          >16</span
        >
        未完成:<span class="color-red">16</span>
      </div>
      <div class="text-xs mt-2">状态：<span class="color-red">督查</span></div>
      <van-space class="text-xs mt-3 color-grey" :size="2">
        <Icon icon="ion:time-outline" />
        <span> 2024-01-26 - 2024-02-25</span>
      </van-space>
      <div class="flex justify-between">
        <van-button
          block
          class="button mt-4 w-[48%]"
          size="small"
          to="pages/detail"
          type="primary"
          text="详情"
          round
        />
        <van-button
          block
          class="button-zx mt-4 w-[48%]"
          size="small"
          to="pages/execute"
          type="primary"
          text="执行"
          round
        />
      </div>
    </section>
    <section class="card">
      <van-text-ellipsis
        :content="text"
        @click="router.push('/detail')"
        rows="2"
        class="text-sm"
      />
      <div class="text-xs mt-2">责任部室：党委办公室（巡察办）</div>
      <div class="text-xs mt-2">
        下达:<span class="color-blue">16</span> 反馈:<span class="color-purple"
          >16</span
        >
        完成:<span class="color-green">16</span> 部分:<span class="color-yellow"
          >16</span
        >
        未完成:<span class="color-red">16</span>
      </div>
      <div class="text-xs mt-2">状态：<span class="color-red">督查</span></div>
      <van-space class="text-xs mt-3 color-grey" :size="2">
        <Icon icon="ion:time-outline" />
        <span> 2024-01-26 - 2024-02-25</span>
      </van-space>
      <van-button
        block
        class="button mt-4 redbg"
        size="small"
        to="uploadMaterials"
        type="primary"
        text="详情"
        round
      />
    </section>
  </div>
</template>
<style lang="scss" scoped>
  .card {
    @apply bg-white rounded-md m-4 p-4 mt-2;
  }
  .color-blue {
    color: #008df2;
  }
  .color-purple {
    color: #b537e4;
  }
  .color-green {
    color: #07a233;
  }
  .color-yellow {
    color: #ee8c0f;
  }
  .color-red {
    color: #f12300;
  }
  .color-grey {
    color: #6c6c6c;
  }
  .button {
    @apply font-bold;
    --van-button-primary-background: #e22001;
    --van-button-primary-border-color: #e22001;
  }
  .button-zx {
    @apply font-bold;
    --van-button-primary-background: #fa9229;
    --van-button-primary-border-color: #fa9229;
  }
</style>
