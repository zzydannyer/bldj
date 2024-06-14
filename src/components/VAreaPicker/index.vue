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
  />
  <van-popup round v-model:show="show" position="bottom" teleport="body">
    <van-picker
      v-model="picked"
      :columns="columns"
      teleport="body"
      @confirm="onConfirm"
      @cancel="onCancel"
      :columns-field-names="columnsFieldNames"
      :visible-option-num="visibleOptionNum"
    />
  </van-popup>
</template>

<script setup lang="ts">
  import { FieldRule, PickerOption } from 'vant'
  import { PropType } from 'vue'
  defineOptions({
    name: 'VAreaPicker',
  })
  const show = ref(false)
  const modelValue = defineModel<string>()
  const picked = ref<string[]>()
  const picked_text = computed(() =>
    modelValue.value ? codeToName(modelValue.value) : ''
  )

  const {
    columns = [],
    disabled = false,
    label = '单选框',
    required = false,
    rules,
    placeholder,
    visibleOptionNum = 6,
    columnsFieldNames = {
      text: 'text',
      value: 'value',
    },
  } = defineProps({
    columns: Array as PropType<any[]>,
    max: Number,
    disabled: Boolean,
    rules: Array as PropType<FieldRule[]>,
    label: String,
    required: Boolean,
    placeholder: String,
    visibleOptionNum: Number,
    columnsFieldNames: Object as PropType<{
      text?: string
      value?: string
      children?: string
    }>,
  })

  const onConfirm = ({ selectedOptions }: PickerOption) => {
    modelValue.value = arrToCode(picked.value!)
    show.value = false
  }

  const onCancel = () => {
    show.value = false
    picked.value = [modelValue.value!]
  }
</script>

<style scoped></style>
