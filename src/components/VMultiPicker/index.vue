<script setup lang="ts">
  import { debounce, isArray } from 'lodash';
  import { FieldRule, CheckboxInstance } from 'vant';
  import { PropType } from 'vue';
  // import InfiniteList from 'vue3-infinite-list'

  defineOptions({
    name: 'VMultiPicker'
  });

  // ****************************************************************************************************
  const checked_text = computed({
    get: () => modelValue.value?.join(),
    set: () => {}
  });
  const show = ref(false);
  const modelValue = defineModel<Array<Numeric>>();
  const checked = ref<Array<Numeric>>([]);

  // ****************************************************************************************************
  // props
  const {
    columns = [
      { text: '复选框 a', value: 'a' },
      { text: '复选框 b', value: 'b' },
      { text: '复选框 c', value: 'c' }
    ],
    max = 100,
    disabled = false,
    label = '多选框',
    required = false,
    rules,
    placeholder,
    showSearch = false,
    searchPlaceholder,
    searchshow = true,
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
    placeholder: String,
    showSearch: Boolean,
    searchPlaceholder: String,
    searchshow: Boolean,
    columnsFieldNames: Object as PropType<{ text: string; value: string }>
  });

  const text = computed(() => columnsFieldNames.text);
  const value = computed(() => columnsFieldNames.value);

  // ****************************************************************************************************
  const onConfirm = () => {
    modelValue.value = checked.value;
    show.value = false;
  };
  const onCancel = () => {
    checked.value = modelValue.value!;
    show.value = false;
  };
  const onClear = () => {
    checked.value = [];
  };

  watch(
    () => modelValue.value,
    (val) => {
      if (isArray(val) && val.length > 0) checked.value = val;
    },
    { immediate: true }
  );

  const checkboxRefs = ref<CheckboxInstance[]>([]);

  const toggle = (index: number) => {
    checkboxRefs.value[index].toggle();
  };

  const searchVal = ref('');
  const infiniteList = ref<any[]>([]);

  // 强制更新虚拟列表
  const forceUpdate = ref(0);
  watch(
    () => searchVal.value,
    debounce((val) => {
      if (val) {
        infiniteList.value = columns.filter((i) => i[text.value].includes(val));
      } else {
        infiniteList.value = columns;
      }
      forceUpdate.value++;
    }, 500),
    { immediate: true }
  );

  onBeforeUpdate(() => {
    checkboxRefs.value = [];
  });
</script>
<template>
  <van-field
    :required="required"
    v-model="checked_text"
    is-link
    readonly
    :label="label"
    @click="show = true"
    :rules="rules"
    :disabled="disabled"
  >
    <template #input>
      <v-plain-tag size="large" type="primary" v-if="modelValue!?.length > 0">
        {{ columns.find((i) => i[value] === modelValue![0])?.[text] }}
      </v-plain-tag>
      <v-plain-tag size="large" type="primary" v-if="modelValue!?.length > 1">
        +{{ modelValue!?.length - 1 }}
      </v-plain-tag>
      <span
        v-if="modelValue!?.length === 0 || !modelValue"
        style="color: var(--van-gray-5)"
      >
        {{ placeholder }}
      </span>
    </template>
  </van-field>

  <van-popup v-model:show="show" round position="bottom" teleport="body">
    <div class="van-picker__toolbar">
      <button
        type="button"
        class="van-picker__cancel van-haptics-feedback"
        @click="onCancel"
      >
        取消
      </button>
      <van-search
        class="p-0 flex-1"
        v-show="searchshow"
        v-model="searchVal"
        :placeholder="searchPlaceholder"
        left-icon=""
        @click.stop
      />
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
    </div>

    <van-divider style="margin: 0"></van-divider>
    <section class="bg-blue-100">
      <div
        v-if="checked.length"
        style="padding: var(--van-cell-vertical-padding) var(--van-padding-md)"
      >
        <van-text-ellipsis
          rows="1"
          :content="
            checked
              .map((id) => columns.find((i) => i[value] === id)?.[text])
              .join('，')
          "
          :expand-text="`共${checked.length}人`"
          collapse-text="收起"
        />
      </div>
    </section>
    <van-divider style="margin: 0"></van-divider>

    <van-checkbox-group v-model="checked" :max="max" style="min-height: 500px">
      <van-cell-group>
        <!-- <InfiniteList
          :data="infiniteList"
          :width="'100%'"
          :height="500"
          :itemSize="44"
          v-slot="{ item, index }"
          :key="forceUpdate"
        > -->
        <van-cell
          clickable
          :key="index"
          :title="item[text]"
          @click="toggle(index)"
        >
          <template #right-icon>
            <van-checkbox
              :name="item[value]"
              :ref="(el: any) => (checkboxRefs[index] = el)"
              label-position="left"
              icon-size="16px"
              @click.stop
            />
          </template>
        </van-cell>
        <!-- </InfiniteList> -->
        <!-- <van-cell clickable v-for="(column, index) in columns" :key="index" :title="column[text]"
                    @click="toggle(index)">
                    <template #right-icon>
                        <van-checkbox :name="column[value]" :ref="((el: any) => checkboxRefs[index] = el)"
                            label-position="left" icon-size="16px" @click.stop />
                    </template>
                </van-cell> -->
      </van-cell-group>
    </van-checkbox-group>
  </van-popup>
</template>
<style scoped>
  .van-checkbox-group {
    max-height: 40vh;
    overflow-y: auto;
  }
</style>
