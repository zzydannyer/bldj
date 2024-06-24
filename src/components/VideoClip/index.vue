<script lang="ts" setup>
  import Player from 'xgplayer/es/player';
  import mobile from 'xgplayer/es/plugins/mobile';
  import loading from 'xgplayer/es/plugins/loading';
  import progress from 'xgplayer/es/plugins/progress';
  import time from 'xgplayer/es/plugins/time';
  import { Events } from 'xgplayer';
  import VueSlider from 'vue-slider-component';
  import 'vue-slider-component/theme/default.css';
  import { setVideoImg } from '@/utils/video';
  import { formatTime } from '@/utils/date';
  import {
    closeToast,
    showFailToast,
    showLoadingToast,
    showNotify,
    showToast
  } from 'vant';
  import { debounce } from 'lodash';
  import { cropVideo } from '@/api/_media';
  import { DefaultSerializer } from 'v8';

  // 设置默认值,需要显式的开启,具体查看vue3文档
  const props = withDefaults(defineProps<{ media: any }>(), {
    media: () => ({})
  });
  // 视频配置
  const options = {
    volume: 0,
    autoplay: false,
    fluid: true,
    plugins: [mobile, loading, progress, time]
  };

  const value = ref<[number, number]>([0, 0]);
  const max = ref(0);
  const player = ref<Player>();

  // const offsetLeft = ref('0%')
  const preview = ref();
  const beginImgSrc = ref('');
  const endImgSrc = ref('');
  const result = computed(() => value.value.map((item) => formatTime(item)));

  const sliderChange = () => {
    // offsetLeft.value = (value.value[0] / max.value) * 100 + '%'
    player.value!.seek(value.value[0]);
    setPrevewImg();
  };

  const setPrevewImg = debounce(async () => {
    const _beginImgSrc = await setVideoImg(
      props.media.url,
      value.value[0],
      undefined,
      'preview-img'
    );
    beginImgSrc.value = _beginImgSrc;

    const _endImgSrc = await setVideoImg(
      props.media.url,
      value.value[1],
      undefined,
      'preview-img'
    );
    endImgSrc.value = _endImgSrc;
  }, 200);

  const minRange = 5;
  // 起止时间间隔最小≈1秒
  watch(
    () => value.value,
    (newVal) => {
      if (newVal[1] - newVal[0] <= minRange) {
        showToast(`片段最小时长${minRange}秒`);
      }
    }
  );

  /**
   * @description 初始化
   */
  const playerEl = ref();
  function init() {
    showLoadingToast({ message: '加载中...', forbidClick: true, duration: 0 });

    showNotify({
      type: 'success',
      className: 'notify-nav',
      message: '预览图加载较慢，请耐心等待'
    });

    player.value = new Player({
      el: playerEl.value,
      url: props.media.url,
      poster: props.media.thumbnailUrl,
      // url: 'https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4',
      // poster: 'https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg',
      ...options
    });
    player.value.on(Events.LOADED_DATA, () => {
      closeToast();
      max.value = Math.ceil(player.value!.duration);
      value.value = [0, max.value];
      player.value?.play();

      const promises = [];
      // 设置预览图
      for (let i = 0; i < 10; i++) {
        const cur = Math.ceil((max.value / 10) * i);
        // setVideoImg(props.url, cur, preview.value)
        promises.push(
          setVideoImg(props.media.url, cur, preview.value, 'slider-item').then(
            (res) => {
              if (i === 0) beginImgSrc.value = res;
              if (i === 9) endImgSrc.value = res;
            }
          )
        );
      }

      Promise.all(promises).then(() => {
        closeToast();
      });
      /*  promises.reduce(async (prevPromise, currentPromise) => {
   await prevPromise;
   return currentPromise;
 }, Promise.resolve()).then(() => {
   closeToast()
 }) */
    });

    player.value.on(Events.TIME_UPDATE, () => {
      // offsetLeft.value = (player.value!.currentTime / max.value) * 100 + '%'
      if (player.value!.currentTime >= value.value[1]) {
        player.value!.pause();
      }
    });
  }

  defineExpose({ init, handleSubmit });

  const emits = defineEmits(['cancel', 'updateVideo']);
  // 提交视频裁剪
  async function handleSubmit() {
    try {
      showLoadingToast({ message: '提交中', forbidClick: true });
      const startTime = formatTime(value.value[0]);
      const endTime = formatTime(value.value[1]);
      const duration = formatTime(value.value[1] - value.value[0]);
      const { code, data } = await cropVideo(props.media.id as string, [
        { startTime, endTime, duration }
      ]);
      console.log('🚀 ~ file: upload.vue:124 ~ handleSubmit ~ data:', data);
      if (code === 200 && data && data.url) {
        emits('updateVideo', props.media.id, data);
      }
    } catch (e) {
      console.error(e);
      showFailToast('提交失败');
    } finally {
      closeToast();
    }
  }
  // onMounted(init)
</script>

<template>
  <div ref="playerEl"></div>

  <vue-slider
    class="mx-6"
    v-model="value"
    :enableCross="false"
    :minRange="minRange"
    :max="max"
    drag-on-click
    lazy
    @change="sliderChange"
    style="height: 10vh"
  >
    <template #tooltip="{ value }">
      <span class="text-white text-xs rounded inline-block p-1">
        {{ formatTime(value) }}
      </span>
    </template>
    <template #dot>
      <div class="h-full px-2 center-center z-1" style="background-color: #eee">
        <van-icon color="#ccc" name="pause" />
      </div>
    </template>
    <template #process="{ start, end, style, index }">
      <div ref="preview" class="preview-list"></div>
      <div class="vue-slider-process slider-class" :style="[style]"></div>
      <!-- <div class="w-px h-full bg-yellow-300 absolute top-0" :style="{ left: offsetLeft }"></div> -->
    </template>
  </vue-slider>

  <section class="between-center text-xs text-white">
    <div>00:00:00</div>
    <div>{{ formatTime(max) }}</div>
  </section>

  <section class="around-center">
    <span class="text-white">{{ result[0] }}</span>
    <span class="text-white">{{ result[1] }}</span>
  </section>

  <section class="around-center">
    <van-image fit="contain" class="preview-img" :src="beginImgSrc">
      <template #loading>
        <van-loading type="spinner" size="20" />
      </template>
    </van-image>
    <van-image fit="contain" class="preview-img" :src="endImgSrc">
      <template #loading>
        <van-loading type="spinner" size="20" />
      </template>
    </van-image>
  </section>

  <section class="between-center m-4 gap-2">
    <van-button block @click="emits('cancel')">取消</van-button>
    <van-button type="primary" block @click="handleSubmit">提交</van-button>
  </section>
</template>

<style scoped lang="scss">
  :deep() {
    .vue-slider-rail {
      position: relative;
    }

    .vue-slider-rail,
    .slider-class {
      height: 10vh !important;
      border-radius: 0;
    }

    .slider-class {
      background-color: transparent;
      box-sizing: border-box;
      border: 5px solid #fff;
    }

    .vue-slider-dot {
      // prettier-ignore
      border-radius: 5PX;
      border: 1px solid white;
      height: 100% !important;
      overflow: hidden;
    }

    .preview-list {
      width: 100%;
      height: 100%;
      white-space: nowrap;

      .slider-item {
        width: 10%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }

    .preview-img {
      width: 40vw;
      height: 15vh;
    }
  }
</style>
