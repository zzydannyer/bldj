<script setup lang="ts">
  import MediaServer, { MediaMain } from '@/api/culture/media';
  import Hooks from '@/hooks';
  import { useGlobal } from '@/utils';
  import Constants from '@/constants';

  const route = useRoute();
  const uid = route.params.uid as string;
  const { $parseDict } = useGlobal<GlobalPropertiesApi>();
  const detail = ref<MediaMain>(new MediaMain());
  async function getDetail() {
    const { data } = await MediaServer.GET_MEDIA_MAIN(uid);
    detail.value = data;
  }

  const [categoryOption, getOptions] = Hooks.useCategory();

  onBeforeMount(() => {
    getOptions();
    getDetail();
  });
</script>

<template>
  <van-form readonly>
    <van-cell-group class="mt-4" inset>
      <!-- 媒体标题 -->
      <van-field
        v-model="detail.mediaTitle"
        input-align="left"
        label="媒体标题"
        label-align="top"
      />
    </van-cell-group>

    <van-cell-group class="mt-4" inset>
      <!-- 作者 -->
      <van-field v-model="detail.author" input-align="right" label="作者" />
      <!-- 公司 -->
      <van-field v-model="detail.orgName" input-align="right" label="公司" />
      <!-- 素材类别 -->
      <van-field input-align="right" label="素材类别">
        <template #input>
          {{
            $parseDict(categoryOption, detail.resourceType, {
              text: 'label',
              value: 'id'
            })
          }}
        </template>
      </van-field>
      <!-- <v-picker
        label="素材类别"
        input-align="right"
        v-model="detail.resourceType"
        :columns="categoryOption"
        :columns-field-names="{
          text: 'label',
          value: 'id'
        }"
      /> -->
      <!-- 联系方式 -->
      <van-field v-model="detail.tel" input-align="right" label="联系方式" />

      <!-- 媒体类型 -->
      <van-field
        v-model="detail.mediaType"
        input-align="right"
        label="媒体类型"
      >
        <template #input>
          {{ $parseDict(Constants.MediaTypes, detail.mediaType) }}
        </template>
      </van-field>
    </van-cell-group>
    <van-cell-group class="mt-4" inset>
      <van-field
        v-model="detail.materialBrief"
        autosize
        label="素材简介"
        label-align="top"
        maxlength="50"
        rows="2"
        type="textarea"
      />
    </van-cell-group>
    <van-cell-group class="mt-4 pb-4" inset>
      <van-field label="文件上传" label-align="top">
        <template #input>
          <van-uploader disabled v-model="detail.fileList">{{  }}</van-uploader>
        </template>
      </van-field>
      <div class="text-xs mt-3 ml-3">限于5张图片每张图片小于10m</div>
    </van-cell-group>
  </van-form>
</template>
