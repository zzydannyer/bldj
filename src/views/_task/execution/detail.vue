<script setup lang="ts">
  import {
    getWorkFeedback,
    viewWorkFeedback
  } from '@/api/_media/taskExecution';
  import { useGlobal } from '@/utils';
  import { getWorkMain } from '@/api/_media/taskRelease';

  const { $useDict, $parse, $parseDict } = useGlobal<GlobalPropertiesApi>();
  const { work_release_type, feedback_status, work_type_code } = $useDict(
    'work_release_type',
    'feedback_status',
    'work_type_code'
  );
  const route = useRoute();
  const { id, workId }: any = route.params;
  const relaseList: any = ref([]);
  const detailList: any = ref([]);
  // 详情页数据
  const getrelaseList = async () => {
    let { data } = await getWorkFeedback(id);
    let res = await getWorkMain(workId);
    await viewWorkFeedback(id);
    relaseList.value = data;
    detailList.value = res.data;
  };
  const activeNames = ref(['0']);
  onBeforeMount(() => {
    getrelaseList();
  });
</script>
<template>
  <main class="container">
    <van-cell-group inset>
      <van-field>
        <template #label>类型</template>
        <template #input>
          {{ $parseDict(work_type_code, detailList.typeCode) }}
        </template>
      </van-field>
      <van-field>
        <template #label>任务类型</template>
        <template #input>
          {{ $parseDict(work_release_type, detailList.workType) }}
        </template>
      </van-field>
      <van-field>
        <template #label>任务名</template>
        <template #input>{{ detailList.workTitle }}</template>
      </van-field>
      <van-field>
        <template #label>截止时间</template>
        <template #input>{{ $parse(detailList.deadline) }}</template>
      </van-field>
      <van-field>
        <template #label>任务内容</template>
        <template #input>{{ detailList.workDesc ?? '暂无任务内容' }}</template>
      </van-field>
      <van-field>
        <template #label>任务附件</template>
        <template #input>
          <v-uploader
            disabled
            url="oss"
            v-if="detailList?.workFiles?.length > 0"
            v-model="detailList.workFiles"
            type="file"
          />
          <van-tag v-else size="medium" type="primary">暂无附件</van-tag>
        </template>
      </van-field>
      <van-field v-if="relaseList.submitStatus === '-1'">
        <template #label>退回原因</template>
        <template #input>
          <div>{{ relaseList.workAuditDesc }}</div>
        </template>
      </van-field>
      <van-field v-if="relaseList.submitStatus === '3'">
        <template #label>反馈内容</template>
        <template #input>
          {{
            relaseList.feedbackDesc ? relaseList.feedbackDesc : '暂无反馈内容'
          }}
        </template>
      </van-field>
      <van-field v-if="relaseList.submitStatus === '3'">
        <template #label>反馈附件</template>
        <template #input>
          <v-uploader
            :disabled="true"
            url="oss"
            v-if="relaseList?.workFiles?.length > 0"
            v-model="relaseList.workFiles"
            type="file"
          />
          <van-tag v-else size="medium" type="primary">暂无附件</van-tag>
        </template>
      </van-field>
    </van-cell-group>

    <van-cell-group
      inset
      style="margin-top: 20px"
      v-if="detailList.workType === '2'"
    >
      <van-collapse v-model="activeNames">
        <van-collapse-item title="任务回填" name="1">
          <div v-for="(item, index) in relaseList.questions" :key="index">
            <van-field disabled v-model="item.question" label="提问" />
            <van-field disabled v-model="item.mustDesc" label="回答" />
          </div>
        </van-collapse-item>
      </van-collapse>
    </van-cell-group>
  </main>
</template>
<style scoped lang="scss">
  ::v-deep(.van-cell) {
    // padding: 0px !important;

    .van-cell__title {
      color: rgb(107 114 128 / var(--tw-text-opacity));
      --tw-text-opacity: 1;
      font-size: var(--van-collapse-item-content-font-size);
    }
  }
</style>
