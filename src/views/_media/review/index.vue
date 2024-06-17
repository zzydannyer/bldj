<script setup lang="ts">
import {backInBackAudit, submitGroup} from '@/api/media'
import {listAudited, listAuditing} from '@/api/media/index'
import {useGlobal} from '@/utils'
import {MediaMainQuery} from '@/types/_media/index.ts'
import {FormInstance, showConfirmDialog, showSuccessToast} from 'vant'
import BackDialog from './backDialog.tsx'
import ResourceType from '@/views/media/resourceType.tsx'
import {emitter} from '@/plugins/mitt'

defineOptions({
  name: 'MediaReview',
})

const router = useRouter()
const {$useDict, $parse} = useGlobal<GlobalPropertiesApi>()
const {MEDIA_STATUS} = $useDict('MEDIA_STATUS')
const resourceTypeQueryText = ref('')
const mediaTypeQueryArray = ref([])
const queryParams = reactive<MediaMainQuery>(new MediaMainQuery())
const listRef = ref()
const handleSearch = () => {
  queryParams.shootingTime = queryParams.shootingTime
      ? $parse(queryParams.shootingTime, 'YYYY-MM-DD HH:mm:ss')
      : ''
  listRef.value.onRefresh()
}

const onChangeMediaType = (value: string[]) => {
  if (value.length === 2 || value.length === 0) {
    queryParams.mediaType = ''
    return
  }
  queryParams.mediaType = value[0]
}

// 呈报
const handleSubmitGroup = async (id: string) => {
  const result = await showConfirmDialog({
    title: '提示',
    message: '是否确认呈报？',
  })

  if (result === 'cancel') return

  const {code} = await submitGroup(id)
  if (code === 200) showSuccessToast('呈报成功')
}

// 退回
const handleBackInBack = (id: string) => {
  let formRef: FormInstance
  let backReason = ''

  const defaultSlot = ([_formRef, _backReason]: [FormInstance, string]) => {
    formRef = _formRef
    backReason = _backReason
  }

  const element = h(
      BackDialog as any,
      {maxLength: 50, key: Math.random()},
      defaultSlot as any
  )
  showConfirmDialog({
    title: '退回',
    message: () => element,
    teleport: 'body',
    closeOnPopstate: true,
    beforeClose: async (type) => {
      try {
        if (type === 'confirm') {
          await formRef.validate()
          await backInBackAudit(id, backReason)
          showSuccessToast('退回成功')
          handleSearch()
          return true
        }
        return true
      } catch (e: any) {
        console.error(e)
        return false
      }
    },
  })
}

// 重置
const resetQuery = () => {
  Object.assign(queryParams, new MediaMainQuery())
  resourceTypeQueryText.value = ''
  mediaTypeQueryArray.value = []
}
// 审核
const handleAudit = (id: number) => {
  router.push('/media/review/update/' + id)
}

// 查看
const handleDetail = (id: number) => {
  router.push('/media/review/detail/' + id)
}

const status = ref('auditing')
const listFn = computed(() =>
    status.value === 'auditing' ? listAuditing : listAudited
)
// 刷新数据
onMounted(() => emitter.on('refresh', handleSearch))

onBeforeUnmount(() => emitter.off('refresh'))
</script>
<template>
  <main class="list-container">
    <v-search
        showTabs
        placeholder="请输入项目名称"
        v-model:searchVal="queryParams.projectName"
        @handle-search="handleSearch"
    >
      <template #popMenu>
        <!-- 资源类别 -->
        <resource-type :required="false" v-model="queryParams.resourceType"/>
        <!-- 拍摄时间 -->
        <v-date-picker
            v-model="queryParams.shootingTime"
            label="拍摄时间"
            placeholder="请选择拍摄时间"
        />
        <van-button
            block
            plain
            type="primary"
            class="border-0"
            @click="resetQuery"
        >
          重置
        </van-button>
      </template>
      <template #dropMenu>
        <van-tabs v-model:active="status" @change="handleSearch">
          <van-tab title="待审核" name="auditing"/>
          <van-tab title="已审核" name="audited"/>
        </van-tabs>
      </template>
    </v-search>

    <v-inset-list
        :show="['search', 'tabs']"
        :list-fn="listFn"
        :query-params="queryParams"
        ref="listRef"
    >
      <template #default="{ row, index }">
        <v-card class="h-24">
          <van-text-ellipsis
              class="v-list-title"
              :content="row.mediaTitle"
              rows="2"
          />
          <v-tag class="mt-1" plain :dictData="MEDIA_STATUS" :value="row.mediaStatus"/>
          <!-- 作者 -->
          <div class="v-author mt-1">
            <van-icon name="contact-o"/>
            {{ row.author }}
          </div>
          <!-- 拍摄时间 -->
          <div class="v-date mt-1">
            <van-icon name="clock-o"/>
            {{ $parse(row.shootingTime) }}
          </div>
          <section class="absolute right-2 bottom-2">
            <van-button
                class="px-4"
                round
                type="default"
                hairline
                size="mini"
                text="查 看"
                @click="handleDetail(row.id)"
            />
            <van-button
                class="px-4"
                text="审 核"
                type="primary"
                round
                size="mini"
                @click="handleAudit(row.id)"
                v-auth="['multimedia:media:audit']"
                v-if="status === 'auditing'"
            />
            <van-button
                class="px-4"
                text="呈报集团"
                type="primary"
                round
                size="mini"
                @click="handleSubmitGroup(row.id)"
                v-auth="['multimedia:media:audit']"
                v-if="
                  (status === 'audited' && row.additional) ||
                  (status === 'audited' && row.canSubmitGroup)
                "
            />
            <van-button
                class="px-4"
                text="退 回"
                type="danger"
                round
                size="mini"
                @click="handleBackInBack(row.id)"
                v-auth="['multimedia:media:audit']"
                v-if="status === 'audited' && row.additional"
            />
          </section>
        </v-card>
      </template>
    </v-inset-list>
  </main>
</template>

<style lang="scss" scoped>
.van-notice-bar {
  flex: 1;
  height: $notice-height;
  padding: 0;

  :deep(.van-notice-bar__wrap) {
    justify-content: flex-end;

    .van-swipe {
      height: $notice-height;
      line-height: $notice-height;
    }
  }
}
</style>
