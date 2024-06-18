<template>
  <van-overlay :show="modelValue" z-index="2">
    <!-- 视频关闭按钮 -->
    <van-icon v-if="type === 'video'" class="p-4 float-right" name="cross" color="white" size="20px" @click="modelValue = false" />

    <!-- 分页器 -->
    <div id="preview-pagination" />
    <!-- 视频 -->
    <div class="preview-swiper">
      <div class="preview-swiper-silder" :id="'video-' + listIndex" v-if="type === 'video'" />
    </div>

    <!-- 轮播 -->
    <swiper-container
      v-if="type === 'image'"
      ref="target"
      class="preview-swiper"
      :slides-per-view="1"
      :slides-per-group="1"
      :centered-slides="false"
      :pagination="{
        el: '#preview-pagination',
        hideOnClick: false,
        type: 'progressbar'
      }"
      @init="init"
      @slidechange="onSlideChange"
    >
      <div class="preview-swiper-silder">
        <van-image v-if="type === 'image'" class="w-full" fit="contain" :src="list[listIndex]" />
      </div>
    </swiper-container>
  </van-overlay>
</template>

<script setup lang="ts">
  import { register } from 'swiper/element/bundle';
  import 'swiper/css';
  import 'swiper/css/pagination';
  import { PropType } from 'vue';
  import { onClickOutside, useTimeoutFn } from '@vueuse/core';
  import Player from 'xgplayer';
  import 'xgplayer/dist/index.min.css';

  defineOptions({
    name: 'VPreview'
  });

  const {
    list = [],
    listIndex = 0,
    type = 'image'
  } = defineProps({
    list: Array as PropType<any[]>,
    listIndex: Number,
    type: String as PropType<'image' | 'video' | 'file'>
  });
  const modelValue = defineModel();

  // 播放器配置
  const activePlayer = ref();
  const activeIndex = ref(0);

  const options = {
    volume: 0,
    autoplay: false,
    screenShot: true,
    fluid: true,
    closeVideoClick: true,
    closeVideoTouch: true,
    enableVideoDbltouch: true
  };

  // 轮播方法
  const init = (e: any) => {
    const [swiper] = e.detail;
    swiper.slideTo(listIndex);
    activeIndex.value = listIndex;
  };

  const onSlideChange = async (e: any) => {
    const [swiper, progress] = e.detail;
    const currentIndex = swiper.activeIndex;
    // 有可能划了但没完全划
    if (currentIndex === activeIndex.value) return;

    if (type === 'video') {
      await nextTick();
      activePlayer.value.pause();
      const id = 'video-' + currentIndex;

      activePlayer.value = new Player({
        id,
        url: list[currentIndex].url,
        poster: list[currentIndex].thumbnailUrl,
        ...options
      });
    }

    activeIndex.value = currentIndex;
  };

  // 点击外部关闭
  const target = ref();

  watch(
    () => modelValue.value,
    async (val) => {
      if (val === true) {
        if (type === 'video') {
          await nextTick();
          const id = 'video-' + listIndex;
          const url = list[listIndex].url ?? list[listIndex];
          const poster = list[listIndex].thumbnailUrl;
          useTimeoutFn(function () {
            activePlayer.value = new Player({
              id,
              url,
              poster,
              ...options
            });
          }, 100);
        } else if (type === 'image') {
          onClickOutside(target, (event) => {
            modelValue.value = false;
          });
        } else {
          return;
        }
      }
    },
    { immediate: true }
  );

  onMounted(register);
</script>

<style lang="scss" scoped>
  .preview-swiper {
    width: 100%;
    height: auto;
    min-height: 30vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);

    .preview-swiper-silder {
      width: 100%;
      position: relative;

      .van-image {
        @include absolute-center;
      }
    }

    .swiper-slider .swiper-pagination {
      bottom: 0;
    }
  }
</style>
