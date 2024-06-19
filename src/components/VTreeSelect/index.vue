<script setup lang="ts" generic="T extends User | User[]">
  import { TreeNode, User, IUser } from './type.d';
  import { FieldRule, FieldProps, FieldTextAlign } from 'vant';
  import { PropType } from 'vue';
  import MyTreeSelect from './treeSelect.vue';
  import { isObject } from 'lodash';
  import { getUserInfo } from '@/api/_system/org';

  defineOptions({
    name: 'VTreeSelect'
  });

  const show = ref(false);
  const modelValue = defineModel<T>();
  const picked = ref<IUser | IUser[]>();

  watch(
    () => modelValue.value,
    (val) => (picked.value = transformData(val, multiple, true))
  );

  const picked_text = ref('');
  watchEffect(async () => {
    if (modelValue.value) {
      const userIds = modelValue.value.map((item) => item.userId).join(',');
      const data = await getUserInfoByIds(userIds);
      picked_text.value = data.map((item) => item.userName).join(',');
    }
    // if (Array.isArray(modelValue.value)) {
    //   const userIds = modelValue.value.map((item) => item.userId).join(',')
    //   const data = await getUserInfoByIds(userIds)
    //   picked_text.value = data.map((item) => item.userName).join(',')
    // } else {
    //   // 处理modelValue.value不是数组的情况
    // }
  });

  // const picked_text = computed(async () => {
  //   if (Array.isArray(modelValue.value)) {
  //     const userIds = modelValue.value.map((item) => (item as User).userId).join(',')
  //     console.log(userIds)
  //     const data = await getUserInfoByIds(userIds)
  //
  //     console.log(data.map((item) => (item as User).userName).join(','))
  //     return data.map((item) => (item as User).userName).join(',')
  //   }
  //   // return (modelValue.value as User)?.userName
  // })

  function getUserInfoByIds(linkId: number[]) {
    // getUserInfo(linkId)
    return new Promise((resolve) => {
      if (linkId) {
        getUserInfo(linkId).then((resp) => {
          resolve(resp.data);
        });
      } else {
        resolve('');
      }
    });
  }

  const {
    disabled = false,
    label = '',
    required = false,
    rules,
    name,
    placeholder,
    readonly = false,
    inputAlign = 'right',
    labelAlign = 'left',
    multiple = false
  } = defineProps({
    columns: Array as PropType<any[]>,
    max: Number,
    disabled: Boolean,
    rules: Array as PropType<FieldRule[]>,
    label: String,
    required: Boolean,
    readonly: Boolean,
    name: String,
    inputAlign: String as PropType<FieldTextAlign>,
    labelAlign: String as PropType<FieldTextAlign>,
    placeholder: String,
    showSearch: Boolean,
    visibleOptionNum: Number,
    columnsFieldNames: Object as PropType<{ text: string; value: string }>,
    multiple: Boolean
  });

  function transformData(
    input: any,
    multiple: boolean,
    toPicked: boolean
  ): any {
    const val = input as any;
    if (input && isObject(input)) {
      if (multiple) {
        return val.map((item: any) =>
          toPicked
            ? { id: item?.userId, label: item?.userName }
            : { userId: item?.id, userName: item?.label }
        );
      } else {
        return toPicked
          ? { id: val?.userId, label: val?.userName }
          : { userId: val?.id, userName: val?.label };
      }
    }
    return input;
  }

  const emits = defineEmits(['confirm']);
  const onConfirm = () => {
    // console.log(picked.value);
    // console.log(transformData(picked.value, true, false))

    // const [name] = transformData(picked.value, true, false).userName.split('-');
    // const newData = { userId: transformData(picked.value, multiple, false).userId, userName: name };
    modelValue.value = transformData(picked.value, true, false);
    // console.log(modelValue.value);
    //
    emits('confirm');
    show.value = false;
  };

  const onCancel = () => {
    show.value = false;
    picked.value = transformData(modelValue.value, true, true);
  };

  const onClear = () => {
    picked.value = undefined;
  };

  function handleOpen() {
    if (disabled || readonly) return;
    show.value = true;
  }
</script>

<template>
  <van-field
    v-model="picked_text"
    is-link
    :clickable="!disabled && !readonly"
    :name="name"
    :readonly="readonly"
    :label="label"
    :placeholder="placeholder"
    :disaled="disabled"
    :required="required"
    :rules="rules"
    :input-align="inputAlign"
    :label-align="labelAlign"
    @click="handleOpen"
  />
  <van-popup round v-model:show="show" position="bottom" teleport="body">
    <section class="van-picker__toolbar">
      <button
        type="button"
        class="van-picker__cancel van-haptics-feedback"
        @click="onCancel"
      >
        取消
      </button>
      <div
        class="w-[240px] overflow-ellipsis overflow-hidden whitespace-nowrap"
      >
        {{ picked?.label }}
      </div>
      <div>
        <button
          type="button"
          class="van-picker__confirm"
          style="color: var(--van-red); padding-right: 0"
          @click="onClear"
        >
          清空
        </button>
        <button
          type="button"
          class="van-picker__confirm van-haptics-feedback"
          @click="onConfirm"
        >
          确认
        </button>
      </div>
    </section>

    <section class="p-[16PX] h-[400PX] overflow-auto">
      <MyTreeSelect
        v-model="picked"
        v-bind="$attrs"
        :multiple="multiple"
        :placeholder="placeholder"
      />
    </section>
  </van-popup>
</template>
