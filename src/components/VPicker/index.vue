<script setup lang="ts" generic="T extends string | number">
  import { debounce } from 'lodash';
  import { FieldRule, PickerOption } from 'vant';
  import { PropType } from 'vue';

  defineOptions({
    name: 'VPicker'
  });

  const show = ref(false);
  const modelValue = defineModel<T>();
  const picked = ref<T[]>();

  watch(
    () => modelValue.value,
    (val) => {
      picked.value = [val!];
    }
  );
  const picked_text = computed(() => columns.find((i) => i[value.value] === modelValue.value)?.[text.value]);

  // ****************************************************************************************************
  const searchVal = ref('');
  const filterColumns = ref<any[]>([]);
  watch(
    () => searchVal.value,
    debounce((val) => {
      if (val) {
        filterColumns.value = columns.filter((i) => i[text.value].includes(val));
      } else {
        filterColumns.value = columns;
      }
    }, 500),
    { immediate: true }
  );

  // ****************************************************************************************************
  const {
    columns = [
      { text: '单选框 a', value: 'a' },
      { text: '单选框 b', value: 'b' },
      { text: '单选框 c', value: 'c' }
    ],
    disabled = false,
    label = '单选框',
    required = false,
    rules,
    name,
    placeholder,
    showSearch = false,
    searchPlaceholder = '请输入搜索关键词',
    visibleOptionNum = 6,
    columnsFieldNames = {
      text: 'text',
      value: 'value'
    }
  } = defineProps({
    columns: Array as PropType<any[]>,
    max: Number,
    disabled: Boolean,
    rules: Array as PropType<FieldRule[]>,
    label: String,
    required: Boolean,
    name: String,
    placeholder: String,
    showSearch: Boolean,
    searchPlaceholder: String,
    visibleOptionNum: Number,
    columnsFieldNames: Object as PropType<{ text: string; value: string }>
  });

  const text = computed(() => columnsFieldNames.text);
  const value = computed(() => columnsFieldNames.value);

  const emits = defineEmits(['confirm']);
  const onConfirm = ({ selectedOptions }: PickerOption) => {
    modelValue.value = picked.value![0];
    emits('confirm');
    show.value = false;
  };

  const onCancel = () => {
    show.value = false;
    picked.value = [modelValue.value!];
  };
</script>
<template>
  <van-field
    v-model="picked_text"
    is-link
    :name="name"
    readonly
    :label="label"
    :placeholder="placeholder"
    :disaled="disabled"
    :required="required"
    :rules="rules"
    input-align="right"
    @click="show = true"
  />
  <van-popup round v-model:show="show" position="bottom" teleport="body">
    <van-picker
      v-model="picked"
      :columns="filterColumns"
      teleport="body"
      @confirm="onConfirm"
      @cancel="onCancel"
      :columns-field-names="columnsFieldNames"
      :visible-option-num="visibleOptionNum"
    >
      <template #title>
        <van-search class="flex-1" v-if="showSearch" v-model="searchVal" :placeholder="searchPlaceholder" left-icon="" @click.stop />
      </template>
    </van-picker>
  </van-popup>
</template>
