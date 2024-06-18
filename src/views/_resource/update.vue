<script setup lang="ts">
  import useResource from './hooks';
  const { columns, form, onSubmit, getPuliclist } = useResource();
  onBeforeMount(getPuliclist);
</script>

<template>
  <section class="container">
    <van-form input-align="left" @submit="onSubmit">
      <van-cell-group inset>
        <!-- 公共资源标题 -->
        <van-field
          required
          v-model="form.resTitle"
          label="资源标题"
          placeholder="请输入公共资源标题"
          :rules="[{ required: true, message: '请输入公共资源标题' }]"
        />
        <van-field name="switch" label="主页显示">
          <template #input>
            <van-switch v-model="form.isHomeShow" active-value="1" inactive-value="0" size="14px" />
          </template>
        </van-field>
        <van-field name="switch" label="是否置顶">
          <template #input>
            <van-switch v-model="form.isTop" active-value="1" inactive-value="0" size="14px" />
          </template>
        </van-field>
        <van-field label="排列序号" placeholder="请选择排列序号">
          <template #input>
            <van-stepper v-model="form.orderNumber" min="0" />
          </template>
        </van-field>

        <v-picker
          required
          :rules="[{ required: true, message: '请选择资源类型' }]"
          v-model="form.fileType"
          :columns="columns"
          label="资源类型"
          placeholder="请选择资源类型"
          @confirm="form.mediaList = []"
        />

        <!-- 普通附件 -->
        <van-field label="普通附件" required :rules="[{ required: true, message: '请上传普通附件' }]" v-if="form.fileType == '1'">
          <template #input>
            <v-uploader :max-count="1" :max-size="50 * 1024 * 1024" v-model="form.mediaList" url="oss" type="file" />
          </template>
        </van-field>
        <!-- 视频素材 -->
        <van-field label="视频素材" required :rules="[{ required: true, message: '请上传视频素材' }]" v-if="form.fileType == '3'">
          <template #input>
            <v-uploader :max-count="1" url="oss" v-model="form.mediaList" type="video" />
          </template>
        </van-field>
        <!-- 图片素材 -->
        <van-field label="图片素材" required :rules="[{ required: true, message: '请上传图片素材' }]" v-if="form.fileType == '2'">
          <template #input>
            <v-uploader :max-count="1" url="oss" v-model="form.mediaList" type="image" />
          </template>
        </van-field>
      </van-cell-group>
      <van-button class="my-4" round block type="success" native-type="submit"> 提交 </van-button>
    </van-form>
  </section>
</template>
