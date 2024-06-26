<template>
  <van-popup
    v-model:show="show"
    position="right"
    :style="{ width: '90%', height: '100%' }"
  >
    <van-cell-group class="van-safe-area-top" inset>
      <!-- 媒体标题 -->
      <van-field
        v-model="text"
        input-align="left"
        label="媒体标题"
        label-align="top"
      />
      <!-- 作者 -->
      <van-field
        v-model="text"
        input-align="left"
        label="作者"
        label-align="top"
      />
      <!-- 公司 -->
      <van-field
        v-model="text"
        input-align="left"
        label="公司"
        label-align="top"
        @click="showSelect = true"
      />
      <!-- 素材类别 -->
      <van-field
        v-model="result"
        input-align="left"
        is-link
        label="素材类别"
        label-align="top"
        name="picker"
        placeholder="点击选择素材类别"
        readonly
        @click="showPicker = true"
      />

      <van-checkbox-group
        v-model="checked"
        class="pt-5 pl-4"
        direction="horizontal"
      >
        <van-checkbox name="优秀资源">优秀资源</van-checkbox>
        <van-checkbox name="推荐资源">推荐资源</van-checkbox>
      </van-checkbox-group>

      <div class="grid gap-3 grid-cols-2 px-4 mt-10">
        <van-button block class="greybutton" to="index" type="default"
          >重置</van-button
        >
        <van-button block class="button" to="index" type="primary"
          >确认</van-button
        >
      </div>
    </van-cell-group>
  </van-popup>

  <van-popup v-model:show="showPicker" position="bottom">
    <van-picker
      :columns="columns"
      @cancel="showPicker = false"
      @confirm="onConfirm"
    />
  </van-popup>
</template>

<script setup lang="ts">
  const show = defineModel('show', { default: false });
  const result = ref('');
  const checked = ref([]);
  const showPicker = ref(false);
  const columns = [
    { text: '党建活动', value: 'Hangzhou' },
    { text: '时政动态', value: 'Ningbo' },
    { text: '经营纵横', value: 'Wenzhou' },
    { text: '企业文化', value: 'Shaoxing' },
    { text: '工作场景', value: 'Huzhou' }
  ];
  const showSelect = ref(false);
  const onConfirm = ({ selectedOptions }) => {
    result.value = selectedOptions[0]?.text;
    showPicker.value = false;
  };
</script>

<style lang="scss" scoped>
  .button {
    @apply font-bold;
    --van-button-primary-background: #e22001;
    --van-button-primary-border-color: #e22001;
  }
  .greybutton {
    --van-button-default-background: #e8e8e8;
    --van-button-default-border-color: #e8e8e8;
  }
  .grid {
    @apply bg-white pt-3.5;
    .sub-content {
      @apply p-2 border-solid border-gray-200 rounded border mb-1 text-sm;
    }
    .text2 {
      @apply text-xs;
    }
  }
</style>
