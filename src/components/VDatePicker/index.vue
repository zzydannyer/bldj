<template>
  <van-field
    v-model="picked_text"
    is-link
    readonly
    :label="label"
    :disabled="disabled"
    :placeholder="placeholder"
    :required="required"
    :rules="rules"
    @click="show = true"
  />
  <van-popup v-model:show="show" position="bottom" teleport="body">
    <van-date-picker
      v-model="picked"
      :title="label"
      :min-date="minDate"
      :max-date="maxDate"
      :formatter="formatter"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </van-popup>
</template>

<script setup lang="ts">
  import { FieldRule, PickerOption } from 'vant';
  import { formatDate, joinDate, _5_years_ago, _10_years_future } from '@/utils/date';

  defineOptions({
    name: 'VDatePicker'
  });

  const show = ref(false);
  const modelValue = defineModel<string>();
  const picked = ref<string[]>([]);
  const picked_text = computed(() => {
    if (!modelValue.value) return '';
    return formatDate(modelValue.value);
  });

  const {
    disabled = false,
    label = '日期选择',
    required = false,
    rules,
    maxDate = _10_years_future,
    minDate = _5_years_ago,

    placeholder
  } = defineProps({
    disabled: Boolean,
    rules: Array as PropType<FieldRule[]>,
    label: String,
    required: Boolean,
    minDate: Date,
    placeholder: String,
    maxDate: Date
  });
  const onConfirm = () => {
    modelValue.value = picked.value.join('-');
    show.value = false;
  };

  const onCancel = () => {
    show.value = false;
    if (!modelValue.value) return;
    picked.value = modelValue.value.split('-');
  };

  // 日期格式化
  const formatter = (type: string, option: PickerOption) => {
    if (type === 'year') option.text += '年';
    if (type === 'month') option.text += '月';
    if (type === 'day') option.text += '日';
    return option;
  };
</script>

<style scoped></style>
