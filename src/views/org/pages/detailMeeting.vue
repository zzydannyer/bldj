<script lang="ts" setup>
  import { useImage } from '@/utils/assets';
  import { Icon } from '@iconify/vue';
  const str = `<p>全国劳动模范、</p><p>全军英雄模范、</p><p>第四届全国道德模范提名奖、</p><p>全国学习雷锋志愿服务先进个人、</p><p>第二届全国五好文明家庭、</p><p>上海市劳动模范、</p><p>上海市第三届“感动上海”年度十大人物、</p><p>上海市杰出志愿者、</p><p>全国“四个100”最美志愿者、</p><p>上海市最美退役军人等荣誉称号</p>`;
</script>
<template>
  <van-cell-group class="card">
    <van-cell title="2022年11月党小组会议">
      <template #label>
        <div class="mt-3">百联第一党支部</div>
      </template>
    </van-cell>
  </van-cell-group>
  <van-cell-group class="card">
    <van-cell title="主持人">
      <template #label>
        <div class="mt-3 flex">
          <div
            class="rounded-full w-[50PX] h-[50PX] text-center leading-[55PX] bg-slate-50 bg-sky-500/50"
          >
            <Icon icon="fa6-solid:user" class="text-white text-xl" />
          </div>
          <van-space direction="vertical" class="ml-2">
            <span class="font-medium">白小白</span
            ><span>党支部书记</span></van-space
          >
        </div>
      </template>
    </van-cell>
    <van-cell title="会议日期" value="2023-02-12" />
    <van-cell title="会议地点" value="2023-10-12" />
    <van-cell title="记录人" value="王萌" />
    <van-cell title="参会人" value="50" />
    <van-cell title="未参会人" value="5" />
    <van-cell title="会议类型" value="党小组会议" />
    <van-cell title="开展方式" value="" />
  </van-cell-group>
  <van-cell-group class="card">
    <van-cell title="会议记录">
      <template #label>
        <van-image
          class="rounded overflow-hidden mt-3"
          fit="cover"
          :src="useImage('test')"
        />
      </template>
    </van-cell>
  </van-cell-group>
  <van-cell-group class="card">
    <van-cell title="发布人" value="王小容" />
    <van-cell title="发布时间" value="2024-12-02  12:02:01" />
  </van-cell-group>
</template>
<style lang="scss" scoped>
  .card {
    @apply m-4 rounded-lg overflow-hidden;
    --van-cell-label-color: #222;
    --van-cell-label-font-size: 0.875rem;
    :deep(.van-cell__label) {
      border-top: solid 1px #f5f6f7;
    }
  }
</style>
