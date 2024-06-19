<script setup lang="ts">
  import { Icon } from '@iconify/vue';
  import { useIcon } from '@/utils/assets';

  const router = useRouter();
</script>
<template>
  <div class="my-bg">
    <van-image
      round
      fit="cover"
      width="4rem"
      height="4rem"
      :src="useIcon('avatar')"
    />
    <div class="right-text">
      <div class="text-tit">这是一个昵称</div>
      <div class="text-b">编辑资料<Icon icon="octicon:chevron-right-24" /></div>
    </div>
  </div>
  <van-grid
    class="-mt-10 mx-[16PX] rounded overflow-hidden"
    :column-num="3"
    :border="false"
  >
    <van-grid-item :icon="useIcon('icon14-1')" text="我的活跃度" url="active" />
    <van-grid-item :icon="useIcon('icon10')" text="我的素材" url="materials" />
    <van-grid-item :icon="useIcon('icon11')" text="工作提醒" to="reminder" />
  </van-grid>
  <van-cell-group class="mt-3 mx-[16PX] rounded overflow-hidden test">
    <van-cell
      title="我的组织"
      :icon="useIcon('icon12')"
      is-link
      url="organization"
    />
    <van-cell title="我的承诺" :icon="useIcon('icon13')" is-link to="promise" />
    <van-cell title="个人设置" :icon="useIcon('icon14')" is-link to="setting" />
  </van-cell-group>
</template>
<style lang="scss" scoped>
  .test {
    --van-cell-icon-size: 1.1rem;
    --van-cell-vertical-padding: 25px;
    --van-cell-right-icon-color: #ccc;
    :deep(.van-icon__image) {
      display: inline-block;
      vertical-align: middle;
    }
    :deep(.van-cell__right-icon) {
      font-size: 0.8rem;
    }
  }
  .my-bg {
    @apply h-[150PX] bg-no-repeat flex pt-12 pl-7;
    background-image: url('@/assets/images/bg.png');
    background-size: 100% 100%;
    .avatar-bg {
      @apply w-[55PX] h-[55PX] bg-white;
      .avatar {
        @apply w-[27PX] h-[27PX] text-red-600;
      }
    }
    .right-text {
      @apply h-[40PX] mt-2 ml-2;
    }
    .text-tit {
      @apply text-base text-white font-medium;
    }
    .text-b {
      @apply text-sm text-white;
    }
  }
</style>
