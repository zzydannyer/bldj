<script lang="ts" setup>
  import { useGlobal } from '@/utils';
  import { formatDate } from '@/utils/date';
  import { showLoadingToast, closeToast } from 'vant';
  import DetailServer from '@/api/details';
  import dayjs from 'dayjs';
  import { Icon } from '@iconify/vue';

  const route = useRoute();
  const detailId = route.params.id as string;
  const detail = ref<any>({});
  const { $value_to_label, $useDict } = useGlobal<GlobalPropertiesApi>();

  async function getDetail() {
    try {
      showLoadingToast({ message: '加载中' });
      const { data } = await DetailServer.GET_CONTENT_VIEW(detailId);
      console.log('🚀 ~ getDetail ~ data:', data);
      detail.value = data;
    } catch (e) {
      console.error(e);
    } finally {
      closeToast();
    }
  }

  onBeforeMount(getDetail);
</script>

<template>
  <main class="detail-container">
    <div class="v-detail-title">
      <span class="">{{ detail.title }}</span>
    </div>
    <div class="describe">
      <div class="v-icon-text">
        <Icon class="color" icon="solar:user-linear" />
        <span>{{ detail.author }}</span>
      </div>
      <div class="v-icon-text ml-3">
        <Icon class="color1" icon="ion:time-outline" />
        <span>{{ dayjs(detail.releaseDate).format('YYYY-MM-DD') }}</span>
      </div>

      <div class="v-icon-text ml-auto">
        <Icon class="color2" icon="tabler:eye-discount" />浏览 <span>8</span>
      </div>
    </div>
    <van-divider />
    <div class="detail-content">
      <!-- 在重阳节来临之际，为认真履行国有企业的社会责任，持续推动“我为群众办实事”实践活动走深走实，现代物流总部党总支的相关同志前往金山区漕泾镇金光村开展结对帮扶走访慰问活动。
      当天，一行人跟随金光村党总支副书记李霞的指引，看望了村里一名因病致贫的老党员以及一位独居重残重病老人，给他们送去了来自百联的节日问候和慰问金。在同慰问对象聊家常的过程中，众人关切地询问老人的身体状况和生活情况，叮嘱他们要好好养病，保重身体，早日战胜病魔。
      今后，现代物流总部党总支将继续加强与结对村的交流互动，在力所能及的范围内持续发力、精准帮扶，用心用情用力落实好集团党委交办的农村综合帮扶工作，切实把党史学习教育成果转化为服务群众、振兴乡村的生动实践。
      （供稿：雾柳） -->
    </div>
  </main>
</template>
<style lang="scss" scoped>
  .color {
    color: rgb(194, 179, 88);
  }
  .color1 {
    color: rgb(0, 110, 225);
  }
  .color2 {
    color: rgb(88, 194, 107);
  }
  .describe {
    @apply flex justify-between mt-2;
  }
</style>
