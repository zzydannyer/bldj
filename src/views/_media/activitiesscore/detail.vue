<script setup lang="ts">
  import { onBeforeMount } from 'vue';
  import { Activitiesscore } from '@/types/_media';
  import { closeToast, showImagePreview, showLoadingToast } from 'vant';
  import Player from 'xgplayer';
  import { useGlobal } from '@/utils';
  import 'xgplayer/dist/index.min.css';
  import { getMediaActivitiesScoreDetail } from '@/api/media';
  const route = useRoute();
  const { $parse } = useGlobal<GlobalPropertiesApi>();
  const { id, activitiesId } = route.params;
  const score = ref<number>(0);
  const detail = ref<Activitiesscore>(new Activitiesscore());
  // 首次加载数据
  const getDetail = async () => {
    try {
      showLoadingToast({ message: '加载中...', forbidClick: true });
      const { data } = await getMediaActivitiesScoreDetail(activitiesId as string, id as string);
      score.value = Number(data!.score);
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
    <section class="detail-img-container">
      <van-image v-if="detail.mediaType === '1'" class="w-full" fit="cover" :src="detail.url" @click="showImagePreview([detail.url!])">
        <template #loading>
          <van-loading type="spinner" size="20" />
        </template>
        <template #error>加载失败</template>
      </van-image>
      <div id="video" v-if="detail.mediaType === '2'"></div>
    </section>
    <section class="detail-content">
      <div class="v-detail-title">
        <span class="inline-block text-left">{{ detail.resTitle }}</span>
      </div>
      <div class="my-2 text-gray-500">
        <span>{{ detail?.projectName }}</span>
      </div>
      <div class="v-date flex mt-2 justify-between">
        <span>{{ detail.resourceTypeName }}</span>
        <span>{{ $parse(detail.shootingTime) }}</span>
      </div>
      <div class="mt-2 flex items-center">
        得分:
        <van-rate v-model="score" readonly allow-half :count="10" />
        <span class="text-red-600 text-lg ml-2">{{ score }}分</span>
      </div>
    </section>
  </main>
</template>
