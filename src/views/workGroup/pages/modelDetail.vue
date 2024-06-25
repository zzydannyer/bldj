<script lang="ts" setup>
  import { useImage } from '@/utils/assets';

  const str = `<p>全国劳动模范、</p><p>全军英雄模范、</p><p>第四届全国道德模范提名奖、</p><p>全国学习雷锋志愿服务先进个人、</p><p>第二届全国五好文明家庭、</p><p>上海市劳动模范、</p><p>上海市第三届“感动上海”年度十大人物、</p><p>上海市杰出志愿者、</p><p>全国“四个100”最美志愿者、</p><p>上海市最美退役军人等荣誉称号</p>`;
</script>

<template>
  <section class="flex bg-white m-4 rounded-lg p-4">
    <van-image
      class="w-[130PX] h-[175PX] rounded overflow-hidden"
      fit="cover"
      :src="useImage('pic')"
    />
    <div class="pl-3 text-sm">
      <p class="font-medium text-sm">陶依嘉</p>
      <p>性别：女</p>
      <p>民族：汉</p>
      <p>出生日期：2001-11-12</p>
      <p>籍贯：上海</p>
    </div>
  </section>
  <van-cell-group class="card">
    <van-cell title="政治面貌" value="党员" />
    <van-cell title="参加政党时间" value="2023-10-12" />
    <van-cell title="学历" value="大学本科" />
    <van-cell title="学位" value="学士学位" />
    <van-cell title="所在单位" value="上海第一医药股份" />
    <van-cell title="参加工作时间" value="2002-12-20" />
    <van-cell title="所获最高荣誉称号" value="全国劳动模范" />
  </van-cell-group>
  <van-cell-group class="card">
    <van-cell title="所在单位" value="上海第一医药股份" />
    <van-cell title="职称" value="政工师" />
    <van-cell title="职务" value="退休干部" />
  </van-cell-group>
  <van-cell-group class="card">
    <van-cell title="荣誉">
      <template #label>
        <div v-html="str"></div>
      </template>
    </van-cell>
  </van-cell-group>
  <van-cell-group class="card">
    <van-cell title="简要事迹">
      <template #label>
        <div v-html="str"></div>
      </template>
    </van-cell>
  </van-cell-group>
  <van-cell-group class="card">
    <van-cell title="证书及成果">
      <template #label>
        <div v-html="str"></div>
      </template>
    </van-cell>
  </van-cell-group>
  <van-cell-group class="card">
    <van-cell title="证书及成果">
      <template #label>
        <div v-html="str"></div>
      </template>
    </van-cell>
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
