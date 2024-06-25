<script lang="ts" setup>
  import { useImage } from '@/utils/assets';

  const str = `<p>全国劳动模范、</p><p>全军英雄模范、</p><p>第四届全国道德模范提名奖、</p><p>全国学习雷锋志愿服务先进个人、</p><p>第二届全国五好文明家庭、</p><p>上海市劳动模范、</p><p>上海市第三届“感动上海”年度十大人物、</p><p>上海市杰出志愿者、</p><p>全国“四个100”最美志愿者、</p><p>上海市最美退役军人等荣誉称号</p>`;
</script>

<template>
  <section class="flex bg-white m-4 rounded-lg p-4">
    <van-image
      class="w-[80PX] h-[80PX] rounded overflow-hidden"
      fit="cover"
      :src="useImage('pic')"
    />
    <div class="pl-3 text-sm">
      <p class="font-medium text-sm">上海第一八佰劳模创新工作室</p>
      <p class="blue-bg">上海第一八百有限公司</p>
    </div>
  </section>
  <van-cell-group class="card">
    <van-cell title="工作室地址">
      <template #label>
        <div class="mt-3">福建省莆田市涵江区赤港开发区82号72栋218室</div>
      </template>
    </van-cell>
  </van-cell-group>
  <van-cell-group class="card">
    <van-cell title="创建日期" value="2022-11-12  24:11" />
    <van-cell title="工作室电话" value="021-58360000" />
    <van-cell title="领衔人姓名" value="郭强" />
    <van-cell title="性别" value="男" />
    <van-cell title="专务专长" value="媒体影音领域" />
  </van-cell-group>
  <van-cell-group class="card">
    <van-cell title="荣誉">
      <template #label>
        <div v-html="str"></div>
      </template>
    </van-cell>
  </van-cell-group>
  <van-cell-group class="card">
    <van-cell title="集体荣誉">
      <template #label>
        <div v-html="str"></div>
      </template>
    </van-cell>
  </van-cell-group>
  <van-cell-group class="card">
    <van-cell title="工作室简介">
      <template #label>
        <div v-html="str"></div>
      </template>
    </van-cell>
  </van-cell-group>
  <van-cell-group class="card">
    <van-cell title="基本成员情况">
      <template #label>
        <div v-html="str"></div>
      </template>
    </van-cell>
  </van-cell-group>
  <van-cell-group class="card">
    <van-cell title="工作室基本情况">
      <template #label>
        <div v-html="str"></div>
      </template>
    </van-cell>
  </van-cell-group>
  <van-cell-group class="card">
    <van-cell title="主要研究内容及成果">
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
  .blue-bg {
    @apply text-xs mt-0;
    color: rgb(0, 110, 225);
    background-color: #e6f7ff;
    border: solid 1px #91d6ff;
    border-radius: 6px;
    padding: 3px 5px;
    display: inline-block;
  }
</style>
