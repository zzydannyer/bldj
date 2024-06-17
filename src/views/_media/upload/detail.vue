<script setup lang="ts">
  import { getMedia, listAudit, listActivitiesByMainId } from '@/api/media';
  import { closeToast, showImagePreview, showLoadingToast } from 'vant';
  import { _5_years_ago, formatDate } from '@/utils/date';

  import { useGlobal } from '@/utils';
  import { MediaAudit, MediaMain } from '@/types/_media';
  import { Icon } from '@iconify/vue';
  import ReviewTimeline from '@/views/media/reviewTimeline';
  const activitiesName = ref<any>([]);
  //****************************************************************//
  const route = useRoute();
  const { $parse } = useGlobal<GlobalPropertiesApi>();

  //****************************************************************//
  const detail = ref<MediaMain>(new MediaMain());
  const auditList = ref<MediaAudit[]>([]);

  //****************************************************************//
  // 详情页数据
  const getMediaLsit = async () => {
    try {
      showLoadingToast({ message: '加载中...', forbidClick: true });
      const { id } = route.params as { id: Numeric };
      const { data: _detail } = await getMedia(id);
      const { data: _auditList } = await listAudit(id);
      detail.value = _detail!;
      auditList.value = _auditList!;
      let res = await listActivitiesByMainId(id);
      activitiesName.value = res.data!;
    } catch (e) {
      console.log(e);
    } finally {
      closeToast();
    }
  };

  //****************************************************************//
  // 放大预览图片
  const showImage = (url: string) => {
    showImagePreview([url]);
  };

  //****************************************************************//
  onMounted(getMediaLsit);
</script>

<template>
  <main class="container">
    <v-card>
      <div v-if="detail.mediaType === '1'">
        <template v-if="detail.mediaList && detail.mediaList.length > 0">
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <div v-for="item in detail.mediaList" class="w-full h-80" @click="showImage(item.thumbnailUrl)">
              <van-swipe-item>
                <img class="w-full h-full" :src="item.thumbnailUrl" alt="" />
              </van-swipe-item>
            </div>
          </van-swipe>
        </template>
      </div>

      <van-form input-align="right">
        <div class="v-detail-title">
          <span class="text-left inline-block">{{ detail.projectName }}</span>
        </div>
        <!-- 征集活动 -->
        <van-field v-if="activitiesName.length > 0">
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
            <van-text-ellipsis class="text-left" rows="2" :content="detail.materialBrief" expand-text="展开" collapse-text="收起" />
          </template>
        </van-field>
        <!-- 素材 -->
        <van-field label-align="top" input-align="left">
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

    <!-- 审核记录 begin -->
    <v-card class="mt-4" v-if="auditList.length > 0">
      <review-timeline :audit-list="auditList" />
    </v-card>
    <!-- 审核记录 end -->
  </main>
</template>

<style scoped>
  .van-form >>> .van-field {
    padding-left: 0;
    padding-right: 0;
  }
</style>
