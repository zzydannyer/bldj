<template>
  <div class="pb-64">
    <van-popup
      v-model:show="show"
      position="right"
      :style="{ width: '90%', height: '100%' }"
    >
      <van-cell-group inset>
        <!-- 标题 -->
        <van-field
          v-model="text"
          input-align="left"
          label="标题"
          label-align="top"
        />

        <!-- 发布日期 -->
        <van-field
          v-model="result"
          is-link
          label="发布日期"
          name="datePicker"
          placeholder="请选择发布日期"
          readonly
          @click="showreleasePicker = true"
        />

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

    <van-popup v-model:show="showreleasePicker" position="bottom">
      <van-date-picker
        @cancel="showreleasePicker = false"
        @confirm="onrleaseConfirm"
      />
    </van-popup>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  const result = ref('');
  const checked = ref([]);

  const columns = [
    { text: '党建活动', value: 'Hangzhou' },
    { text: '时政动态', value: 'Ningbo' },
    { text: '经营纵横', value: 'Wenzhou' },
    { text: '企业文化', value: 'Shaoxing' },
    { text: '工作场景', value: 'Huzhou' }
  ];

  const onConfirm = ({ selectedOptions }) => {
    result.value = selectedOptions[0]?.text;
    showPicker.value = false;
  };

  const showreleasePicker = ref(false);
  const onreleaseConfirm = ({ selectedValues }) => {
    result.value = selectedValues.join('/');
    showreleasePicker.value = false;
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
