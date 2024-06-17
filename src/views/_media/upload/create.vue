<script setup lang="ts">

import { MediaMain } from '@/types/_media'
import { PickerOption, closeToast, showDialog, showLoadingToast } from 'vant'
import { addMedia, listActiveMediaActivities, } from '@/api/media/index'
import { _5_years_ago } from '@/utils/date'
import { last, debounce, cloneDeep } from 'lodash'
import { showSuccessToast } from 'vant'
import { emitter } from '@/plugins/mitt'
import ResourceType from '@/views/media/resourceType.tsx'
import ProjectPicker from '@/views/media/projectPicker.tsx'
import { FieldRuleValidator } from 'vant/es/field/types'
import { useGlobal } from '@/utils'
import { handleError } from 'vue'

// import VueOfficePdf from '@vue-office/pdf'
const { $parse } = useGlobal<GlobalPropertiesApi>()
const form = reactive(new MediaMain())
const route = useRoute()
const router = useRouter()
// switch开关
const switchValue = ref(true)
// 征集活动
const activitiesList = ref([])
// 判断标题是否有值
const titleDisabled = ref(false)
type MediaType = Pick<MediaMain, 'mediaType'>['mediaType']
const mediaType = route.params.mediaType as MediaType
const projectName = computed(() => {
  return form.project
})
/**
 * @description: 提交
 * @params MediaMain
 */
const onSubmit = async () => {
  try {
    form.project = switchValue.value
    const submitForm = cloneDeep(form)
    submitForm.mediaType = mediaType
    submitForm.shootingTime = $parse(form.shootingTime, 'YYYY-MM-DD HH:mm:ss')

    showLoadingToast({ message: '提交中...' })

    const { code } = await addMedia(submitForm)

    if (code !== 200) {
      throw new Error('新增失败')
    } else {
      showSuccessToast('新增成功')
      router.push('/media/upload')
      emitter.emit('refresh')
    }
  } catch (e) {
    console.error(e)
  } finally {
    closeToast()
  }
}

// 素材简介的校验
const validator = (val: FieldRuleValidator) => {
  if (50 <= val.length * 1 && val.length <= 300) {
    return true
  } else {
    return false
  }
}
// 征集活动
const getActivities = async () => {
  const { code, data } = await listActiveMediaActivities()
  if (code === 200) {
    activitiesList.value = data
  }
}
// 判断标题是否有值
const handlechage = () => {
  showDialog({
    message: '请先填写媒体标题，在上传文件',
  })
}
// 图片素材和视频素材校验规则
const mediaValidator = (val: any) => {
  if (form.mediaList&&form.mediaList?.length>0) {
    return true
  } else {
    return false
  }
}
onBeforeMount(async () => {
  await getActivities()
})
</script>
<template>
  <section class="container">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <!-- 媒体标题 -->
        <van-field required v-model="form.mediaTitle" label="媒体标题" placeholder="请输入媒体标题"
          :rules="[{ required: true, message: '媒体标题不能为空' }]" />
        <!-- 作者 -->
        <van-field required v-model="form.author" label="作者" placeholder="请输入作者"
          :rules="[{ required: true, message: '作者不能为空' }]" />
        <!-- 素材类别 -->
        <resource-type v-model="form.resourceType" />
        <!-- 关联项目 -->
        <van-field label="是否关联项目">
          <template #input>
            <van-switch size="16px" :active-value="true" :inactive-value="false" v-model="switchValue"></van-switch>
          </template>
        </van-field>
        <!-- 项目工程名称 -->
        <project-picker v-if="switchValue" v-model:id="form.projectId" v-model:name="form.projectName" />
        <!-- 视频素材 -->
        <van-field required :rules="[{ validator: mediaValidator, message: '请上传视频素材' }]" label="视频素材"
          v-if="mediaType === '2'">
          <template #input>
            <v-uploader  :projectname="form.mediaTitle" :http-params="{ mainId: form.id }" url="media"
              :max-size="5000 * 1024 * 1024" v-model="form.mediaList" type="video" />
          </template>
        </van-field>
        <!-- 图片素材 -->
        <van-field required :rules="[{ validator: mediaValidator, message: '请上传图片素材' }]" label="图片素材"
          v-else-if="mediaType === '1'">
          <template #input>
            <v-uploader  :http-params="{ mainId: form.id }" url="media"
              :projectname="form.mediaTitle" v-model="form.mediaList" type="image" />
          </template>
        </van-field>
        <!-- 征集活动 -->
        <v-multi-picker v-model="form.activitiesIdList" :columns="activitiesList" label="征集活动" :searchshow="false"
          placeholder="不参加征集活动" :columns-field-names="{ value: 'id', text: 'activitiesName' }" />
        <!-- 报道日期 -->
        <v-date-picker required :rules="[{ required: true, message: '请上传拍摄时间' }]" v-model="form.shootingTime" label="拍摄时间"
          placeholder="请选择拍摄时间" />
        <!-- 拍摄地点 -->
        <v-area-picker required v-model="form.shootingArea" :columns="globalOptions" label="拍摄地点" placeholder="请选择拍摄地点"
          :rules="[{ required: true, message: '请输入拍摄地点' }]" :columns-field-names="{
            text: 'label',
            value: 'value',
            children: 'children',
          }" />

        <!-- 报道摘要 -->
        <van-field required v-model="form.materialBrief" rows="2" autosize show-word-limit maxlength="300" type="textarea"
          label="素材简介" placeholder="请输入素材简介" :rules="[
            { validator, message: '请输入50-300之间的字符' },
            { required: true, message: '请输入素材简介' },
          ]" />
      </van-cell-group>

      <van-button class="my-4" round block type="success" native-type="submit">
        提交
      </van-button>
    </van-form>
  </section>
</template>

<style lang="scss" scoped>
:deep(.van-picker__toolbar) {
  .van-search {
    padding: 0;
    flex: 1;
  }
}
</style>
