<script setup lang="ts">
import { listActivitiesByMainId, getMedia, updateMedia, listActiveMediaActivities } from '@/api/media'
import { MediaMain } from '@/types/_media'
import {
  PickerOption,
  closeToast,
  showLoadingToast,
  showSuccessToast,
} from 'vant'
import { joinDate, _5_years_ago, formatDate } from '@/utils/date'
import { last, debounce } from 'lodash'
import { emitter } from '@/plugins/mitt'
import { cloneDeep } from 'lodash'
import { FieldRuleValidator } from 'vant/es/field/types'
import { dateFormatter } from '@/utils/date'
import ProjectPicker from '@/views/media/projectPicker.tsx'
import ResourceType from '@/views/media/resourceType.tsx'
import { useGlobal } from '@/utils'

// import VueOfficePdf from '@vue-office/pdf'
const { $parse } = useGlobal<GlobalPropertiesApi>()
const form = reactive<MediaMain>(new MediaMain())
const route = useRoute()
const router = useRouter()
const projectId = ref([])
const activitiesList=ref([])
const id = route.params.id as string
const activeList=async ()=>{
const {data}= await listActivitiesByMainId(id)
   // 征集标题
form.activitiesIdList =data?.map((item)=>item.id);
}
const getMediaLsit = async () => {
  try {
    
    showLoadingToast({ message: '加载中...', forbidClick: true })
    await activeList()
    await getActivities()
    // 解构数据
    const { data } = await getMedia(id)
    // 项目工程名称
    form.projectName = data?.project ? data?.projectName : ''
    //作者
    form.author = data?.author
    // 项目ID
    projectId.value = [data?.projectId] as any
    form.projectId = data?.projectId
    // 媒体类别
    form.mediaType = data?.mediaType
    form.resourceTypeName = data?.resourceTypeName
    // 报道摘要
    form.materialBrief = data?.materialBrief
    //报道时间
    reportTimeText.value = formatDate(data?.shootingTime) as string
    // 拍摄地点
    form.shootingArea = data?.shootingArea
    // 资源类别
    form.resourceType = data?.resourceType
    // 拍摄时间
    form.shootingTime = data?.shootingTime
    // 视频素材
    form.mediaList = data?.mediaList
    // 是否关联项目
    form.project = data?.project
    //媒体标题
    form.mediaTitle = data?.mediaTitle
   
  } finally {
    closeToast()
  }
}
// 报道日期
const showReportTime = ref(false)
const reportTimeText = ref('')
// 征集活动
const getActivities = async () => {
  const { code, data } = await listActiveMediaActivities()
  if (code === 200) {
    activitiesList.value = data
  }
}
const onReportTimeConfirm = ({ selectedOptions }: PickerOption) => {
  form.shootingTime = $parse(
    joinDate(selectedOptions, 'value', '-'),
    'YYYY-MM-DD HH:mm:ss'
  )
  reportTimeText.value = joinDate(selectedOptions, 'text')
  showReportTime.value = false
}

/**
 * @description: 提交
 */
const onSubmit = async () => {
  try {
    const submitForm = cloneDeep(form)
    submitForm.id = id as Numeric
    submitForm.mediaType = form.mediaType
    submitForm.shootingTime = $parse(form.shootingTime, 'YYYY-MM-DD HH:mm:ss')

    showLoadingToast({ message: '提交中...' })

    const { code } = await updateMedia(submitForm)

    if (code !== 200) {
      throw new Error('修改失败')
    } else {
      showSuccessToast('修改成功')
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
// 图片素材和视频素材校验规则
const mediaValidator = (val: any) => {
  if (form.mediaList&&form.mediaList?.length>0) {
    return true
  } else {
    return false
  }
}
onBeforeMount(getMediaLsit)
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
            <van-switch size="16px" :active-value="true" :inactive-value="false" v-model="form.project"></van-switch>
          </template>
        </van-field>
        <!-- 项目工程名称 -->
        <project-picker v-if="form.project" v-model:id="form.projectId" v-model:name="form.projectName" />
         <!-- 视频素材 -->
         <van-field label="视频素材" required :rules="[{ required: true, message: '请上传视频素材' }]" v-if="form.mediaType === '2'">
          <template #input>
            <v-uploader :projectname="form.mediaTitle" :max-size="5000 * 1024 * 1024" url="media" v-model="form.mediaList" type="video" />
          </template>
        </van-field>
        <!-- 图片素材 -->
        <van-field  label="图片素材" required :rules="[{ required: true, message: '请上传图片素材' }]"
          v-else-if="form.mediaType === '1'">
          <template #input>
            <v-uploader url="media" :projectname="form.mediaTitle" v-model="form.mediaList" type="image" />
          </template>
        </van-field>
        <!-- 征集活动 -->
         <v-multi-picker v-model="form.activitiesIdList" :columns="activitiesList" label="征集活动" :searchshow="false"
          placeholder="不参加征集活动" :columns-field-names="{ value: 'id', text: 'activitiesName' }" />
   
        <!-- 报道日期 -->
        <van-field required v-model="reportTimeText" is-link readonly name="datePicker" label="报道日期" placeholder="请选择报道日期"
          @click="showReportTime = true" :rules="[{ required: true, message: '请选择报道日期' }]" />
        <van-popup v-model:show="showReportTime" position="bottom">
          <van-date-picker title="报道日期" :min-date="_5_years_ago" :max-date="new Date()" :formatter="dateFormatter"
            @confirm="onReportTimeConfirm" @cancel="showReportTime = false" />
        </van-popup>
        <!-- 拍摄地点 -->
        <v-area-picker required v-model="form.shootingArea" :columns="globalOptions" label="拍摄地点" placeholder="请选择拍摄地点"
          :rules="[{ required: true, message: '请输入拍摄地点' }]" :columns-field-names="{
            text: 'label',
            value: 'value',
            children: 'children',
          }" />
       
        <!-- 素材简介 -->
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
:deep(.van-cascader) {
  .van-tab__text {
    max-width: 20vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
