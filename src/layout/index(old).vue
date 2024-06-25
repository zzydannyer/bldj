<script lang="ts" setup>
  import VMenu from '@/components/VMenu/index.vue';
  import { emitter } from '@/plugins/mitt';
  import { storeToRefs } from 'pinia';

  const menu = ref();
  const route = useRoute();
  const router = useRouter();
  const isHome = computed(() => route.name === 'Home');
  const routeTitle = computed(() =>
    showNav.value
      ? route.meta.keepAlive
        ? (route.meta.title as string)
        : ''
      : ''
  );
  // 根据路由是否是首页动态给#app添加背景图
  const showNav = ref(false);
  const showNavBar = computed(() => (isHome.value ? showNav.value : true));
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

  // 恢复记录滚动条位置
</script>

<template>
  <!-- 开启顶部安全区适配 -->
  <!-- <van-nav-bar safe-area-inset-top /> -->
  <v-menu ref="menu" />

  <van-nav-bar
    :border="!isHome"
    class="v-animation"
    :class="visible ? null : '-translate-y-full'"
    fixed
    :left-arrow="!isHome"
    safe-area-inset-top
    :style="{
      zIndex: 2,
      '--van-nav-bar-icon-color': '#fff',
      background: showNavBar
        ? 'linear-gradient(to bottom right, #499cfa, #1962fb)'
        : 'transparent'
    }"
    :title="routeTitle"
    @click-left="goBack"
  >
    <template #right>
      <van-icon
        color="#fff"
        name="wap-nav"
        size="20"
        @click="menu.showMenu()"
      />
    </template>
  </van-nav-bar>
  <!--  mode="out-in"-->
  <router-view v-slot="{ Component, route }">
    <Transition
      name="fade"
      @after-enter="navBarStore.watchScrollTop"
      @enter="onEnter"
    >
      <keep-alive>
        <component
          :is="Component"
          v-if="route.meta.keepAlive"
          :key="route.path"
        />
      </keep-alive>
    </Transition>
    <Transition
      mode="out-in"
      :name="transitionName"
      @after-enter="navBarStore.watchScrollTop"
      @enter="onEnter"
    >
      <component
        :is="Component"
        v-if="!route.meta.keepAlive"
        :key="route.path"
      />
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
