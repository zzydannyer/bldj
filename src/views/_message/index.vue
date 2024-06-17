<script setup lang="ts">
// import { listMessageManage, readOne } from '@/api/media/index'
import {MessageQuery} from '@/types/_message'
import {Icon} from '@iconify/vue'
import {showDialog, showConfirmDialog} from 'vant'
import {useGlobal} from '@/utils'
import {fetchEventSource} from '@microsoft/fetch-event-source'
import {getToken} from '@/utils/auth.ts'
import useUserInfoStore from '@/store/modules/userInfo.ts'
import {remove} from 'lodash'
import {
  getActionMap,
  getMessageVo,
  pullMessageList,
} from '@/api/media/message.ts'
// const {$useDict} = useGlobal<GlobalPropertiesApi>();
// const {MESSAGE_TYPE} = $useDict("MESSAGE_TYPE");
// console.log("MESSAGE_TYPE", MESSAGE_TYPE.value)

defineOptions({
  name: 'Message',
})
const {$parse, $useDict} = useGlobal<GlobalPropertiesApi>()
const {MESSAGE_TYPE} = $useDict("MESSAGE_TYPE");
const messageType = computed(() => MESSAGE_TYPE.value.reduce((acc, cur) => {
      acc[cur.value] = cur.label
      return acc
    }, {})
)

const userInfoStore = useUserInfoStore()
const router = useRouter()
const listRef = ref()
const queryParams = reactive<MessageQuery>(new MessageQuery())
const isReadOptions = [
  {text: '全部', value: ''},
  {text: '未读', value: '0'},
  {text: '已读', value: '1'},
]
const typeOptions = [
  {text: '全部类型', value: ''},
  // {text: '重点项目', value: '1'},
  {text: '日程任务', value: '2'},
  {text: '宣传考核', value: '3'},
  {text: '素材资源', value: '4'},
]
// 搜索
const handleSearch = () => {
  listRef.value.onRefresh()
}

// 查看消息详情
const handleDetail = (row: any) => {
  // 设置为无需跳转的待办类型、已完成的待办 关闭跳转
  if (!actionMap[row.type] || row.completed) {
    return;
  }
  const message = `<div class="text-center"><span class="inline-block text-left">${row.title}</span></div>`
  // showDialog({
  //   title: '',
  //   message: html,
  //   allowHtml: true,
  // }).then(() => {})
  showConfirmDialog({
    message,
    allowHtml: true,
    confirmButtonText: '跳转',
    cancelButtonText: '关闭',
  })
      .then(() => {
        return getMessageVo(row.id)
      })
      .then(({data}) => {
        if (data && actionMap && actionMap[row.type] === true) {
          let path
          if (data.params.type !== undefined) {
            path = `${data.componentUrl}/${data.params.id}/${data.params.type}`
          } else if(data.params.status !== undefined){
            path = `${data.componentUrl}/${data.params.id}/${data.params.status}`
          } else {
            path = `${data.componentUrl}/${data.params.id}`
          }
          router.push(path)
        }
      })
      .catch(console.log)
}

const messageList = ref<any>([])

async function subscribeMessage() {
  const api = import.meta.env.VITE_APP_BASE_API
  const token = getToken()
  const userId = userInfoStore.userId
  await fetchEventSource(`${api}/message/register/wap_${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    onmessage(ev) {
      const data = JSON.parse(ev.data)
      const pushType = data.pushType
      const rows = data.rows
      if (pushType == 'cover') {
        messageList.value = data.rows
      } else if (pushType == 'insert') {
        messageList.value = messageList.value.concat(data.rows)
      } else if (pushType == 'delete') {
        remove(messageList.value, (item: any) => {
          return rows.some((row: any) => row.id == item.id)
        })
      } else if (pushType == 'update') {
        messageList.value = messageList.value.map((item: any) => {
          if (rows.some((row: any) => row.id == item.id)) {
            return rows.find((row: any) => row.id == item.id)
          }
          return item
        })
      }
    },
  })
}

const map = {
  media_audit: '素材审核',
  media_back: '素材退回',
  media_pass: '素材通过',
  media_reject: '素材未通过',
  propaganda_new_audit: '新媒体审核',
  propaganda_new_preview: '新媒体查看',
  propaganda_audit: '媒体审核',
  propaganda_preview: '新媒体查看',
  work_handle: '日程任务',
}

let actionMap: any
onBeforeMount(async () => {
  const {data} = await getActionMap()
  actionMap = data!
  await subscribeMessage()
})
onActivated(pullMessageList)
</script>

<template>
  <!--  <main class="list-container">
      <v-search
        :show-pop-icon="false"
        placeholder="请输入消息内容"
        v-model:searchVal="queryParams.description"
        @handle-search="handleSearch"
      >
        <template #dropMenu>
          <van-dropdown-menu>
            <van-dropdown-item
              @change="handleSearch"
              v-model="queryParams.isRead"
              :options="isReadOptions"
            />
            <van-dropdown-item
              @change="handleSearch"
              v-model="queryParams.type"
              :options="typeOptions"
            />
          </van-dropdown-menu>
        </template>
      </v-search>
  
      <v-inset-list
        :shows="['search', 'dropmenu']"
        :list-fn="listMessageManage"
        :query-params="queryParams"
        ref="listRef"
      >
        <template #default="{ row, index }">
          <v-card @click="handleDetail(row)">
            &lt;!&ndash; 消息内容 &ndash;&gt;
            <van-text-ellipsis
              rows="2"
              :content="row.description"
              class="v-list-title"
              style="&#45;&#45;van-text-ellipsis-line-height: 1.4"
            />
  
            <div class="v-date text-sm between-center mt-2">
              <van-icon v-if="row.isRead === '1'" size="20" name="envelop-o" />
              <van-badge v-else dot>
                <van-icon size="20" color="#f56c6c" name="envelop-o" />
              </van-badge>
              &lt;!&ndash;<span>{{ row.type === '1' ? '消息' : '待办' }}</span>&ndash;&gt;
            </div>
          </v-card>
        </template>
      </v-inset-list>
    </main>-->
  <main class="list-container p-4 mt-[46PX]">
    <template v-if="messageList.length > 0">
      <template v-for="message in messageList" :key="message.id">
        <v-card class="mb-2" @click="handleDetail(message)">
          <van-text-ellipsis
              rows="2"
              :content="message.title"
              class="v-list-title"
              style="van-text-ellipsis-line-height: 1.4"
          />

          <div class="v-date justify-end">
            <van-icon name="clock-o"/>
            {{ $parse(message.datetime) }}
          </div>
          <div class="between-center mt-2">
            <!--<v-plain-tag size="mini" type="primary">-->
            <!--  {{ map[message.type] ?? message.type }}-->
            <!--</v-plain-tag>-->
            <v-tag plain :dictData="MESSAGE_TYPE" :value=" message.type"/>
            <v-plain-tag
                v-if="actionMap[message.type]"
                size="mini"
                :type="message.completed ? 'success' : 'danger'"
            >
              {{ message.completed === true ? '已完成' : '未完成' }}
            </v-plain-tag>
          </div>
        </v-card>
      </template>
    </template>
    <div class="h-[60vh] center-center" v-else>
      <van-loading size="24px" vertical>加载中...</van-loading>
    </div>
  </main>
</template>
