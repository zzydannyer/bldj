<template>
  <div class="pb-64">
    <van-cell-group inset class="mt-4">
      <!-- 媒体标题 -->
      <van-field
        v-model="text"
        label="媒体标题"
        placeholder="请输入"
        input-align="left"
        label-align="top"
        required
        :rules="[{ required: true, message: '请输入标题' }]"
      />
    </van-cell-group>

    <van-cell-group inset class="mt-4">
      <!-- 作者 -->
      <van-field
        v-model="text"
        label="作者"
        placeholder="请输入"
        input-align="right"
        label-align="left"
        required
        :rules="[{ required: true, message: '请输入作者' }]"
      />
      <!-- 公司 -->
      <van-field
        v-model="text"
        label="公司"
        placeholder="请输入"
        input-align="right"
        label-align="left"
      />
      <!-- 素材类别 -->
      <van-field
        v-model="result"
        is-link
        readonly
        label-align="left"
        name="picker"
        label="素材类别"
        placeholder="点击选择素材类别"
        @click="showPicker = true"
        input-align="right"
        required
        :rules="[{ required: true, message: '请输入素材类型' }]"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-picker
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <!-- 联系方式 -->
      <van-field
        v-model="text"
        label="联系方式"
        placeholder="请输入"
        input-align="right"
        label-align="left"
      />

      <!-- 媒体类型 -->
      <van-field
        v-model="result"
        is-link
        readonly
        label-align="left"
        name="picker"
        label="媒体类型"
        placeholder="点击选择媒体类型"
        @click="mediaType = true"
        input-align="right"
        required
        :rules="[{ required: true, message: '请输入媒体类型' }]"
      />
      <van-popup v-model:show="mediaType" position="bottom">
        <van-picker
          :columns="columns2"
          @confirm="onMediaConfirm"
          @cancel="mediaType = false"
        />
      </van-popup>
    </van-cell-group>
    <van-cell-group inset class="mt-4">
      <van-field
        v-model="message"
        rows="2"
        autosize
        label="素材简介"
        type="textarea"
        maxlength="50"
        placeholder="请输入简介"
        show-word-limit
        label-align="top"
        required
        :rules="[{ required: true, message: '请输入素材简介' }]"
      />
    </van-cell-group>
    <van-cell-group inset class="mt-4 pb-4">
      <van-field name="uploader" label="文件上传" label-align="top">
        <template #input>
          <van-uploader v-model="value" />
        </template>
      </van-field>
      <div class="text-xs mt-3 ml-3">限于5张图片每张图片小于2G</div>
    </van-cell-group>
    <div class="grid gap-3 grid-cols-2" style="background-color: transparent">
      <van-button type="default" to="index" class="greybutton" block
        >重置</van-button
      >
      <van-button type="primary" to="index" class="button" block
        >确认</van-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
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

  const onConfirm = ({ selectedOptions }) => {
    result.value = selectedOptions[0]?.text;
    showPicker.value = false;
  };

  const mediaType = ref(false);
  const columns2 = [
    { text: '图片', value: 'Picture' },
    { text: '视频', value: 'Video' }
  ];

  const onMediaConfirm = ({ selectedOptions }) => {
    result.value = selectedOptions[0]?.text;
    mediaType.value = false;
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
    @apply pt-10  px-4;
    .sub-content {
      @apply p-2 border-solid border-gray-200 rounded border mb-1 text-sm;
    }
    .text2 {
      @apply text-xs;
    }
  }
</style>
