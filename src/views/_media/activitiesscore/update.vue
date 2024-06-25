<script setup lang="ts">
  import { onBeforeMount } from 'vue';
  import { Activitiesscore, MediaActivitiesScore } from '@/types/_media';
  import {
    closeToast,
    showImagePreview,
    showLoadingToast,
    showSuccessToast
  } from 'vant';
  import Player from 'xgplayer';
  import 'xgplayer/dist/index.min.css';
  import {
    getMediaActivitiesScoreDetail,
    scoreMediaDetail
  } from '@/api/_media';
  import { emitter } from '@/plugins/mitt';
  import { useGlobal } from '@/utils';

  const route = useRoute();
  const { id, activitiesId } = route.params;
  const score = ref<number>(0);
  const router = useRouter();
  const { $parse } = useGlobal<GlobalPropertiesApi>();
  const detail = ref<Activitiesscore>(new Activitiesscore());
  // 首次加载数据
  const getDetail = async () => {
    try {
      showLoadingToast({ message: '加载中...', forbidClick: true });
      const { data } = await getMediaActivitiesScoreDetail(
        activitiesId as string,
        id as string
      );

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
  const handleScore = async () => {
    const data: MediaActivitiesScore = {
      activitiesId: activitiesId as string,
      mediaDetailId: id as string,
      mediaMainId: detail?.value?.id as string,
      score: score.value
    };
    let { code, msg } = await scoreMediaDetail([data]);
    if (code == 200) {
      showSuccessToast(msg || '提交成功');
      emitter.emit('refresh');
      router.go(-1);
    }
  };
  onBeforeMount(getDetail);
</script>
<template>
  <main class="detail-container">
    <section class="detail-img-container">
      <van-image
        v-if="detail.mediaType === '1'"
        class="w-full"
        fit="cover"
        :src="detail.url"
        @click="showImagePreview([detail.url!])"
      >
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
      <div class="v-icon-text flex mt-2 justify-between">
        <span>{{ detail.resourceTypeName }}</span>
        <span>{{ $parse(detail.shootingTime) }}</span>
      </div>
      <div class="mt-2 flex items-center">
        打分：
        <van-rate v-model="score" allow-half :count="10" />
        <span class="text-red-600 text-lg ml-4">{{ score }}分</span>
      </div>
      <van-button @click="handleScore" class="mt-6" round type="primary" block>
        打分
      </van-button>
    </section>
  </main>
</template>
