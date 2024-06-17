<script setup lang="ts">
  import { showSuccessToast, showFailToast, showImagePreview, showLoadingToast, closeToast } from 'vant';
  import Player from 'xgplayer';
  import { getPublicMediaActivitiesScoreDetail, addUserCollect } from '@/api/media/index';

  import { formatDate } from '@/utils/date';
  import { MediaPublic } from '@/types/_media';

  const route = useRoute();
  const detail = ref<MediaPublic>({});
  const { id, activitiesId } = route.params;

  const getDetail = async () => {
    try {
      showLoadingToast({ message: '加载中...', forbidClick: true });
      const { data } = await getPublicMediaActivitiesScoreDetail(activitiesId as string, id);
      detail.value = data!;
      if (data?.mediaType === '2') {
        await nextTick();
        new Player({
          id: 'video',
          url: data!.url,
          poster: data!.thumbnailUrl,
          volume: 0,
          autoplay: false,
          screenShot: true,
          fluid: true,
          closeVideoClick: true,
          closeVideoTouch: true,
          enableVideoDbltouch: true
        });
      }
    } finally {
      closeToast();
    }
  };
  // 放大预览图片
  const showImage = (url: string) => {
    showImagePreview([url]);
  };
  // 收藏素材
  const handleCollect = async () => {
    try {
      showLoadingToast({ message: '收藏中...', forbidClick: true });

      const { code } = await addUserCollect(id as string);
      if (code !== 200) return showFailToast({ message: '收藏失败' });

      showSuccessToast({
        message: detail.value.collect ? '收藏成功' : '取消成功'
      });
      detail.value.collect = !detail.value.collect;
    } catch (err) {
      console.error(err);
    } finally {
      closeToast();
    }
  };

  onBeforeMount(getDetail);
</script>

<template>
  <main class="detail-container">
    <div class="detail-img-container">
      <van-image v-if="detail.mediaType === '1'" width="100%" :src="detail.thumbnailUrl" @click="showImage(detail.thumbnailUrl!)">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
      <div id="video" v-if="detail.mediaType === '2'"></div>
    </div>
    <div class="detail-content">
      <div class="v-detail-title">
        <span class="inline-block text-left">{{ detail.projectName }}</span>
      </div>
      <div class="flex between-center" @click="handleCollect">
        <v-plain-tag type="primary">{{ detail.resourceTypeName }}</v-plain-tag>

        <div>
          <van-icon class="align-text-bottom mr-1" size="20" color="gold" :name="detail.collect ? 'star' : 'star-o'" />
          <span class="text-sm align-middle">
            {{ detail.collect ? '已收藏' : '收藏' }}
          </span>
        </div>
      </div>

      <p class="detail-description">
        {{ detail.materialBrief }}
      </p>

      <div class="flex gap-2 text-xs text-gray-500">
        <span>{{ detail.author }}</span>
        <span>{{ formatDate(detail.shootingTime) }}</span>
        <span>{{ codeToName(detail.shootingArea) }}</span>
      </div>
      <van-divider />
      <span>
        总分<span class="font-bold text-red-500 ml-1 text-lg">{{ detail.score }}</span>
      </span>
    </div>
  </main>
</template>
