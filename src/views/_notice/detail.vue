<script lang="ts" setup>
  import { getNotice } from '@/api/system/notice';
  import { SysNotice } from '@/types/_system/sysNotice';
  import { useGlobal } from '@/utils';
  import { formatDate } from '@/utils/date';
  import { showLoadingToast, closeToast } from 'vant/es';

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
      <span class="inline-block text-left">{{ detail?.noticeTitle }}</span>
    </div>
    <div class="indent-7" v-html="detail?.noticeContent" />
    <div class="my-4">备注：{{ detail?.remark ?? '无' }}</div>
    <div class="text-right">
      <div>{{ $value_to_label(sys_notice_type, detail?.noticeType) }}</div>
      <div class="text-xs text-gray-700">
        {{ formatDate(detail?.createTime) }}
      </div>
    </div>
    <van-divider />
  </main>
</template>
