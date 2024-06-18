<script setup lang="ts" generic="T extends string | number">
  import { FieldRule, PickerOption } from 'vant';
  import { PropType } from 'vue';

  defineOptions({
    name: 'VCascader'
  });

  const show = ref(false);
  const modelValue = defineModel<T>();
  const picked = ref<T>();

  /**
   * @description 展平children数组
   * @param arr
   */
  const flatFn = (arr: any[]) => {
    const result: any[] = [];

    function flattenHelper(arr: any[]) {
      for (const item of arr) {
        result.push(item);
        if (item.children && item.children.length > 0) {
          flattenHelper(item.children);
        }
      }
    }

    flattenHelper(arr);
    return result;
  };

  const flatOption = computed(() => flatFn(options));
  const picked_text = computed(() => {
    return flatOption.value.find((i) => i[value.value] === modelValue.value)?.[text.value];
  });

  watch(
    () => modelValue.value,
    (val) => {
      if (val) {
        picked.value = val;
      }
    }
  );

  const {
    options = [],
    disabled = false,
    label = '单选框',
    required = false,
    rules,
    placeholder,
    fieldNames = {
      text: 'text',
      value: 'value'
    }
  } = defineProps({
    options: Array as PropType<any[]>,
    disabled: Boolean,
    rules: Array as PropType<FieldRule[]>,
    label: String,
    required: Boolean,
    placeholder: String,
    fieldNames: Object as PropType<{ text: string; value: string }>
  });

  const text = computed(() => fieldNames.text);
  const value = computed(() => fieldNames.value);

  const onFinish = ({ selectedOptions }: PickerOption) => {
    modelValue.value = picked.value;
    show.value = false;
    emits('finish', selectedOptions);
  };

  const emits = defineEmits(['update:modelValue', 'clear', 'finish']);
</script>

<template>
  <van-field
    v-model="picked_text"
    is-link
    readonly
    :label="label"
    :placeholder="placeholder"
    :disaled="disabled"
    :required="required"
    :rules="rules"
    @click="show = true"
    @clear="emits('clear')"
  />
  <van-popup round v-model:show="show" position="bottom" teleport="body">
    <van-cascader v-model="picked" :title="label" :closeable="false" :options="options" :field-names="fieldNames" @finish="onFinish" />
  </van-popup>
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
