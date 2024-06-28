<script lang="ts" setup>
  import { useGlobal } from '@/utils';
  import { formatDate } from '@/utils/date';
  import { showLoadingToast, closeToast } from 'vant/es';
  import { Icon } from '@iconify/vue';
  const route = useRoute();
  const noticeId = route.params.noticeId;
  const detail = ref<any>();
  const { $value_to_label, $useDict } = useGlobal<GlobalPropertiesApi>();
  const { sys_notice_type } = $useDict('sys_notice_type');
  const getDetail = async () => {
    try {
      showLoadingToast({ message: '加载中' });
    } catch (e) {
      console.error(e);
    } finally {
      closeToast();
    }
  };
  onBeforeMount(getDetail);
</script>

<template>
  <main class="p-4 pb-40">
    <div class="tit">重点工作督办</div>
    <section class="bg-white p-4 leading-9 text-sm">
      <div>任务类型：会议文件</div>
      <div>责任部室：百联集团</div>
      <div>任 务 名: 重点工作任务</div>
      <div>截止时间：2023-12-26 12:12:20件</div>
      <div>任务内容：请各单位按时完成任务</div>
      <div>接收单位：二级公司</div>
      <div>接收群体：全部</div>
    </section>
    <div class="tit">工作回馈</div>
    <section
      class="bg-white p-4 leading-9 text-sm pb-4"
      style="border-bottom: solid 1px #ebebeb"
    >
      <div>
        <div class="font-medium"><span class="color-red">*</span>反馈内容</div>
        <van-cell-group inset>
          <van-field
            v-model="message"
            required
            rows="2"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="请输入留言"
            show-word-limit
            label-align="top"
          />
        </van-cell-group>
      </div>
      <div class="font-medium">上报文件</div>
      <div class="text-blue-600">
        <van-uploader>
          <van-button icon="plus" type="primary">上传文件</van-button>
        </van-uploader>
      </div>
      <div class="leading-6 mt-2">
        请上传 大小不超过 <span class="color-red">100MB</span> 格式为<span
          class="color-red"
        >
          doc/xls/ppt/txt/pdf/ xlsx/docx/png/jpg</span
        >
        的文件
      </div>
      <van-button
        block
        class="button mt-4 redbg"
        size="small"
        to="uploadMaterials"
        type="primary"
        text="详情"
        round
      />
    </section>
  </main>
</template>
<style lang="scss" scoped>
  .tit {
    @apply text-center text-white font-medium leading-7;
    background-color: #e12000;
  }
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
  .color-red {
    @apply mt-1;
    color: #fe5555;
  }
  .describe {
    @apply flex justify-between mx-6 pb-3 mt-4;
    border-bottom: solid 1px #e5e5e5;
  }
  .button {
    @apply font-bold;
    --van-button-primary-background: #e22001;
    --van-button-primary-border-color: #e22001;
  }
</style>
