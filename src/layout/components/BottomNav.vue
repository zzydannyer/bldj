<script setup lang="ts">
  import { useIcon } from '@/utils/assets';
  import { debounce } from 'lodash';
  import { RouteRecordRaw } from 'vue-router'; // Import the RouteRecordRaw type

  const route = useRoute();
  const router = useRouter();

  const rotates = ['-180', '-75', '-45', '-15', '15', '45', '75'];
  const curItem = ref('');
  const curIndex = ref(0);

  const visible = ref(false);
  const isHome = computed(() => route.path === '/home');
  const isMine = computed(() => route.path === '/mine');
  const isMore = computed(() => route.meta?.more);
  const isOther = computed(
    () => !isHome.value && !isMine.value && !isMore.value
  );
  const moreList = computed(() =>
    router.options.routes
      .filter((route: RouteRecordRaw) => {
        if (!route.meta) return false;
        return route.meta.more;
      })
      .sort((a: RouteRecordRaw, b) => {
        if (!a.meta || !b.meta) return 0;
        const rankA = a.meta.rank as number;
        const rankB = b.meta.rank as number;
        return rankA - rankB;
      })
  );

  watchEffect(() => {
    if (isMore.value) {
      moreList.value.forEach((item, index) => {
        if (route.path.includes(item.path)) {
          curIndex.value = index + 1;
        }
      });
    } else {
      curIndex.value = 0;
    }
  });

  const loading = ref(false);
  function changeRoute(item: string, index: number) {
    if (loading.value) return;
    loading.value = true;
    curItem.value = item;
    curIndex.value = index + 1;
    router.push(item);
    setTimeout(() => {
      visible.value = false;
      loading.value = false;
    }, 300);
  }
</script>

<template>
  <section
    class="mask-layer"
    :style="{
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? 'auto' : 'none'
    }"
    @click.self="visible = false"
  />
  <section class="w-full z-[5] fixed left-0 bottom-0">
    <!-- 中间更多菜单按钮 -->
    <section class="nav-trigger" @click="visible = !visible">
      <div :class="[isMore ? 'more-bg' : 'more-border', 'nav-more']">
        <img
          class="nav-icon-more"
          :src="isMore ? useIcon('nav-more-active') : useIcon('nav-more')"
        />
      </div>
    </section>
    <!-- 底部导航 -->
    <section class="bottom-nav">
      <van-grid
        :border="false"
        clickable
        :column-num="2"
        :safe-area-inset-bottom="true"
      >
        <van-grid-item to="/home" @click="visible = false">
          <van-image
            class="w-[20PX]"
            :src="isHome ? useIcon('icon-home-active') : useIcon('icon-home')"
          />
          <span
            class="mt-1"
            :class="isHome ? 'text-[#e20949]' : 'text-[#a9867e]'"
            >首页</span
          >
        </van-grid-item>
        <van-grid-item to="/mine" @click="visible = false">
          <van-image
            class="w-[20PX]"
            :src="isMine ? useIcon('icon-mine-active') : useIcon('icon-mine')"
          />
          <span
            class="mt-1"
            :class="isMine ? 'text-[#e20949]' : 'text-[#a9867e]'"
            >我的</span
          >
        </van-grid-item>
      </van-grid>
    </section>
    <!-- 更多菜单 -->
    <section
      class="nav-panel"
      :class="{
        visible: visible
      }"
    >
      <span
        v-for="(route, index) in moreList"
        :key="route.path"
        class="nav-text"
        @click="changeRoute(route.path, index)"
      >
        {{ route.meta?.title }}
      </span>
      <div
        class="nav-panel-active"
        :style="{
          transform: `translateX(-50%) rotate(${rotates[curIndex]}deg)`
        }"
      />
    </section>
  </section>
</template>

<style lang="scss" scoped>
  .bottom-nav {
    @apply z-0;
    padding-bottom: var(--safe-area-inset-bottom);
    --van-grid-item-content-background: linear-gradient(
      to bottom,
      #fce8e6,
      #fff
    );
    box-shadow: #fff0 0px 0px 1px;
  }
  .nav-trigger {
    @apply z-1 w-[70PX] h-[70PX] bg-white rounded-full top-0 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2;
    .nav-more {
      @apply absolute-center w-[90%] h-[90%] rounded-full;
      .nav-icon-more {
        @apply absolute-center w-[50%] h-[50%];
      }
    }
    .more-border {
      border: 1px solid #ebdfdd;
      background-image: linear-gradient(to bottom, #fff, #fef0ee);
    }
    .more-bg {
      background-image: linear-gradient(#f84200 0%, #e10101 100%);
    }
  }
  .nav-panel {
    @apply z-[-1] w-0 h-0 rounded-full top-0 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 transition-all duration-300 ease-in-out overflow-hidden;
    background-image: radial-gradient(circle, #ff4f22, #e10101);
  }
  .nav-panel.visible {
    @apply w-[240PX] h-[240PX];
  }
  .nav-panel-active {
    @apply z-0 absolute w-[27%] h-1/2 top-0 left-1/2 transition-all duration-300 ease-in-out;
    transform-origin: bottom center;
    background: url('@/assets/images/nav-panel-active.png') no-repeat;
    background-size: 100% 100%;
  }
  .nav-text {
    @apply absolute text-white z-1;
    &:nth-child(1) {
      top: 36%;
      left: 6%;
    }
    &:nth-child(2) {
      top: 18%;
      left: 16%;
    }
    &:nth-child(3) {
      top: 6%;
      left: 33%;
    }
    &:nth-child(4) {
      top: 6%;
      right: 33%;
    }
    &:nth-child(5) {
      top: 18%;
      right: 16%;
    }
    &:nth-child(6) {
      top: 36%;
      right: 6%;
    }
  }
  .mask-layer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 4;
    transition: all 0.3s;
  }
</style>
