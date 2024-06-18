<script setup lang="ts">
  import { useImage, useIcon } from '@/utils/assets';
  import { register } from 'swiper/element/bundle';

  register();
  const router = useRouter();

  const spaceBetween = 10;
  const onProgress = (e: any) => {
    const [swiper, progress] = e.detail;
    console.log(progress);
  };

  const onSlideChange = (e: any) => {
    console.log('slide changed');
  };

  const gridItems = [
    {
      icon: 'index-icon-politics',
      text: '政治建设',
      path: '/politics'
    },
    {
      icon: 'index-icon-think',
      text: '思想建设',
      path: '/think'
    },
    {
      icon: 'index-icon-org',
      text: '组织建设',
      path: '/org'
    },
    {
      icon: 'index-icon-discipline',
      text: '纪律作风',
      path: '/discipline'
    },
    {
      icon: 'index-icon-workGroup',
      text: '工团建设',
      path: '/workGroup'
    },
    {
      icon: 'index-icon-culture',
      text: '文化建设',
      path: '/culture'
    }
  ];
</script>
<template>
  <section class="bg-white">
    <swiper-container
      :breakpoints="{
        768: {
          slidesPerView: 3
        }
      }"
      :centered-slides="true"
      :pagination="{
        hideOnClick: false
      }"
      :slides-per-view="1"
      :space-between="spaceBetween"
      @swiperprogress="onProgress"
      @swiperslidechange="onSlideChange"
    >
      <swiper-slide v-for="i in 10" :key="i" class="swiper-slide">
        <van-image class="w-full h-full" fit="cover" :src="useImage('test')" />
      </swiper-slide>
    </swiper-container>

    <van-grid class="grid-container" :column-num="3" direction="horizontal" :gutter="8">
      <van-grid-item v-for="(item, index) in gridItems" :key="index" :icon="useIcon(item.icon)" :text="item.text" :to="item.path" />
    </van-grid>

    <van-image class="m-[16PX]" fit="cover" :src="useImage('index-bg-yyk')" @click="router.push('/')" />

    <van-cell-group class="home-cell-group">
      <van-cell is-link title="通知公告" title-class="home-cell-title" value="全部" value-class="text-[#e20a0a]" />
      <van-cell label="描述信息" title="单元格" value="内容" />
    </van-cell-group>
  </section>
</template>
<style lang="scss" scoped>
  .swiper-slide {
    @apply w-full aspect-video bg-slate-200;
  }

  .grid-container {
    @apply mt-4 mx-[8PX];
    --van-grid-item-content-background: url('@/assets/images/index-grid-bg.png') no-repeat right bottom / 70% 40%,
      linear-gradient(to bottom, #fffbfa, #fffaf9);

    :deep(.van-grid-item__content) {
      border: 1px solid #ffecea;
      border-radius: 10px;
      overflow: hidden;
    }
  }

  .home-cell-group {
    --van-cell-background: transparent;
    --van-cell-group-background: url('@/assets/images/home-title-bg.png') no-repeat left top / cover;
    :deep(.van-icon-arrow.van-cell__right-icon) {
      color: #e20a0a;
    }
  }
  :deep(.home-cell-title) {
    @apply font-semibold;

    & > span {
      @apply relative;
      &::before {
        @apply block absolute -bottom-3 left-1/2 -translate-x-1/2;
        content: '';
        // prettier-ignore
        width: 20PX;
        // prettier-ignore
        height: 5PX;
        background: url('@/assets/icons/home-title-line.png') no-repeat;
      }
    }
  }
</style>
