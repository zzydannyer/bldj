<template>
  <van-tag
    :class="border ? 'v-plain-tag' : ''"
    :closeable="closeable"
    :color="color"
    :mark="mark"
    :plain="plain"
    :round="round"
    :size="size"
    :text-color="textColor ?? TextColor[type]"
    :type="type"
  >
    {{ label }}
  </van-tag>
</template>

<script setup lang="ts">
  import type { Dict } from '@/api/dict';
  import type { TagProps } from 'vant';
  import { useGlobal } from '@/utils';
  import { BorderColor, BgColor, TextColor } from '@/constants';

  defineOptions({
    name: 'VTag'
  });
  const { $parseDict } = useGlobal<GlobalPropertiesApi>();

  type Props = TagProps & {
    dictData: Dict[];
    value: string;
    tagClass: string;
    border: boolean;
  };
  const props = withDefaults(defineProps<Props>(), {
    tagClass: '',
    dictData: () => [],
    value: '',
    type: 'primary',
    border: false,
    closeable: false,
    mark: false,
    plain: false,
    round: false,
    size: 'medium'
  });

  const label = computed(() => {
    return $parseDict(props.dictData, props.value);
  });
  
  const borderColor = computed(() => BorderColor[props.type]);
  const color = computed(() => props.color ?? BgColor[props.type]);
</script>

<style>
  .van-tag + .van-tag {
    margin-left: 5px;
  }

  .v-plain-tag {
    border: 1px solid v-bind(borderColor);
  }
</style>
