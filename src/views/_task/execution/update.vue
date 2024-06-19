<script setup lang="ts">
  import {
    keepWorkFeedback,
    submitWorkFeedback,
    getWorkFeedback,
    viewWorkFeedback
  } from '@/api/_media/taskExecution';
  import { emitter } from '@/plugins/mitt';
  import { WorkFeedback, WorkFeedbackList } from '@/types/_media/task';
  import { showSuccessToast, showFailToast, showToast } from 'vant';
  const form = ref<WorkFeedback>({});
  const route = useRoute();
  const { id, type } = route.params;
  const feedbacklist = ref(new WorkFeedbackList());
  const formref = ref();
  const router = useRouter();
  // 反馈信息回显
  const getWorklsit = async () => {
    let { data } = await getWorkFeedback(id as string);
    feedbacklist.value = data!;
    form.value.feedbackDesc = data?.feedbackDesc;
    form.value.workFiles = data?.workFiles;
    feedbacklist.value.questions = data?.questions;
  };

  // 提交

  const onSubmit = async () => {
    if (feedbacklist.value.workType === '1') {
      if (
        (!form.value.workFiles || form.value.workFiles.length === 0) &&
        !form.value.feedbackDesc
      ) {
        showToast('请上传文件附件或者填写任务反馈');
      } else {
        const submitValue = Object.assign(feedbacklist.value, form.value);
        let { code } = await submitWorkFeedback(submitValue);
        if (code === 200) {
          showSuccessToast('提交成功');
          router.go(-1);
          emitter.emit('refresh');
        }
      }
    } else {
      let res = await formref.value.validate();
      const submitValue = Object.assign(feedbacklist.value, form.value);
      let { code } = await submitWorkFeedback(submitValue);
      if (res === undefined) {
        if (code === 200) {
          showSuccessToast('提交成功');
          router.go(-1);
          emitter.emit('refresh');
        }
      }
    }
  };
  // 保存
  const handleSubmit = async () => {
    if (feedbacklist.value.workType === '1') {
      if (
        (!form.value.workFiles || form.value.workFiles.length === 0) &&
        !form.value.feedbackDesc
      ) {
        console.log('ssss');

        showToast('请上传文件附件或者填写任务反馈');
      } else {
        const submitValue = Object.assign(feedbacklist.value, form.value);
        let { code } = await keepWorkFeedback(submitValue);
        if (code === 200) {
          showSuccessToast('保存成功');
          router.go(-1);
          emitter.emit('refresh');
        }
      }
    } else {
      let res = await formref.value.validate();
      const submitValue = Object.assign(feedbacklist.value, form.value);
      let { code } = await keepWorkFeedback(submitValue);
      if (res === undefined) {
        if (code === 200) {
          showSuccessToast('保存成功');
          router.go(-1);
          emitter.emit('refresh');
        }
      }
    }
  };
  // 查看按钮
  const viewWork = async () => {
    await viewWorkFeedback(id as string);
  };
  onBeforeMount(() => {
    getWorklsit();
    viewWork();
  });
</script>

<template>
  <section class="container">
    <van-form @submit="onSubmit" ref="formref">
      <van-cell-group inset>
        <div v-if="feedbacklist.workType === '1'">
          <van-field
            autosize
            show-word-limit
            maxlength="300"
            type="textarea"
            v-model="form.feedbackDesc"
            name="任务反馈"
            label="任务反馈"
            placeholder="请输入任务反馈"
            :max-size="50 * 1024 * 1024"
          />
        </div>
        <div v-if="feedbacklist.workType === '1' || type === '3'">
          <van-field label="反馈附件">
            <template #input>
              <v-uploader url="oss" v-model="form.workFiles" type="file" />
            </template>
          </van-field>
        </div>
        <div v-else-if="feedbacklist.workType === '4'">
          <van-field
            required
            :rules="[{ required: true, message: '请上传反馈附件' }]"
            label="反馈附件"
          >
            <template #input>
              <v-uploader url="oss" v-model="form.workFiles" type="file" />
            </template>
          </van-field>
        </div>
        <template v-else-if="feedbacklist.workType === '2'">
          <div v-for="(item, index) in feedbacklist.questions" :key="index">
            <van-field
              autosize
              show-word-limit
              v-model="item.question"
              name="问题"
              label="问题"
              disabled
            />
            <van-field
              autosize
              show-word-limit
              maxlength="300"
              type="textarea"
              v-model="item.mustDesc"
              name="回答"
              label="回答"
              placeholder="请输入回答"
              :rules="[{ required: true, message: '请填写回答' }]"
            />
          </div>
        </template>
      </van-cell-group>
      <div class="flex justify-between mt-2">
        <van-button
          class="w-40"
          round
          block
          type="success"
          native-type="submit"
        >
          提交
        </van-button>
        <van-button
          class="w-40"
          round
          block
          type="primary"
          @click="handleSubmit"
        >
          保存
        </van-button>
      </div>
    </van-form>
  </section>
</template>
<style scoped lang="scss"></style>
