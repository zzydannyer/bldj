<script setup lang="ts">
  import { PropagandaMain } from '@/types/media/propaganda';
  import { checkScoreDetail, getDateRange, getNewMediaConfirm, listOption, listStandCascadeList } from '@/api/media/scoreStandard';
  import { checkRole, getPropaganda } from '@/api/media/propaganda';
  import { PickerOption, closeToast, showConfirmDialog, showLoadingToast, showSuccessToast, showToast } from 'vant';
  import useUserInfoStore from '@/store/modules/userInfo';
  import { joinDate, _5_years_ago, dateFormatter } from '@/utils/date';
  import { updatePropaganda } from '@/api/media/propaganda';
  import { debounce, last } from 'lodash';
  import { emitter } from '@/plugins/mitt';
  import { RouteParams } from 'vue-router';
  import { useGlobal } from '@/utils';
  import ProjectPicker from '@/views/media/projectPicker.tsx';
  import StandardPicker from '@/views/_propaganda/filing/standardPicker';
  import { PropagandaClue } from '@/types/media/propagandaClue.ts';
  import { getPropagandaClue, updatePropagandaClue } from '@/api/media/propagandaClue.ts';

  const form = ref<PropagandaClue>(new PropagandaClue());
  const route = useRoute();
  const id = route.params.id as string;
  const result = ref('');
  const scoreMainId = ref('');
  // 是否为集团角色
  const isCulture = ref<boolean>();
  const router = useRouter();
  const userInfoStore = useUserInfoStore();
  const rmEmptyChildren = (arr: any[]) => {
    for (let item of arr) {
      if (item.children.length === 0) {
        delete item.children;
      } else {
        rmEmptyChildren(item.children);
      }
    }
    return arr;
  };

  const onSubmit = async () => {
    if (new Date(form.value.endTime) < new Date(form.value.startTime)) {
      showToast('结束时间不能小于开始时间');
      return;
    }
    form.value.id = id as string;
    const { code, msg } = await updatePropagandaClue(form.value);
    if (code === 200) {
      showSuccessToast(msg || '提交成功');
      emitter.emit('refresh');
      router.go(-1);
    }
  };
  // 外部链接校验
  const validator = (val: string) => (val ? /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/.test(val) : true);

  const getRecord = async () => {
    const { data } = await getPropagandaClue(id);
    form.value = data!;
  };

  onBeforeMount(() => {
    getRecord();
  });
</script>
<template>
  <section class="container">
    <van-form input-align="left" @submit="onSubmit">
      <van-cell-group inset>
        <!-- 项目工程名称 -->
        <project-picker :rules="[{ required: true, message: '请选择项目' }]" required v-model:id="form.projectId" v-model:name="form.projectName" />

        <v-date-picker
          required
          v-model="form.startTime"
          :min-date="_5_years_ago"
          label="开始时间"
          :rules="[{ required: true, message: '请选择开始时间' }]"
          placeholder="请选择开始时间"
        />
        <v-date-picker
          required
          v-model="form.endTime"
          :min-date="_5_years_ago"
          label="结束时间"
          :rules="[{ required: true, message: '请选择结束时间' }]"
          placeholder="请选择结束时间"
        />

        <!-- 报道摘要 -->
        <van-field
          required
          v-model="form.clueContent"
          rows="2"
          autosize
          show-word-limit
          maxlength="800"
          type="textarea"
          label="新闻线索内容"
          placeholder="请输入新闻线索内容"
          :rules="[{ required: true, message: '请输入新闻线索内容' }]"
          name="clueContent"
        />

        <van-cell-group inset class="mt-[16PX]">
          <v-tree-select v-model="form.linkUser" placeholder="请选择联系人" label="联系人" name="linkUser" />
        </van-cell-group>
      </van-cell-group>

      <van-button class="my-4" round block type="success" native-type="submit"> 提交 </van-button>
    </van-form>
  </section>
</template>

<style lang="scss" scoped>
  :deep(.van-cascader) {
    .van-tab__text {
      max-width: 20vw;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>
