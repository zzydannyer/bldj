<script setup lang="ts">
import {
  UploaderProps,
  UploaderFileListItem,
  showToast,
  showFailToast,
  showConfirmDialog,
  showSuccessToast,
} from 'vant'
import axios, { CustomParamsSerializer } from 'axios'
import { Resp } from '@/utils/http/types.d'
import { fileTypes, acceptTypes } from './config'
import { Icon } from '@iconify/vue'
import { useGlobal } from '@/utils'
import { stringify } from 'qs'
import { formatToken, getToken } from '@/utils/auth'
import { find, isEmpty, isUndefined } from 'lodash'
import { fileMd5 } from '@/plugins/md5'
import { fileCheck } from '@/api/media'

defineOptions({
  name: 'VUploader',
})

// ***********************************************************************
const { $download } = useGlobal<GlobalPropertiesApi>()
// 本组件绑定值
const modelValue = defineModel<any[]>()
// 文件重复下标
const subscript = ref(1)
// ***********************************************************************
const show = ref(false)
const flag=ref(false)
const iconSize = '24'
const iconcolor = '#dcdee0'
const previewList = ref<string[]>([])
const uploadUrl = computed(() => {
  if (url === 'media') return '/multimedia/media/upload'
  else if (url === 'oss') return '/system/oss/upload'
  else return url
})
// 修改文件名字
const originalName = ref('')
/**
 * @description: 修改文件名
 */
const showChangeName = ref(false)
const nameIndex = ref(0)
const handleClick = (index: number) => {
  if (disabled || url !== 'media') return
  originalName.value = fileList.value[index].resourceName
  nameIndex.value = index
  showChangeName.value = true
}
// 关闭弹出层
const closePopup = () => {
  fileList.value[nameIndex.value].resourceName = originalName.value
}
// van-uploader 组件绑定值
const fileList = computed({
  get: () => {
    if (!modelValue.value) return []
    previewList.value = modelValue.value.map((item) => item.url!)
    return modelValue.value
  },
  set: (val) => {
    modelValue.value = val
  },
})
// 请求 & 拦截
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 9999999,
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer,
  },
})

instance.interceptors.request.use(
  (config: any) => {
    const token = getToken()
    config.headers!['Authorization'] = formatToken(token!)
    return Promise.resolve(config)
  },
  (error) => Promise.reject(error)
)

const errIndex = ref(-1)
instance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    fileList.value.splice(errIndex.value, 1)
    previewList.value.splice(errIndex.value, 1)
    return Promise.reject(err)
  }
)

// ***********************************************************************
// props
const {
  type,
  name,
  url,
  maxSize = 10 * 1024 * 1024,
  disabled = false,
  readonly = false,
  maxCount = 5,
  reupload = false,
  httpParams,
  projectname
} = defineProps({
  type: String as PropType<'file' | 'image' | 'video'>,
  name: [String, Number],
  url: String as PropType<string | 'media' | 'oss'>,
  maxSize: [String, Number],
  maxCount: [String, Number],
  httpParams: Object as PropType<Record<string, any>>,
  disabled: Boolean,
  readonly: Boolean,
  reupload: Boolean,
  projectname: String
})

// emits
type parameters = [
  fileList: UploaderFileListItem | UploaderFileListItem[],
  detail: { name: number | string; index: number },
]
const emit = defineEmits<{
  oversize: parameters
  clickUpload: [event: MouseEvent]
  clickPreview: parameters
  clickReupload: parameters
  closePreview: []
  delete: parameters
}>()

// ***********************************************************************
// 设置请求params
const setParams = (formData: FormData) => {
  if (isUndefined(httpParams) || isEmpty(httpParams)) return
  const params = Object.keys(httpParams)
  for (const key of params) {
    if (httpParams[key]) {
      formData.append(key, httpParams[key])
    }
  }
}

// 上传文件查重
const checkFileExist = async (file: any, index: number) => {
  const md5 = await fileMd5(file.file)
  const md5File = fileList.value.find((item) => item.md5 === md5)
  if (md5File) return true

  file.md5 = md5
  try {
    const resp = await fileCheck(md5, file.file.size)
    const duplicateFile = resp.data
    if (!duplicateFile) {
      return false
    }
    // 检测重复文件列表的ossId在不在fileList中，如果存在则阻止上传
    if (find(fileList.value, { ossId: duplicateFile.ossId })) {
      return true
    }
    // 如果mainId存在并且不在fileList中，则添加到fileList中
    if (httpParams?.mediaId == duplicateFile.id) {
      // 直接回显图片
      fileList.value[index] = duplicateFile
      return false
    }
  } catch (error: any) {
    throw new Error(error.message)
  }

  return false
}

/**
 * @description: 上传方法
 */
const afterRead = async (
  file: any,
  detail: {
    name: number | string
    index: number
  }
) => {
  try {
    // 检测文件是否已存在
    const exist = await checkFileExist(file, detail.index)
    if (exist) {
      showFailToast('文件已存在')
      onDelete(file, detail)
      return
    }
    if (url === 'media') {
      // 检测媒体标题是否存在
      if (!projectname) {
        onDelete(file, detail)
        showFailToast('请先输入媒体标题')
        return
      }
    }

    file.status = 'uploading'
    file.message = '上传中... '
    const params = new FormData()
    params.append('file', file.file)
    // 请求参数
    setParams(params)

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    errIndex.value = detail.index

    const {
      code,
      data: resData,
      msg,
    } = (await instance.post(uploadUrl.value, params, config)) as Resp<any>

    if (code !== 200) {
      fileList.value.splice(detail.index, 1)
      previewList.value.splice(detail.index, 1)
      file.status = 'failed'
      file.message = '上传失败'
      throw new Error('上传失败\n' + msg)
    }

    resData.md5 = file.md5
    fileList.value![detail.index] = resData
    fileList.value![detail.index].resourceName = projectname ? projectname +'('+ `${subscript.value}`+')': resData.originalName
    if(fileList.value![detail.index-1]?.resourceName==projectname+`(${subscript.value })`){
      subscript.value=subscript.value+1
      fileList.value![detail.index].resourceName = projectname ? projectname +'('+ `${subscript.value}`+')': resData.originalName
    }else{
      
      subscript.value=1
      fileList.value![detail.index].resourceName = projectname ? projectname +'('+ `${subscript.value}`+')': resData.originalName
    }
    // 文件重复上传下标自动加1
      // let newTitle=''
      // if(flag.value){
      //   newTitle=projectname+`(${subscript.value>0?subscript.value/1:''})` 
      // }else{
      //   newTitle=projectname+`${subscript.value>0?subscript.value/1:''}` 
      // }
      // if (fileList.value![detail.index-1].resourceName === newTitle) {
      //   flag.value=true
      //   console.log(flag.value,1111);
        
      //   subscript.value=subscript.value+1
      //   fileList.value![detail.index].resourceName = projectname ? projectname +'('+ `${subscript.value}`+')': resData.originalName

      // } else {
      //   flag.value=false
      //   subscript.value=0
      //   fileList.value![detail.index].resourceName = projectname ? projectname : resData.originalName
      // }
    
    showSuccessToast('上传成功')
  } catch (e: any) {
    console.error(e)
    showFailToast(e.message)
  }
}

// ***********************************************************************
const size_1_KB = 1024
const size_1_MB = size_1_KB * 1024
const size_1_GB = size_1_MB * 1024
// 文件大小超过限制时触发
const onOversize = (
  fileList: UploaderFileListItem | UploaderFileListItem[],
  detail: {
    name: number | string
    index: number
  }
) => {
  const max = typeof maxSize === 'string' ? parseInt(maxSize) : maxSize

  switch (true) {
    case max >= size_1_GB:
      showFailToast(`文件大小限制${max / size_1_GB}GB，请重新上传`)
      return false
    case max >= size_1_MB && max < size_1_GB:
      showFailToast(`文件大小限制${max / size_1_MB}MB，请重新上传`)
      return false
    case max >= size_1_KB && max < size_1_MB:
      showFailToast(`文件大小限制${max / size_1_KB}KB，请重新上传`)
      return false
    case max < size_1_KB:
      showFailToast(`文件大小限制${max}B，请重新上传`)
      return false
    default:
      return true
  }
}

// 点击上传区域时触发
const onClickUpload = (event: MouseEvent) => {
  emit('clickUpload', event)
}

// 关闭全屏图片预览时触发
const onClosePreview = () => true

// ***********************************************************************
/**
 * @description: 文件预览
 */
const listIndex = ref(0)
// 点击预览图时触发
const onClickPreview = (


  file: UploaderFileListItem & { name: string, originalName: string },
  detail: {
    name: number | string
    index: number
  }
) => {
  if (type === 'file') {
    $download(file.url!, file.originalName ?? file.name)
    return
  }
  listIndex.value = detail.index
  show.value = true
}

// 删除文件前提示
const beforeDelete = async (
  file: UploaderFileListItem & { name: string }



  ,
  detail: {
    name: number | string
    index: number
  }
) => {
  try {
    await showConfirmDialog({
      title: '确认删除？',
      message: file.name,
    })
    return true
  } catch {
    return false
  }
}

// 删除文件触发
const onDelete = (
  file: UploaderFileListItem,
  detail: {
    name: number | string
    index: number
  }
) => {
  fileList.value!.splice(detail.index, 1)
  previewList.value.splice(detail.index, 1)
}
</script>

<template>
  <van-uploader :readonly="disabled" :disabled="disabled" :deletable="!disabled" v-model="fileList"
    :accept="acceptTypes[type]" :reupload="reupload" :name="name" :max-count="maxCount" :max-size="maxSize"
    :after-read="afterRead" preview-size="8rem" :before-delete="beforeDelete" :preview-full-image="false"
    @oversize="onOversize" @click-upload="onClickUpload" @click-preview="onClickPreview" @close-preview="onClosePreview"
    @delete="onDelete">
    <!--  <template #preview-delete>
      //TODO 删除
    </template> -->

    <template #preview-cover="{ index }">
      <van-image v-if="type === 'video'" class="w-full h-full" :src="fileList[index].thumbnailUrl">
        <template #loading>
          <van-loading type="spinner" size="20" />
        </template>
        <template #error>加载失败</template>
      </van-image>
      <div class="preview-cover van-ellipsis" @click.stop="handleClick(index)">
        {{ fileList[index].resourceName ?? fileList[index].name }}
      </div>

      <van-popup v-model:show="showChangeName" round @close="closePopup" position="bottom" teleport="body" :style="{
        height: '10%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }">
        <van-field v-model="originalName" label="文件名" placeholder="请输入文件名" />
      </van-popup>
    </template>

    <template #default>
      <div class="van-uploader__wrapper">
        <div class="van-uploader__preview">
          <div v-if="!disabled" class="van-uploader__file" style="width: 6rem; height: 6rem">
            <van-icon name="video" :size="iconSize" :color="iconcolor" v-if="type === 'video'" />
            <van-icon name="photo" :size="iconSize" :color="iconcolor" v-else-if="type === 'image'" />
            <Icon icon="bxs:file" :width="iconSize" :color="iconcolor" v-else />
          </div>
        </div>
      </div>
    </template>
  </van-uploader>
  <v-preview v-model="show" :type="type" :list="previewList" :listIndex="listIndex" />
  <van-number-keyboard safe-area-inset-bottom />
</template>

<style>
.van-uploader__wrapper--disabled {
  opacity: 1;
}
</style>
