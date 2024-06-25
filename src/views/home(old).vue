<script lang="tsx" setup>
  import { useIcon, useImage } from '@/utils/assets';
  import { register } from 'swiper/element/bundle';
  import 'swiper/css';
  import 'swiper/css/pagination';
  import { useEventListener } from '@vueuse/core';
  import { delay, throttle } from 'lodash';
  import { emitter } from '@/plugins/mitt';
  import { useGlobal } from '@/utils';

  import { closeToast, showDialog, showLoadingToast } from 'vant';
  import {
    auditAlertNum,
    getMediaAuditSum,
    getNoticeSum,
    getWorkFeedbackDealtSum,
    listScoreSum
  } from '@/api';
  import { listPublicResourceLatest } from '@/api/_media/publicResource';
  import { getNotice, listNotice } from '@/api/_system/notice';
  import { listMediaPublicLast, listMessageManage } from '@/api/_media';
  import { MediaPublic } from '@/types/_media';
  import { SysNotice } from '@/types/_system/sysNotice';
  import { PropagandaAuditAlertVo } from '@/types/_media/propaganda';
  import { PublicResourceFile } from '@/types/_media/publicResource';
  import { Message } from '@/types/_message';
  import { Icon } from '@iconify/vue';

  defineOptions({
    name: 'Home'
  });

  const { $parse } = useGlobal<GlobalPropertiesApi>();

  const loading = ref(false);
  // 消息
  const msgList = ref<Message[]>([]);
  // 推荐素材
  const bannerList = ref<MediaPublic[]>([]);
  // 公告通知
  const noticeList = ref<SysNotice[]>([]);
  // 公共资源的
  const resourceList = ref<PublicResourceFile[]>([]);

  // 获取消息
  // const getMsgList = async () => {
  //   const { data } = await listMessageManage({ isRead: '0' })
  //   msgList.value = data!
  // }

  const showMsg = (notice: SysNotice) => {
    showDialog({
      title: notice.noticeTitle,
      message: notice.noticeContent,
      allowHtml: true
    });
  };
  // 获取推荐素材
  const getMediaPublicLast = async () => {
    const { data } = await listMediaPublicLast();
    bannerList.value = data!;
  };
  //获取公告通知
  const getNoticeList = async () => {
    const { data } = await listNotice();
    noticeList.value = data!;
  };

  const showNotice = async (noticeId: Numeric) => {
    showLoadingToast({
      message: '加载中...',
      forbidClick: true
    });

    const { data } = await getNotice(noticeId);
    const html = `<div class="text-center"><div class="inline-block text-justify">${data?.noticeContent}</div></div>`;
    closeToast();
    showDialog({
      title: data?.noticeTitle,
      message: html,
      allowHtml: true
    });
  };

  // 获取公共资源
  const getPublicResource = async () => {
    const { data } = await listPublicResourceLatest();
    resourceList.value = data!;
  };

  // nav图标
  const iconList = ref<any[]>([
    {
      icon: 'home_media_resource',
      name: '素材资源',
      path: '/media/review',
      sum: 0
    },

    {
      icon: 'home_publicity_assessment',
      name: '宣传考核',
      sum: 0
    },
    {
      icon: 'home_schedule_task',
      name: '日程任务',
      path: '/task',
      sum: 0
    },
    {
      icon: 'home_public_resource',
      name: '公共资源',
      path: '/public'
    },
    {
      icon: 'home_announcement_notice',
      name: '消息待办',
      path: '/msg',
      sum: 0
    }
  ]);

  const showAction = ref(false);
  const actions = ref<any>([]);
  const actionMap = {
    media: '新媒体审核',
    other: '媒体审核'
  };

  const onSelect = ({ key }: { key: string }) => {
    if (key === 'other') {
      router.push('/propaganda/approval');
    } else if (key === 'media') {
      router.push('/propaganda/approval-new');
    } else {
      return;
    }
  };
  const handleGridItemClick = (name: string) => {
    if (name === '宣传考核') {
      showAction.value = true;
    }
  };

  const navigateTo = (path: string, id?: Numeric) => {
    router.push(path + (id ? '/' + id : ''));
  };

  const getSum = () => {
    // 待审核素材统计
    getMediaAuditSum().then(({ data }) => {
      iconList.value[0].sum = data!;
    });
    // 宣传考核统计
    auditAlertNum().then(({ data }) => {
      for (const key in data!) {
        iconList.value[1].sum += data[key as keyof PropagandaAuditAlertVo];
        actions.value.push({
          name: actionMap[key as keyof PropagandaAuditAlertVo],
          subname: data[key as keyof PropagandaAuditAlertVo],
          key
        });
      }
    });
    // 日程任务统计
    getWorkFeedbackDealtSum().then(({ data }) => {
      iconList.value[2].sum = data!;
    });
    // 消息待办统计
    /*getNoticeSum().then(({ data }) => {
    iconList.value[4].sum = data!
  })*/
    listScoreSum().then(({ data }) => {
      rankList.value = data;
      const today = new Date();
      const lastDay = new Date(today.getFullYear() - 1, 11, 26);
      const startTime = $parse(lastDay, 'YYYY-MM-DD');
      const endTime = $parse(today, 'YYYY-MM-DD');
      rankTimeRange.value = startTime + ' ~ ' + endTime;
    });
  };

  // 首页导航栏显示隐藏
  const app = document.querySelector('#app');
  useEventListener(
    app,
    'scroll',
    throttle(
      (e) => {
        const scrollTop = e.target.scrollTop;
        if (scrollTop >= 46) {
          emitter.emit('showNavBar', true);
        } else {
          emitter.emit('showNavBar', false);
        }
      },
      0,
      { leading: true, trailing: false }
    )
  );

  const breakpoints = {
    768: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 3
    }
  };

  const rankList = ref<
    { orgCode: string; orgName: string; fraction: number }[]
  >([]);
  const rankTimeRange = ref('');

  const RankItems = () => {
    return rankList.value.map((row, index) => {
      return (
        <div
          class={[index > 2 ? 'rank-out' : 'rank-in', 'rank-item']}
          key={row.orgCode}
        >
          <div class="start-center gap-2">
            <span class="">
              {index > 2 ? (
                <span>{index + 1}</span>
              ) : (
                <Icon
                  class={[
                    'text-2xl',
                    index === 0 ? 'text-amber-400' : '',
                    index === 1 ? 'text-gray-200' : '',
                    index === 2 ? 'text-yellow-600' : ''
                  ]}
                  icon="material-symbols:star"
                />
              )}
            </span>
            <span class="text-lg">{row.orgName}</span>
          </div>
          <span class="text-2xl italic">{row.fraction}</span>
        </div>
      );
    });
  };

  onBeforeMount(async () => {
    try {
      loading.value = true;
      await Promise.allSettled([
        getSum(),
        getMediaPublicLast(),
        getNoticeList(),
        getPublicResource()
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  });
  onMounted(register);
</script>

<template>
  <main class="home-container">
    <v-card class="home-nav">
      <van-grid :border="false" clickable :column-num="5" icon-size="48px">
        <van-grid-item
          v-for="({ icon, name, sum, path }, index) in iconList"
          :key="index"
          :badge="sum"
          :badge-props="{
            max: 9,
            showZero: false,
            offset: [-10, 5]
          }"
          :icon="useIcon(icon)"
          :text="name"
          :to="path"
          @click="handleGridItemClick(name)"
        />
      </van-grid>
    </v-card>
    <!--宣传考核弹出层-->
    <van-action-sheet
      v-model:show="showAction"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      description="宣传考核"
      @select="onSelect"
    >
      <template #action="{ action }">
        <div class="between-center">
          <span>{{ action.name }}</span>

          <van-badge :content="action.subname" :offset="[0, 15]" />
        </div>
      </template>
    </van-action-sheet>

    <!-- 消息 -->
    <van-skeleton class="mt-4" :loading="loading">
      <template #template>
        <van-skeleton-title style="height: 40px" title-width="100%" />
      </template>
      <van-notice-bar
        background="#ecf9ff"
        class="mt-4"
        color="#1989fa"
        left-icon="volume-o"
        :scrollable="false"
      >
        <van-swipe
          v-if="noticeList.length > 0"
          :autoplay="3000"
          class="notice-swipe"
          :show-indicators="false"
          :touchable="true"
          vertical
        >
          <van-swipe-item
            v-for="notice in noticeList"
            :key="notice.noticeId"
            @click="showMsg(notice)"
          >
            {{ notice.noticeTitle }}
          </van-swipe-item>
        </van-swipe>
        <span v-else>暂无消息</span>
      </van-notice-bar>
    </van-skeleton>

    <!-- 推荐素材 -->
    <section class="main-title mb-2 mt-4">推荐素材</section>

    <van-skeleton :loading="loading">
      <template #template>
        <div class="w-full flex gap-2">
          <div v-for="_ in 3" :key="_" class="w-full flex flex-col gap-1">
            <van-skeleton-image image-shape="square" image-size="100%" />
            <van-skeleton-title title-width="100%" />
          </div>
        </div>
      </template>

      <swiper-container
        v-if="bannerList.length"
        :autoplay="{ disableOnInteraction: false, delay: 0 }"
        :breakpoints="breakpoints"
        :centered-slides="false"
        :freeMode="true"
        :injectStyles="[
          '.swiper-wrapper{transition-timing-function: linear !important;}'
        ]"
        :loop="true"
        :slides-per-view="3"
        :space-between="10"
        :speed="4000"
      >
        <swiper-slide
          v-for="{ url, resourceName, id } in bannerList"
          :key="id"
          @click="navigateTo('/media/list/detail', id!)"
        >
          <van-image
            class="w-full aspect-video overflow-hidden rounded"
            :src="url"
          >
            <template #loading>
              <van-loading size="20" type="spinner" />
            </template>
            <template #error>加载失败</template>
          </van-image>
          <van-text-ellipsis
            class="text-center text-sm"
            :content="resourceName"
          />
        </swiper-slide>
      </swiper-container>

      <van-empty v-else description="暂无推荐素材" image-size="30vw" />
    </van-skeleton>
    <!-- 宣传分数排名 -->
    <section class="main-title mt-4">
      宣传分数排名
      <span class="text-xs">{{ rankTimeRange }}</span>
    </section>

    <van-skeleton :loading="loading">
      <template #template>
        <div class="w-full flex flex-col gap-2 mt-2">
          <div v-for="_ in 5" :key="_">
            <van-skeleton-paragraph row-width="100%" style="height: 60px" />
          </div>
        </div>
      </template>
      <div class="h-[400PX] overflow-auto flex flex-col gap-2">
        <RankItems />
      </div>
    </van-skeleton>

    <!-- 推荐公共资源 -->
    <section class="main-title my-2">公共资源</section>

    <van-skeleton :loading="loading">
      <template #template>
        <div class="w-full flex flex-col gap-2">
          <div v-for="_ in 5" :key="_" class="between-center gap-2">
            <van-skeleton-paragraph row-width="70%" />
            <van-skeleton-title title-width="30%" />
          </div>
        </div>
      </template>

      <div v-if="resourceList.length" class="resources">
        <van-cell
          v-for="{ id, resTitle, createTime } in resourceList"
          :key="id"
          class="resources-item"
          clickable
          @click="navigateTo('/public/resource/detail', id)"
        >
          <template #title>
            <van-text-ellipsis class="resources-text" :content="resTitle" />
          </template>
          <template #value>
            <span class="resources-time">{{ createTime }}</span>
          </template>
        </van-cell>
      </div>
      <van-empty v-else description="暂无公共资源" image-size="30vw" />
    </van-skeleton>

    <!-- <van-tabbar v-model="active">
    <van-tabbar-item name="home" icon="wap-home">首页</van-tabbar-item>
    <van-tabbar-item name="coupon" icon="coupon">媒体资料</van-tabbar-item>
    <van-tabbar-item name="column" icon="column">日程任务</van-tabbar-item>
    <van-tabbar-item name="records" icon="records">宣传考核</van-tabbar-item>
    <van-tabbar-item icon="setting-o">公共资源</van-tabbar-item>
  </van-tabbar> -->

    <van-back-top teleport="body" z-index="1" />
  </main>
</template>
<!-- 轮播 -->
<style>
  .swiper-initialized {
    position: relative;
    z-index: 0;
  }

  #pagination .swiper-pagination-bullet {
    width: 30px;
    height: 6px;
    border-radius: 4px;
  }

  .notice-swipe {
    height: 40px;
    line-height: 40px;
  }
</style>
<!-- 背景 -->
<style lang="scss">
  .home-container {
    background: url('@/assets/images/home_bg.png') top center no-repeat;
    background-size: 100% auto;
    background-attachment: scroll;
    padding: 369px $body-padding 20px;
    background-color: #fff;
  }
</style>
<style lang="scss" scoped>
  :deep() {
    .van-grid {
      flex-wrap: nowrap;

      .van-grid-item__text {
        margin-top: 0;
        font-weight: bold;
      }
    }

    .van-skeleton {
      padding: 0;
    }
  }

  .home-nav {
    margin-top: $home-nav-margin;
    padding-top: 0;
    padding-bottom: 0;
  }

  /* 通知公告 */
  .notice {
    box-sizing: border-box;
    padding: $home-card-padding;
    background-image: linear-gradient(to bottom right, #499cfa, #1962fb);
    height: $home-card-height;
    position: relative;
    border-radius: $home-border-radius;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    color: white;

    .notice-title {
      font-size: $small-font-size;
      font-weight: 600;
    }

    .notice-time {
      display: flex;
      gap: 10px;
      align-items: center;
      color: #eee;
      font-size: $min-font-size;
      margin-top: 10px;
    }

    .notice-more {
      white-space: nowrap;
      display: flex;
      align-items: center;
      font-size: $min-font-size;
      padding: 5px 10px;
      border-radius: 5px;
      background-image: linear-gradient(to right, #296bf3, #59adff);
    }
  }

  .notice.type {
    background-image: linear-gradient(to bottom right, #fac249, #fba319);

    .notice-more {
      background-image: linear-gradient(to right, #fba319, #fac147);
    }
  }

  /* 推荐公共资源 */
  .resources {
    .resources-item {
      padding-left: 0;
      padding-right: 0;

      &::after {
        left: 0;
        right: 0;
      }

      .resources-text {
        flex: 1;
        margin-right: 4px;
      }

      .resources-time {
        color: #ccc;
        font-size: $min-font-size;
      }
    }
  }

  :deep() {
    // 排名
    .rank-item {
      @apply px-4 rounded-lg py-2 between-center font-semibold;
    }

    .rank-in {
      @apply bg-gradient-to-r from-cyan-500 to-blue-500 text-white;
    }

    .rank-out {
      @apply text-gray-500 bg-blue-50;
    }
  }
</style>
