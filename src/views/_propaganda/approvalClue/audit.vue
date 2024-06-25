<script setup lang="ts">
  import { PropagandaAuditBo, PropagandaMain } from '@/types/_media/propaganda';
  import {
    addPropagandaAudit,
    checkRole,
    getPropaganda
  } from '@/api/_media/propaganda';
  import { listOption, listStandCascadeList } from '@/api/_media/scoreStandard';
  import { PickerOption, showSuccessToast, showFailToast } from 'vant';
  import { last } from 'lodash';
  import { toRaw } from 'vue';
  import { useGlobal } from '@/utils';
  import useUserInfoStore from '@/store/modules/user';
  import { emitter } from '@/plugins/mitt';
  import { storeToRefs } from 'pinia';
  import {
    checkChooseDetail,
    getPropagandaClue,
    passPropagandaClue,
    validateImportantClue
  } from '@/api/_media/propagandaClue';
  import { formatDate } from '@/utils/date';
  import { PropagandaClue } from '@/types/_media/propagandaClue';

  const userInfoStore = useUserInfoStore();
  const formref = ref();
  const router = useRouter();
  const route = useRoute();
  const id = route.params.id as string;
  const loading = ref(false);
  const form = ref<PropagandaClue>(new PropagandaClue());

  const auditView = async () => {
    const { data } = await getPropagandaClue(id);
    form.value = data!;
  };

  // 退回
  const handleReturn = async (val: string) => {
    // let vaidate = await formref.value.resetValidation([
    //   'scoreDetailText',
    //   'groupKind',
    // ])
    // let res = await formref.value.validate(['auditDesc'])
    // if (res === undefined) {
    //   const groupKind = form.groupKind
    //   form.mainId = id as string
    //   form.auditResult = val
    //   if (groupKind) {
    //     form.groupRatio = toRaw(getGroupRatio(groupKind))
    //   }
    //   form.otherScoreNum = form.optionMultiFlag === '1' ? 1 : 0
    //   let { code, msg } = await addPropagandaAudit(form)
    //   if (code === 200) {
    //     showSuccessToast(msg || '退回成功')
    //     emitter.emit('refresh')
    //     router.go(-1)
    //   } else {
    //     showFailToast(msg || '操作失败')
    //   }
    // }
  };
  // 提交
  const handleSubmit = async () => {
    let { code, msg } = await passPropagandaClue(form.value.id);
    if (code === 200) {
      showSuccessToast(msg || '通过成功');
      emitter.emit('refresh');
      router.go(-1);
    } else {
      showFailToast(msg || '操作失败');
    }
    // }
  };
  onBeforeMount(() => {
    auditView();
  });
</script>
<template>
  <section class="container">
    <van-form ref="formref" input-align="left">
      <van-cell-group inset>
        <van-form input-align="right">
          <van-field>
            <template #label>项目工程名称</template>
            <template #input>{{ form.projectName }}</template>
          </van-field>
          <van-field>
            <template #label>开始时间</template>
            <template #input>{{ formatDate(form.startTime) }}</template>
          </van-field>
          <van-field>
            <template #label>结束时间</template>
            <template #input>{{ formatDate(form.endTime) }}</template>
          </van-field>
          <van-field>
            <template #label>新闻线索内容</template>
            <template #input>{{ form.clueContent }}</template>
          </van-field>
          <div class="between-end">
            <span class="van-cell van-field">联系人</span>
            <v-tree-select v-model="form.linkUser" readonly name="linkUser" />
          </div>
        </van-form>
      </van-cell-group>
      <div class="my-4 between-center gap-2">
        <van-button round block type="primary" @click="handleSubmit">
          通过
        </van-button>
        <!--        <van-button round block type="danger" @click="handleReturn('2')">-->
        <!--          取消-->
        <!--        </van-button>-->
      </div>
    </van-form>
  </section>
</template>
<style lang="scss" scoped>
  .unique-class :deep .van-field__control {
    text-align: center;
  }
</style>
