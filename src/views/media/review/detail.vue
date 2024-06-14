<script setup lang="ts">
  import { getMedia, listAudit,listActivitiesByMainId } from '@/api/media'
  import { _5_years_ago, formatDate } from '@/utils/date'
  import { closeToast, showImagePreview, showLoadingToast } from 'vant'
  import ReviewTimeline from '@/views/media/reviewTimeline'
  import { MediaAudit, MediaMain } from '@/types/media'
  import { Icon } from '@iconify/vue'
  
  const route = useRoute()
  const detail = ref<MediaMain>(new MediaMain())
  const auditList = ref<MediaAudit[]>()
  const activitiesName=ref<any>([])
  // 路由参数
  const id = route.params.id as string
  // **************************************************************************************
  const getMediaList = async () => {
    try {
      showLoadingToast({ message: '加载中...', forbidClick: true, duration: 0 })
      // 媒体列表数据
      const { data: _detail } = await getMedia(id)
      let res=await listActivitiesByMainId(id)
      activitiesName.value=res.data!
      
      // 审核记录数据
      const { data: _auditList } = await listAudit(id)
      detail.value = _detail!
      auditList.value = _auditList!
    } catch (e) {
      console.error(e)
    } finally {
      closeToast()
    }
  }
  // 放大预览图片
  const showImage = () => {
    const urls =
      detail.value.mediaList &&
      detail.value.mediaList.map((item) => item.thumbnailUrl)
    if (!urls) return
    showImagePreview(urls)
  }
  onMounted(getMediaList)
</script>
<template>
  <main class="container">
    <v-card>
      <template v-if="detail.mediaList && detail.mediaList.length > 0">
        <van-swipe
          class="my-swipe"
          :autoplay="5000"
          indicator-color="white"
          v-if="detail.mediaType === '1'"
          @click="showImage"
        >
          <van-swipe-item
            class="center-center"
            v-for="(item, index) in detail.mediaList"
            :key="index"
          >
            <van-image
              fit="cover"
              class="aspect-video"
              :src="item.thumbnailUrl"
              alt=""
            />
          </van-swipe-item>
        </van-swipe>
      </template>

      <van-form input-align="right">
        <div class="v-detail-title">
          <span class="text-left inline-block">{{ detail.projectName }}</span>
        </div>
        <!-- 征集活动 -->
        <van-field v-if="activitiesName.length>0">
          <template #label>
            <span>征集活动</span>
          </template>
          <template #input>
            <van-tag plain v-for="item in activitiesName" type="primary">{{ item.activitiesName }}</van-tag>
          </template>
        </van-field>
        
        <!-- 作者 -->
        <van-field>
          <template #label>
            <span>作者</span>
          </template>
          <template #input>
            <span>{{ detail.author }}</span>
          </template>
        </van-field>
        <!-- 资源类别 -->
        <van-field>
          <template #label>
            <span>资源类别</span>
          </template>
          <template #input>
            <span>{{ detail.resourceTypeName }}</span>
          </template>
        </van-field>
        <!-- 拍摄地点 -->
        <van-field>
          <template #label>
            <span>拍摄地点</span>
          </template>
          <template #input>
            <span>{{ codeToName(detail.shootingArea) }}</span>
          </template>
        </van-field>
        
        <!-- 拍摄时间 -->
        <van-field>
          <template #label>
            <span>拍摄时间：</span>
          </template>
          <template #input>
            <span>{{ formatDate(detail.shootingTime) }}</span>
          </template>
        </van-field>
        <!-- 素材介绍 -->
        <van-field label-align="top" input-align="left">
          <template #label>
            <span>素材介绍</span>
          </template>
          <template #input>
            <van-text-ellipsis
              class="text-left"
              rows="2"
              :content="detail.materialBrief"
              expand-text="展开"
              collapse-text="收起"
            />
          </template>
        </van-field>
        <!-- 素材 -->
        <van-field label-align="top">
          <template #label>
            <span>
              {{ detail.mediaType === '1' ? '图片素材' : '视频素材' }}
            </span>
          </template>
          <template #input>
            <template v-if="detail.mediaList && detail.mediaList.length > 0">
              <v-uploader
                class="w-full"
                :disabled="true"
                url="media"
                readonly
                v-model="detail.mediaList"
                :type="detail.mediaType === '1' ? 'image' : 'video'"
              />
            </template>
            <van-tag v-else size="medium" type="primary">暂无素材</van-tag>
          </template>
        </van-field>
      </van-form>
    </v-card>

    <v-card class="mt-4">
      <section class="section-title">
        <Icon icon="clarity:timeline-line" />
        审核记录
      </section>

      <review-timeline :audit-list="auditList" />
    </v-card>
  </main>
</template>

<style scoped>
  .van-form >>> .van-field {
    padding-left: 0;
    padding-right: 0;
  }
</style>
