<script lang="ts" setup>
  import { getNotice } from '@/api/_system/notice.ts';
  import { SysNotice } from '@/types/_system/sysNotice.ts';
  import { useGlobal } from '@/utils';
  import { formatDate } from '@/utils/date';
  import { showLoadingToast, closeToast } from 'vant/es';
  import { Icon } from '@iconify/vue';

  const route = useRoute();
  const noticeId = route.params.noticeId;
  const detail = ref<SysNotice>();
  const { $value_to_label, $useDict } = useGlobal<GlobalPropertiesApi>();
  const { sys_notice_type } = $useDict('sys_notice_type');
  const getDetail = async () => {
    try {
      showLoadingToast({ message: '加载中' });
      const { data } = await getNotice(noticeId as string);
      detail.value = data;
    } catch (e) {
      console.error(e);
    } finally {
      closeToast();
    }
  };

  onBeforeMount(getDetail);
</script>

<template>
  <main class="detail-container bg-white padding">
    <div class="v-detail-title">
      <span class="inline-block text-left pt-6"
        >上海市国资委监管企业党支部规范化建设细则</span
      >
    </div>
    <div class="indent-7" v-html="detail?.noticeContent" />
    <div class="describe">
      <div class="flex flex-nowrap">
        <div class="text-xs">
          <Icon icon="solar:user-linear" class="color" />蔡文明
        </div>
        <div class="text-xs ml-3">
          <Icon icon="ion:time-outline" class="color1" />2021-15-20 15:23
        </div>
      </div>

      <div class="text-xs ml-3">
        <Icon icon="tabler:eye-discount" class="color2" />浏览 <span>8</span>
      </div>
    </div>
    <div class="detail">
      在重阳节来临之际，为认真履行国有企业的社会责任，持续推动“我为群众办实事”实践活动走深走实，现代物流总部党总支的相关同志前往金山区漕泾镇金光村开展结对帮扶走访慰问活动。
      当天，一行人跟随金光村党总支副书记李霞的指引，看望了村里一名因病致贫的老党员以及一位独居重残重病老人，给他们送去了来自百联的节日问候和慰问金。在同慰问对象聊家常的过程中，众人关切地询问老人的身体状况和生活情况，叮嘱他们要好好养病，保重身体，早日战胜病魔。
      今后，现代物流总部党总支将继续加强与结对村的交流互动，在力所能及的范围内持续发力、精准帮扶，用心用情用力落实好集团党委交办的农村综合帮扶工作，切实把党史学习教育成果转化为服务群众、振兴乡村的生动实践。
      （供稿：雾柳）
    </div>
    <van-divider />
  </main>
</template>
<style lang="scss" scoped>
  .detail {
    @apply text-sm leading-7 pt-6;
    width: 85%;
    margin: 0 auto;
  }
  .color {
    @apply mt-1;
    color: rgb(194, 179, 88);
  }
  .color1 {
    @apply mt-1;
    color: rgb(0, 110, 225);
  }
  .color2 {
    @apply mt-1;
    color: rgb(88, 194, 107);
  }
  .describe {
    @apply flex justify-between mx-6 pb-3 mt-4;
    border-bottom: solid 1px #e5e5e5;
  }
</style>
