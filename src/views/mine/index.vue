<script setup lang="ts">
  import { Icon } from '@iconify/vue';
  import { useIcon } from '@/utils/assets';

  const router = useRouter();
</script>
<template>
  <main class="px-4">
    <div class="my-bg">
      <van-space>
        <van-image
          class="avatar"
          fit="cover"
          height="4rem"
          round
          :src="useIcon('avatar')"
          width="4rem"
        />
        <div class="right-text">
          <div class="text-tit">这是一个昵称</div>
          <van-space align="center" class="text-b" size="0">
            <span>编辑资料</span><Icon icon="octicon:chevron-right-24" />
          </van-space>
        </div>
      </van-space>
    </div>
    <van-grid
      :border="false"
      class="-mt-10 rounded overflow-hidden"
      :column-num="3"
    >
      <van-grid-item
        :icon="useIcon('icon14-1')"
        text="我的活跃度"
        url="active"
      />
      <van-grid-item
        :icon="useIcon('icon10')"
        text="我的素材"
        url="materials"
      />
      <van-grid-item :icon="useIcon('icon11')" text="工作提醒" to="reminder" />
    </van-grid>
    <van-cell-group class="mt-3 rounded overflow-hidden test">
      <van-cell
        :icon="useIcon('icon12')"
        is-link
        title="我的组织"
        url="organization"
      />
      <van-cell
        :icon="useIcon('icon13')"
        is-link
        title="我的承诺"
        to="promise"
      />
      <van-cell
        :icon="useIcon('icon14')"
        is-link
        title="个人设置"
        to="setting"
      />
    </van-cell-group>
  </main>
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
    @apply bg-no-repeat flex -mx-4 px-4 py-[20PX] items-center;
    // padding-top: env(safe-area-inset-top);
    // prettier-ignore
    height: calc(150PX + env(safe-area-inset-top));
    background-image: url('@/assets/images/bg.png');
    background-size: 100% 100%;

    .avatar {
      @apply ml-auto;
    }

    .right-text {
      @apply h-[40PX] mt-2 mr-auto;
    }
    .text-tit {
      @apply text-base text-white font-medium;
    }
    .text-b {
      @apply text-sm text-white;
    }
  }
</style>
