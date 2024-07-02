<script setup lang="ts" generic="T extends Numeric">
  import { isUndefined } from 'lodash';
  import {
    FieldRule,
    PickerOption,
    FieldProps,
    PickerColumn,
    PickerProps
  } from 'vant';
  defineOptions({
    name: 'VPicker'
  });

  const modelValue = defineModel<T>({
    type: [String, Number] as unknown as PropType<T>,
    default: null
  });

  const props = defineProps([
    'label',
    'placeholder',
    'disabled',
    'required',
    'rules',
    'columns',
    'columnsFieldNames',
    'labelAlign',
    'inputAlign',
    'readonly',
    'visibleOptionNum'
  ]);

  const fieldProps = computed(() => {
    return {
      label: props.label,
      labelAlign: props.labelAlign,
      placeholder: props.placeholder,
      disabled: props.disabled,
      required: props.required,
      rules: props.rules,
      inputAlign: props.inputAlign
    };
  });
  const pickerProps = computed(() => {
    return {
      columns: props.columns,
      columnsFieldNames: props.columnsFieldNames,
      labelAlign: props.labelAlign,
      inputAlign: props.inputAlign,
      visibleOptionNum: props.visibleOptionNum
    };
  });

  const emits = defineEmits(['confirm']);

  const show = ref(false);

  const pickedCollect = ref<T[]>();

  watch(
    () => modelValue.value,
    (val) => {
      if (val) {
        pickedCollect.value = [val];
      } else {
        pickedCollect.value = [];
      }
    }
  );

  const pickedText = computed(() => {
    const text: string = props.columnsFieldNames?.text ?? 'text';
    const value: string = props.columnsFieldNames?.value ?? 'value';
    for (const column of props.columns) {
      const cur = column[value] as T;
      if (cur == modelValue.value) {
        return column[text] as string;
      }
    }
  });

  function onConfirm({ selectedOptions }: PickerOption) {
    if (!pickedCollect.value || !pickedCollect.value.length) {
      return;
    }
    const [pickedValue] = pickedCollect.value;

    if (pickedValue === undefined) {
      return;
    }

    modelValue.value = pickedValue;
    emits('confirm');
    show.value = false;
  }
  function onClick() {
    // if (!isUndefined(props.readonly) || !isUndefined(props.disabled)) {
    //   return;
    // }
    show.value = true;
  }
  function onCancel() {
    show.value = false;
    pickedCollect.value = modelValue.value ? [modelValue.value] : [];
  }
</script>
<template>
  <van-field
    is-link
    readonly
    v-model="pickedText"
    v-bind="fieldProps"
    @click="onClick"
  />
  <van-popup round v-model:show="show" position="bottom" teleport="body">
    <van-picker
      teleport="body"
      v-model="pickedCollect"
      @confirm="onConfirm"
      @cancel="onCancel"
      v-bind="pickerProps"
    />
  </van-popup>
</template>
