<script setup lang="ts">
  import { useImage, useIcon } from '@/utils/assets';
  import { register } from 'swiper/element/bundle';
  // import { useStore } from '@/store';
  // import { storeToRefs } from 'pinia';
  // import { UserType } from '@/constants';
  import dayjs from 'dayjs';
  import { DictData } from '@/plugins/dict';
  import useHomeData from '@/hooks/api/home';
  // Swiper
  register();
  const router = useRouter();
  // const { userInfo } = useStore();
  // const { userType } = storeToRefs(userInfo);

  // 轮播
  const spaceBetween = 10;

  const [homeData, fetchData] = useHomeData();

  const { swiperList, homeNotice, homeNews } = toRefs(homeData);
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
  const noticeCards = [
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
  ];

  //最新新闻
  const dictData: DictData[] = [
    { label: '集团要闻', value: '1' },
    { label: '基层动态', value: '2' }
  ];

  onBeforeMount(fetchData);
</script>
<template>
  <main class="pb-[100PX] bg-white">
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
    >
      <swiper-slide
        v-for="pic in swiperList"
        :key="pic.uid"
        class="swiper-slide"
      >
        <img
          v-src="pic.picUrl"
          class="w-full h-full object-cover object-center"
        />
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
        class="van-haptics-feedback"
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
        to="/notice/list"
        value="全部"
        value-class="text-[#e20a0a]"
      />
      <section class="mt-2 pl-[16PX] whitespace-nowrap overflow-x-auto">
        <div
          v-for="(notice, index) in homeNotice.slice(0, 3)"
          :key="notice.uid"
          class="notice-card"
          :style="{
            background: `linear-gradient(to bottom, ${noticeCards[index].bgColor})`
          }"
        >
          <van-text-ellipsis :content="notice.title" rows="2" />
          <span class="v-icon-text">
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
            @click="router.push('/detail/notice/' + notice.uid)"
          />
        </div>
      </section>
    </van-cell-group>

    <van-cell-group class="home-cell-group mt-4">
      <van-cell
        is-link
        title="最新新闻"
        title-class="home-cell-title"
        to="/news/list"
        value="全部"
        value-class="text-[#e20a0a]"
      />
      <VCard
        v-for="news in homeNews.slice(0, 8)"
        :key="news.uid"
        body-class="h-[80PX] flex flex-col"
        class="van-hairline--bottom van-haptics-feedback"
        @click="router.push('/detail/news/' + news.uid)"
      >
        <van-text-ellipsis
          class="text-justify"
          :content="news.title"
          rows="2"
        />
        <div class="between-end mt-auto">
          <v-tag :dictData="dictData" plain :value="news.type" />
          <span class="v-icon-text">
            <van-icon name="clock-o" />
            {{ dayjs(news.releaseDate).format('YY-MM-DD') }}
          </span>
        </div>
      </VCard>
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
