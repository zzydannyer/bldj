<script setup lang="ts">
  import { homeContentList } from '@/api/home';
  import type { HomeHeadNews, HomeNews, HomeNotice } from '@/types/home';
  import { useImage, useIcon } from '@/utils/assets';
  import { register } from 'swiper/element/bundle';
  import { useStore } from '@/store';
  import { storeToRefs } from 'pinia';
  import { UserType } from '@/constants';
  // Swiper
  register();
  const router = useRouter();
  const { userInfo } = useStore();
  const { userType } = storeToRefs(userInfo);

  // 轮播
  const spaceBetween = 10;
  const onProgress = (e: any) => {
    const [swiper, progress] = e.detail;
    // console.log(progress);
  };

  const onSlideChange = (e: any) => {
    // console.log('slide changed');
  };
  const swiperList = ref<HomeHeadNews[]>([]);
  // 导航
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

  //通知公告
  const homeNotice = ref<HomeNotice[]>([]);
  const noticeCards = ref([
    {
      color: '#e10101',
      bgColor: '#fffcfc,#fff6f6',
      bg: useImage('home-card1')
    },
    {
      color: '#fbb700',
      bgColor: '#fffdf6,#fcf9eb',
      bg: useImage('home-card2')
    },
    {
      color: '#1bbaff',
      bgColor: '#f5fcfe,#e7f4fb',
      bg: useImage('home-card3')
    }
  ]);

  //最新新闻
  const homeNews = ref<HomeNews[]>([]);
  async function getData() {
    try {
      const {
        data: { home_head_news, home_notice, home_jt_news, home_jc_news }
      } = await homeContentList();
      // 轮播数据
      swiperList.value = home_head_news;
      // 通知公告
      homeNotice.value = home_notice.slice(0, 3);
      // 最新新闻
      switch (userType.value) {
        case UserType.Group:
          homeNews.value = home_jt_news.slice(0, 8);
          break;
        case UserType.Grassroots:
          homeNews.value = home_jc_news.slice(0, 8);
          break;
        default:
          break;
      }
    } catch (e) {
      console.error(e);
    }
  }

  onBeforeMount(getData);
</script>
<template>
  <main class="pb-[440PX] bg-white">
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
      <swiper-slide
        v-for="pic in swiperList"
        :key="pic.uid"
        class="swiper-slide"
      >
        <van-image v-src="pic.picUrl" class="w-full h-full" fit="cover" />
      </swiper-slide>
    </swiper-container>

    <van-grid
      class="grid-container"
      :column-num="3"
      direction="horizontal"
      :gutter="8"
    >
      <van-grid-item
        v-for="(item, index) in gridItems"
        :key="index"
        :icon="useIcon(item.icon)"
        :text="item.text"
        :to="item.path"
      />
    </van-grid>

    <van-image
      class="m-[16PX]"
      fit="cover"
      :src="useImage('index-bg-yyk')"
      @click="router.push('/')"
    />

    <van-cell-group class="home-cell-group">
      <van-cell
        is-link
        title="通知公告"
        title-class="home-cell-title"
        value="全部"
        value-class="text-[#e20a0a]"
      />
      <section class="mt-2 pl-[16PX] whitespace-nowrap overflow-x-auto">
        <div
          v-for="(notice, index) in homeNotice"
          :key="notice.uid"
          class="notice-card"
          :style="{
            background: `linear-gradient(to bottom, ${noticeCards[index].bgColor})`
          }"
        >
          <van-text-ellipsis :content="notice.title" rows="2" />
          <span class="v-date">
            <van-icon name="clock-o" />
            {{ notice.releaseDate }}
          </span>
          <van-image
            class="w-[80PX] absolute right-1 bottom-1"
            fit="cover"
            :src="noticeCards[index].bg"
          />
          <van-button
            class="mt-auto w-[80PX] rounded-md"
            :color="noticeCards[index].color"
            size="small"
            text="查看详情"
            type="primary"
          />
        </div>
      </section>
    </van-cell-group>

    <van-cell-group class="home-cell-group mt-4">
      <van-cell
        is-link
        title="最新新闻"
        title-class="home-cell-title"
        value="全部"
        value-class="text-[#e20a0a]"
      />
      <VCard v-for="news in homeNews" :key="news.uid" class=""> 66 </VCard>
    </van-cell-group>
  </main>
</template>
<style lang="scss" scoped>
  .swiper-slide {
    @apply w-full aspect-video bg-slate-200;
  }

  .grid-container {
    @apply mt-4 mx-[8PX];
    --van-grid-item-content-background: url('@/assets/images/index-grid-bg.png')
        no-repeat right bottom / 70% 40%,
      linear-gradient(to bottom, #fffbfa, #fffaf9);

    :deep(.van-grid-item__content) {
      border: 1px solid #ffecea;
      border-radius: 10px;
      overflow: hidden;
    }
  }

  .home-cell-group {
    --van-cell-background: transparent;
    --van-cell-group-background: url('@/assets/images/home-title-bg.png')
      no-repeat left top / contain;
    :deep(.van-icon-arrow.van-cell__right-icon) {
      color: #e20a0a;
    }
  }
  .notice-card {
    @apply inline-flex p-4 w-[250PX] h-[120PX] align-top relative flex-col;
    border-radius: 10px;
    // prettier-ignore
    margin-right: 16PX;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
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
