<script lang="ts" setup>
  import { useImage } from '@/utils/assets';

  const str = `<p>全国劳动模范、</p><p>全军英雄模范、</p><p>第四届全国道德模范提名奖、</p><p>全国学习雷锋志愿服务先进个人、</p><p>第二届全国五好文明家庭、</p><p>上海市劳动模范、</p><p>上海市第三届“感动上海”年度十大人物、</p><p>上海市杰出志愿者、</p><p>全国“四个100”最美志愿者、</p><p>上海市最美退役军人等荣誉称号</p>`;
</script>

<template>
  <van-cell-group class="card">
    <van-cell title="项目名称">
      <template #label>
        <div class="mt-3">更新消防设施，维护职工生命安全</div>
      </template>
    </van-cell>
  </van-cell-group>
  <van-cell-group class="card">
    <van-cell title="申报日期" value="2022-11-12  24:11" />
    <van-cell title="申报单位">
      <template #label>
        <div class="mt-3">上海商业储运有限公司工会委员会</div>
      </template>
    </van-cell>
  </van-cell-group>
  <van-cell-group class="card">
    <van-cell title="内容">
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
