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
    <div class="tit">工作督查</div>
    <section
      class="bg-white p-4 leading-9 text-sm pb-4"
      style="border-bottom: solid 1px #ebebeb"
    >
      <div class="flex justify-between">
        <div>联华股份</div>
        <div>
          <van-space class="subtext color2" :size="2" fill>
            <Icon icon="ei:check" />
            <span> 已完成</span>
          </van-space>
        </div>
      </div>
      <van-space class="subtext" :size="2" fill>
        <Icon icon="mdi:checkbox-outline" class="color" />
        <span> 已提交</span>
      </van-space>
      <van-space class="subtext" :size="2" fill>
        <Icon icon="pajamas:user" class="color2" />
        <span> 孙岚</span>
      </van-space>
      <van-space class="subtext" :size="2" fill>
        <Icon icon="ion:time-outline" class="color1" />
        <span> 2023-12-25 17:49</span>
      </van-space>
      <div class="font-medium">反馈内容</div>
      <div>
        9月份以来，联华股份党委分别召开了公司领导班子会议、三季度党组织书记例会、公司干部大会，传达学习了上海国资国企领域全面从严治党暨警示教育大会、全市巡视巡察工
      </div>
      <div class="font-medium">上报文件</div>
      <div class="text-blue-600">
        1. 2-4物贸股份党委贯彻落实叶永明书记在集团系统党政主
        要负责人会议上的讲话要求的报告.docx
      </div>
    </section>
    <section
      class="bg-white p-4 leading-9 text-sm pb-4"
      style="border-bottom: solid 1px #ebebeb"
    >
      <div class="flex justify-between">
        <div>联华股份</div>
        <div>
          <van-space class="subtext color" :size="2" fill>
            <Icon icon="ei:check" />
            <span> 部分完成</span>
          </van-space>
        </div>
      </div>
      <van-space class="subtext" :size="2" fill>
        <Icon icon="mdi:checkbox-outline" class="color" />
        <span> 已提交</span>
      </van-space>
      <van-space class="subtext" :size="2" fill>
        <Icon icon="pajamas:user" class="color2" />
        <span> 孙岚</span>
      </van-space>
      <van-space class="subtext" :size="2" fill>
        <Icon icon="ion:time-outline" class="color1" />
        <span> 2023-12-25 17:49</span>
      </van-space>
      <div class="font-medium">反馈内容</div>
      <div>
        9月份以来，联华股份党委分别召开了公司领导班子会议、三季度党组织书记例会、公司干部大会，传达学习了上海国资国企领域全面从严治党暨警示教育大会、全市巡视巡察工
      </div>
      <div class="font-medium">上报文件</div>
      <div class="text-blue-600">
        1. 2-4物贸股份党委贯彻落实叶永明书记在集团系统党政主
        要负责人会议上的讲话要求的报告.docx
      </div>
    </section>
    <section
      class="bg-white p-4 leading-9 text-sm pb-4"
      style="border-bottom: solid 1px #ebebeb"
    >
      <div class="flex justify-between">
        <div>联华股份</div>
        <div>
          <van-space class="subtext color-red" :size="2" fill>
            <Icon icon="ei:check" />
            <span> 未完成</span>
          </van-space>
        </div>
      </div>
      <van-space class="subtext" :size="2" fill>
        <Icon icon="mdi:checkbox-outline" class="color" />
        <span> 已提交</span>
      </van-space>
      <van-space class="subtext" :size="2" fill>
        <Icon icon="pajamas:user" class="color2" />
        <span> 孙岚</span>
      </van-space>
      <van-space class="subtext" :size="2" fill>
        <Icon icon="ion:time-outline" class="color1" />
        <span> 2023-12-25 17:49</span>
      </van-space>
      <div class="font-medium">反馈内容</div>
      <div>
        9月份以来，联华股份党委分别召开了公司领导班子会议、三季度党组织书记例会、公司干部大会，传达学习了上海国资国企领域全面从严治党暨警示教育大会、全市巡视巡察工
      </div>
      <div class="font-medium">上报文件</div>
      <div class="text-blue-600">
        1. 2-4物贸股份党委贯彻落实叶永明书记在集团系统党政主
        要负责人会议上的讲话要求的报告.docx
      </div>
    </section>
    <section
      class="bg-white p-4 leading-9 text-sm pb-4"
      style="border-bottom: solid 1px #ebebeb"
    >
      <div class="flex justify-between">
        <div>联华股份</div>
        <div>
          <van-space class="subtext color1" :size="2" fill>
            <Icon icon="ei:check" />
            <span> 待定</span>
          </van-space>
        </div>
      </div>
      <van-space class="subtext" :size="2" fill>
        <Icon icon="mdi:checkbox-outline" class="color" />
        <span> 已提交</span>
      </van-space>
      <van-space class="subtext" :size="2" fill>
        <Icon icon="pajamas:user" class="color2" />
        <span> 孙岚</span>
      </van-space>
      <van-space class="subtext" :size="2" fill>
        <Icon icon="ion:time-outline" class="color1" />
        <span> 2023-12-25 17:49</span>
      </van-space>
      <div class="font-medium">反馈内容</div>
      <div>
        9月份以来，联华股份党委分别召开了公司领导班子会议、三季度党组织书记例会、公司干部大会，传达学习了上海国资国企领域全面从严治党暨警示教育大会、全市巡视巡察工
      </div>
      <div class="font-medium">上报文件</div>
      <div class="text-blue-600">
        1. 2-4物贸股份党委贯彻落实叶永明书记在集团系统党政主
        要负责人会议上的讲话要求的报告.docx
      </div>
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
</style>
