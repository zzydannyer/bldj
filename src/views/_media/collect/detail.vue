<script setup lang="ts">
  import { getUserCollect } from '@/api/media'
  import { UserCollect } from '@/types/_media/collect'
  import { showImagePreview } from 'vant'
  const route = useRoute()
  const collectDetail = ref<UserCollect>({})
  const collectList = async () => {
    const { id } = route.params
    console.log('🚀 ~ file: detail.vue:8 ~ collectList ~ id:', id)
    // 首次加载请求
    let { data } = await getUserCollect(id as string)
    collectDetail.value = data!
  }
  // 放大预览图片
  const showImage = (url: string) => {
    showImagePreview([url])
  }
  onBeforeMount(collectList)
</script>
<template>
  <section class="detail-container">
    <section class="detail-img-container">
      <van-image
        class="w-full"
        fit="cover"
        :src="collectDetail.thumbUrl"
        @click="showImage(collectDetail.thumbUrl)"
      >
        <template #loading>
          <van-loading type="spinner" size="20" />
        </template>
        <template #error>加载失败</template>
      </van-image>
    </section>
    <section class="detail-content">
      <div class="v-detail-title">
        <span class="inline-block text-left">
          {{ collectDetail.projectName }}
        </span>
      </div>
      <div class="my-2 text-gray-500">
        <span>{{ collectDetail.author }}</span>
      </div>
      <div class="v-date">收藏于:{{ collectDetail.collectTime }}</div>
    </section>
  </section>
</template>
<style scoped lang="scss"></style>
