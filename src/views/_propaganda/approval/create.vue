<script setup lang="ts">
  import { PropagandaMain } from '@/types/_media/propaganda';
  import { listOption, listStandCascadeList } from '@/api/media/scoreStandard';
  import { PickerOption, showSuccessToast } from 'vant';
  import { _5_years_ago } from '@/utils/date';
  import { submitToGroupNew } from '@/api/media/propaganda';
  import { last } from 'lodash';
  import { router } from '@/router';
  import { emitter } from '@/plugins/mitt';

  // import VueOfficePdf from '@vue-office/pdf'

  const form = reactive(new PropagandaMain());

  const loading = ref(false);
  const route = useRoute();
  const { id, type } = route.params;
  const groupScoreMainId = ref('');

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

  // 赋分依据
  const showScoreDetail = ref(false);
  const scoreDetailText = ref('');
  const scoreOption = ref<any[]>([]);
  // 额外加分项
  const showExtra = ref(false);
  const fieldNames = {
    text: 'text',
    value: 'id',
    children: 'children'
  };

  const toggle = () => {
    showExtra.value = !showExtra.value;
    showExtra.value === false && resetExtra();
  };

  const resetExtra = () => {
    showExtra.value = false;
    extra_1_text.value = '';
    extra_1_list.value = [];
    extra_1_field.value = false;
    extra_2_text.value = '';
    extra_2_list.value = [];
    extra_2_field.value = false;
    form.groupScoreOther1 = '';
    form.groupScoreOther2 = '';
    form.scoreExtra2Count = 0;
  };
  const clearScoreStandard = () => {
    form.groupScoreDetailId = '';
    scoreDetailText.value = '';
  };
  //  赋分分数确认
  const onScoreDetailConfirm = async ({ selectedOptions }: PickerOption) => {
    resetExtra();
    const lastOne = last(selectedOptions) as any;
    form.optionMultiFlag = lastOne.optionMultiFlag;
    form.groupScoreDetailId = selectedOptions.map((option: PickerOption) => option.id).join(',');
    scoreDetailText.value = selectedOptions.map((option: PickerOption) => option.text).join('/');

    try {
      const { data } = await listOption({
        mainId: groupScoreMainId.value,
        parentId: lastOne.id
      });

      extra_1_list.value = data;
      if (data.length > 0) {
        showExtra.value = true;
        extra_1_field.value = true;
      }
    } catch (e) {
      console.error(e);
    } finally {
      showScoreDetail.value = false;
    }
  };
  // 额外加分1下拉框
  const extra_1_field = ref(false);
  const extra_1_pop = ref(false);
  const extra_1_text = ref('');
  const extra_1_list = ref<[]>();
  const extra_1_confirm = async ({ selectedOptions }: PickerOption) => {
    const lastOne = last(selectedOptions) as any;
    form.groupScoreOther1 = selectedOptions[0].id;
    extra_1_text.value = selectedOptions[0].text;
    try {
      const { data } = await listOption({
        mainId: groupScoreMainId.value,
        parentId: lastOne.id
      });
      extra_2_list.value = data;
      if (data.length > 0) {
        extra_2_field.value = true;
      } else {
        form.groupScoreOther2 = '';
        form.scoreExtra2Count = 0;
        extra_2_text.value = '';
        extra_2_list.value = [];
        extra_2_field.value = false;
      }
    } catch (e) {
      console.error(e);
    } finally {
      extra_1_pop.value = false;
    }
  };
  // 额外加分2下拉框
  const extra_2_field = ref(false);
  const extra_2_pop = ref(false);
  const extra_2_text = ref('');
  const extra_2_list = ref<[]>();
  const extra_2_confirm = ({ selectedOptions }: PickerOption) => {
    form.groupScoreOther2 = selectedOptions[0].id;
    extra_2_text.value = selectedOptions[0].text;
    extra_2_pop.value = false;
  };

  const getTreeOptions = async () => {
    try {
      // 获取赋分依据级联下拉框
      loading.value = true;
      const { data } = await listStandCascadeList({
        type: type,
        operaType: ''
      });
      groupScoreMainId.value = data.mainId;
      form.groupScoreMainId = data.mainId;
      scoreOption.value = rmEmptyChildren(data.data);
    } finally {
      loading.value = false;
    }
  };

  const onSubmit = async () => {
    form.id = id as string;
    form.groupScoreCount = form.scoreCount == 1 ? 1 : 0;
    let { code, msg } = await submitToGroupNew(form);
    if (code === 200) {
      showSuccessToast(msg || '提交成功');
      router.go(-1);
      emitter.emit('refresh');
    }
  };

  onBeforeMount(() => {
    getTreeOptions();
  });
</script>
<template>
  <section class="container">
    <van-form input-align="left" @submit="onSubmit">
      <van-cell-group inset>
        <!-- 赋分依据 -->
        <van-field
          required
          v-model="scoreDetailText"
          is-link
          clearble
          label="赋分依据"
          placeholder="请选择赋分依据"
          autocomplete="off"
          @clear="clearScoreStandard"
          @click="showScoreDetail = true"
          :rules="[{ required: true, message: '请选择赋分依据' }]"
        />
        <van-popup v-model:show="showScoreDetail" round position="bottom">
          <van-cascader :closeable="false" title="赋分依据" :options="scoreOption" :field-names="fieldNames" @finish="onScoreDetailConfirm" />
        </van-popup>
        <!-- 额外附加分 -->
        <van-cell clickable title="" @click="toggle" v-if="extra_1_field">
          <template #value>
            <div class="flex gap-2 justify-end items-center">
              <span>额外加分项</span>
              <van-checkbox v-model="showExtra" icon-size="16px" @click.stop />
            </div>
          </template>
        </van-cell>
        <!-- 额外加分项1 -->
        <van-field
          v-if="extra_1_field && showExtra"
          v-model="extra_1_text"
          is-link
          readonly
          label="额外加分项1"
          placeholder="请选择额外加分项1"
          @click="extra_1_pop = true"
        />
        <van-popup v-model:show="extra_1_pop" round position="bottom">
          <van-picker
            :columns="extra_1_list"
            :columns-field-names="{ text: 'text', value: 'id' }"
            teleport="body"
            @confirm="extra_1_confirm"
            @cancel="extra_1_pop = false"
          />
        </van-popup>
        <!-- 额外加分项2 -->
        <van-field
          v-if="extra_2_field && showExtra"
          v-model="extra_2_text"
          is-link
          readonly
          label="额外加分项2"
          placeholder="请选择额外加分项2"
          @click="extra_2_pop = true"
        />
        <van-popup v-model:show="extra_2_pop" round position="bottom">
          <van-picker
            :columns="extra_2_list"
            :columns-field-names="{ text: 'text', value: 'id' }"
            teleport="body"
            @confirm="extra_2_confirm"
            @cancel="extra_2_pop = false"
          />
        </van-popup>
      </van-cell-group>

      <van-button class="my-4" round block type="success" native-type="submit"> 提交 </van-button>
    </van-form>
  </section>
</template>

<style lang="scss" scoped></style>
