<script lang="ts" setup>
  import type { ImageProps } from 'vant';
  import UrlServer from '@/api/privateUrl';
  import Utils from '@/utils';
  import defaultImage from '@/assets/images/default.png?url';

  defineOptions({
    name: 'VImage'
  });

  type DefaultImageProps = Partial<ImageProps> & {
    private: boolean;
    mini: boolean;
  };

  const props = withDefaults(defineProps<DefaultImageProps>(), {
    src: '',
    private: true,
    mini: true
  });

  const bindUrl = ref('');

  const fetching = ref(false); // 控制异步请求的标志位

  watch(() => props.src, fetchImage, { immediate: true });

  async function fetchImage(newSrc: string) {
    try {
      if (fetching.value) return; // 避免重复触发
      fetching.value = true;

      let url = newSrc;
      if (props.private && Utils.isPrivateUrl(newSrc)) {
        const res = await UrlServer.GET_URL(newSrc, props.mini);
        url = res.data!;
      }
      await checkImage(url);
      bindUrl.value = url;
    } catch (e) {
      bindUrl.value = defaultImage;
    } finally {
      fetching.value = false;
    }
  }

  function checkImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = src;

      image.onload = () => {
        resolve();
      };
      image.onerror = () => {
        reject();
      };
    });
  }
</script>

<template>
  <van-loading type="spinner" size="20" v-if="fetching" />
  <van-image v-bind="props" :src="bindUrl">
    <template #loading>
      <van-loading type="spinner" size="20" />
    </template>
  </van-image>
</template>

<style lang="scss" scoped></style>
