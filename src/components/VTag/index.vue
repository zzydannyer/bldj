<template>
  <van-tag
    :class="border ? 'v-plain-tag' : ''"
    :closeable="closeable"
    :color="bg_color[_type]"
    :mark="mark"
    :plain="plain"
    :round="round"
    :size="size"
    :text-color="textColor ?? text_color[_type]"
    :type="_type"
  >
    {{ labelValue?.label }}
  </van-tag>
</template>

<script setup lang="ts">
  import type { DictData } from '@/plugins/dict';
  import type { TagSize, TagType, TagProps } from 'vant';
  import type { PropType } from 'vue';
  import { useGlobal } from '@/utils';
  import { border_color, bg_color, text_color } from '@/constants';

  defineOptions({
    name: 'VTag'
  });
  const { $value_to_label, $value_to_dict } = useGlobal<GlobalPropertiesApi>();

  const {
    dictData = [],
    value = '',
    border = true,
    type
  } = defineProps({
    // 数据
    dictData: Object as PropType<DictData[]>,
    // 当前的值
    value: String as PropType<string>,
    tagClass: String as PropType<string>,
    type: String as PropType<TagType>,
    size: String as PropType<TagSize>,
    mark: Boolean as PropType<TagProps['mark']>,
    plain: Boolean as PropType<TagProps['plain']>,
    round: Boolean as PropType<TagProps['round']>,
    color: String as PropType<TagProps['color']>,
    textColor: String as PropType<TagProps['textColor']>,
    closeable: Boolean as PropType<TagProps['closeable']>,
    border: Boolean as PropType<boolean>
  });

  const labelValue = computed(() => $value_to_dict(dictData, value));
  const _type = computed(
    () => labelValue.value?.elTagType || type || 'primary'
  );
  const borderColor = computed(() => border_color[_type.value]);
</script>

<style>
  .van-tag + .van-tag {
    margin-left: 5px;
  }

  .v-plain-tag {
    border: 1px solid v-bind(borderColor);
  }
</style>
