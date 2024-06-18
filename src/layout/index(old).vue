<script lang="ts" setup>
  import VMenu from '@/components/VMenu/index.vue';
  import useTransitionStore from '@/store/modules/transition';
  import useScrollTopStore from '@/store/modules/scrollTop';
  import useNavBarStore from '@/store/modules/navBar';
  import { emitter } from '@/plugins/mitt';
  import { storeToRefs } from 'pinia';

  const menu = ref();
  const route = useRoute();
  const router = useRouter();
  const isHome = computed(() => route.name === 'Home');
  const routeTitle = computed(() => (showNav.value ? (route.meta.keepAlive ? (route.meta.title as string) : '') : ''));
  // 根据路由是否是首页动态给#app添加背景图
  const showNav = ref(false);
  const showNavBar = computed(() => (isHome.value ? showNav.value : true));
  const { transitionName } = storeToRefs(useTransitionStore());
  watchEffect(() => {
    if (isHome.value === true) {
      showNav.value = false;
      emitter.on('showNavBar', (val: boolean) => {
        showNav.value = val;
      });
    } else {
      showNav.value = true;
      emitter.off('showNavBar');
    }
  });

  const goBack = () => {
    router.go(-1);
  };
  const navBarStore = useNavBarStore();
  const { visible } = storeToRefs(navBarStore);

  // 恢复记录滚动条位置
  const scrollTopStore = useScrollTopStore();
  const onEnter = () => {
    const routeName = router.currentRoute.value.name;
    document.querySelector('#app')!.scrollTop = scrollTopStore.getScrollTop(routeName!);
  };
</script>

<template>
  <!-- 开启顶部安全区适配 -->
  <!-- <van-nav-bar safe-area-inset-top /> -->
  <v-menu ref="menu" />

  <van-nav-bar
    fixed
    safe-area-inset-top
    class="v-animation"
    :class="visible ? null : '-translate-y-full'"
    :style="{
      zIndex: 2,
      '--van-nav-bar-icon-color': '#fff',
      background: showNavBar ? 'linear-gradient(to bottom right, #499cfa, #1962fb)' : 'transparent'
    }"
    :border="!isHome"
    :title="routeTitle"
    :left-arrow="!isHome"
    @click-left="goBack"
  >
    <template #right>
      <van-icon name="wap-nav" color="#fff" size="20" @click="menu.showMenu()" />
    </template>
  </van-nav-bar>
  <!--  mode="out-in"-->
  <router-view v-slot="{ Component, route }">
    <Transition name="fade" @enter="onEnter" @after-enter="navBarStore.watchScrollTop">
      <keep-alive>
        <component :is="Component" v-if="route.meta.keepAlive" :key="route.path" />
      </keep-alive>
    </Transition>
    <Transition :name="transitionName" mode="out-in" @enter="onEnter" @after-enter="navBarStore.watchScrollTop">
      <component :is="Component" v-if="!route.meta.keepAlive" :key="route.path" />
    </Transition>
  </router-view>
  <!-- 开启底部安全区适配 -->
  <!-- <van-number-keyboard safe-area-inset-bottom /> -->
</template>

<style lang="scss" scoped>
  :deep() {
    .van-nav-bar__title {
      color: #fff;
    }
  }

  .van-hairline--bottom:after {
    display: none;
  }

  .van-cell-group {
    margin: 0;
  }
</style>
