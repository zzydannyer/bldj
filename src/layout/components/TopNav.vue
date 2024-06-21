<script setup lang="ts">
  const route = useRoute();
  const title = computed<string>(() => {
    if (route.query?.title) {
      return route.query.title as string;
    } else if (route.meta?.title) {
      return route.meta.title as string;
    } else {
      return '';
    }
  });

  const hideTopNav = computed<boolean>(() => {
    return route.meta?.hideTopNav as boolean;
  });
  function onClickLeft() {}
</script>
<template>
  <van-nav-bar
    v-show="!hideTopNav"
    :border="false"
    class="top-nav"
    fixed
    left-arrow
    placeholder
    safe-area-inset-top
    :title="title"
    z-index="9"
    @click-left="onClickLeft"
  />
</template>

<style lang="scss" scoped>
  .top-nav {
    @apply w-full text-center text-white font-semibold;
    // prettier-ignore
    --van-nav-bar-height:45PX;
    --van-nav-bar-icon-color: #fff;
    --van-nav-bar-text-color: #fff;
    --van-nav-bar-title-text-color: #fff;
    --van-nav-bar-background: url('@/assets/images/topnav-bg.png') no-repeat
        center bottom / 100% auto,
      #e10101;
    // top: constant(safe-area-inset-top);
    margin-top: env(safe-area-inset-top);
  }
</style>
