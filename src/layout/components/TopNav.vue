<script setup lang="ts">
  defineOptions({
    name: 'VNavBar'
  });
  const route = useRoute();
  const router = useRouter();
  const title = computed<string>(() => {
    if (route.query?.title) {
      return route.query.title as string;
    } else if (route.meta?.title) {
      return route.meta.title as string;
    } else {
      return '';
    }
  });

  const isHome = computed(() => route.path === '/home');
  const isMine = computed(() => route.path === '/mine');
  const isMore = computed(() => route.meta?.more);
  const showBackBtn = computed<boolean>(() => {
    return !!history?.state?.back || !isHome || !isMine || !isMore;
  });

  const showLeftArrow = computed<boolean>(() => {
    return route.meta?.showLeftArrow as boolean;
  });
  const hideTopNav = computed<boolean>(() => {
    return route.meta?.hideTopNav as boolean;
  });
  function onClickLeft() {
    history.back();
  }
  function onClickRight() {}
</script>
<template>
  <van-nav-bar
    v-show="!hideTopNav"
    :border="false"
    class="top-nav"
    fixed
    :left-arrow="showLeftArrow"
    :placeholder="true"
    safe-area-inset-top
    :title="title"
    z-index="3"
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <template #left>
      <van-icon v-if="showBackBtn" name="arrow-left" @click="onClickLeft" />
    </template>
  </van-nav-bar>
</template>

<style lang="scss" scoped>
  .top-nav {
    @apply font-semibold;
    // prettier-ignore
    --van-nav-bar-height:45PX;
    --van-nav-bar-icon-color: #fff;
    --van-nav-bar-text-color: #fff;
    --van-nav-bar-title-text-color: #fff;
    --van-nav-bar-background: url('@/assets/images/topnav-bg.png') no-repeat
        center bottom / 100% auto,
      #e10101;
  }
</style>
