<script setup lang="ts">
  const route = useRoute();
  const { uid } = route.params;
</script>

<template>
  <div class="pb-64">
    <van-cell-group class="mt-4" inset>
      <!-- 媒体标题 -->
      <van-field
        v-model="text"
        input-align="left"
        label="媒体标题"
        label-align="top"
        placeholder="请输入"
        required
        :rules="[{ required: true, message: '请输入标题' }]"
      />
    </van-cell-group>

    <van-cell-group class="mt-4" inset>
      <!-- 作者 -->
      <van-field
        v-model="text"
        input-align="right"
        label="作者"
        label-align="left"
        placeholder="请输入"
        required
        :rules="[{ required: true, message: '请输入作者' }]"
      />
      <!-- 公司 -->
      <van-field
        v-model="text"
        input-align="right"
        label="公司"
        label-align="left"
        placeholder="请输入"
      />
      <!-- 素材类别 -->
      <van-field
        v-model="result"
        input-align="right"
        is-link
        label="素材类别"
        label-align="left"
        name="picker"
        placeholder="点击选择素材类别"
        readonly
        required
        :rules="[{ required: true, message: '请输入素材类型' }]"
        @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-picker
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>
      <!-- 联系方式 -->
      <van-field
        v-model="text"
        input-align="right"
        label="联系方式"
        label-align="left"
        placeholder="请输入"
      />

      <!-- 媒体类型 -->
      <van-field
        v-model="result"
        input-align="right"
        is-link
        label="媒体类型"
        label-align="left"
        name="picker"
        placeholder="点击选择媒体类型"
        readonly
        required
        :rules="[{ required: true, message: '请输入媒体类型' }]"
        @click="mediaType = true"
      />
      <van-popup v-model:show="mediaType" position="bottom">
        <van-picker
          :columns="columns2"
          @cancel="mediaType = false"
          @confirm="onMediaConfirm"
        />
      </van-popup>
    </van-cell-group>
    <van-cell-group class="mt-4" inset>
      <van-field
        v-model="message"
        autosize
        label="素材简介"
        label-align="top"
        maxlength="50"
        placeholder="请输入简介"
        required
        rows="2"
        :rules="[{ required: true, message: '请输入素材简介' }]"
        show-word-limit
        type="textarea"
      />
    </van-cell-group>
    <van-cell-group class="mt-4 pb-4" inset>
      <van-field label="文件上传" label-align="top" name="uploader">
        <template #input>
          <van-uploader v-model="value" />
        </template>
      </van-field>
      <div class="text-xs mt-3 ml-3">限于5张图片每张图片小于2G</div>
    </van-cell-group>
    <div class="grid gap-3 grid-cols-2" style="background-color: transparent">
      <van-button block class="greybutton" to="index" type="default"
        >重置</van-button
      >
      <van-button block class="button" to="index" type="primary"
        >确认</van-button
      >
    </div>
  </div>
</template>

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
