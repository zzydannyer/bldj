<script setup lang="ts">
  import { getPublicResourceFile } from '@/api/media/publicResource'
  import { PublicResourceFile } from '@/types/_media/publicResource'
  import { closeToast, showImagePreview, showLoadingToast } from 'vant'
  import { fileType } from '@/constants'
  import Player from 'xgplayer'
  import 'xgplayer/dist/index.min.css'

  const route = useRoute()
  const { id } = route.params
  const detail = ref<PublicResourceFile>(new PublicResourceFile())

  // 首次加载数据
  const getDetail = async () => {
    try {
      showLoadingToast({ message: '加载中...', forbidClick: true })
      const { data } = await getPublicResourceFile(id as Numeric)
      detail.value = data!

      if (data?.fileType === '3') {
        await nextTick()
        new Player({
          id: 'video',
          url: data!.url,
          poster: data!.thumbUrl,
          volume: 0,
          autoplay: false,
          screenShot: true,
          fluid: true,
          closeVideoClick: true,
          closeVideoTouch: true,
          enableVideoDbltouch: true,
        })
      }
    } catch (err) {
      console.error(err)
    } finally {
      closeToast()
    }
  }

  onBeforeMount(getDetail)
</script>

<template>
  <main class="detail-container">
    <section class="detail-img-container">
      <van-image
        v-if="detail.fileType === '2'"
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
      <div id="video" v-if="detail.fileType === '3'"></div>
    </section>
    <section class="detail-content">
      <div class="v-detail-title">
        <span class="inline-block text-left">{{ detail.resTitle }}</span>
      </div>
      <div class="my-2 text-gray-500">
        <span>{{ detail?.mediaList[0].name }}</span>
      </div>
      <div class="v-date">{{ detail.createTime }}</div>
    </section>
  </main>
</template>
