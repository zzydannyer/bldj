<script setup lang="ts">
import {
  getWorkMain,
  urgingWork,
  recallWork,
  completionWork,
  supervisionWork,
} from '@/api/media/taskRelease'
import { SysRole, DetailList } from '@/types/_media'
import { useGlobal } from '@/utils'
import {
  showConfirmDialog,
  showSuccessToast,
  showFailToast,
  showLoadingToast,
  closeToast,
} from 'vant'
import {
  getWorkFeedback,
  listWorkFeedbackByWorkId,
} from '@/api/media/taskExecution'
import { emitter } from '@/plugins/mitt'
import { join } from 'lodash'
import { Work, WorkFeedback } from '@/types/_media/task'

const route = useRoute()
const { $useDict, $parse, $value_to_label } = useGlobal<GlobalPropertiesApi>()
const { id } = route.params
const detail = ref<Work>({})
const remark = ref('')
const activeNames = ref<string[]>([])
// 弹出框的显示
const dialogShow = ref(false)
// 问题
const questionsList = ref<WorkFeedback>()
const workList = ref<WorkFeedback[]>([])
const backDeatail = ref()
const isShowNameDialog = ref(false)
const router = useRouter()
const query = ref<any>({})
const { work_release_type } = $useDict(
  'work_release_type',
  'feedback_status',
  'work_type_code'
)

const getDetail = async () => {
  try {
    showLoadingToast({ message: '加载中...', forbidClick: true })
    const { data } = await getWorkMain(id as string)
    detail.value = data!
  } finally {
    closeToast()
  }
}

// 督导数据
const handlePropsDataChange = async () => {
  query.value.workId = id
  const { data } = await listWorkFeedbackByWorkId(query.value)
  workList.value = data!
}
const urWork = async (row: any) => {
  try {
    await showConfirmDialog({
      title: '确认催办吗？',
      message: '',
    })
    const { code } = await urgingWork([row])
    if (code === 200) {
      showSuccessToast('催办成功')
      return
    }
    showFailToast('催办失败')
  } catch (e) {
    //取消删除
  }
}
// 退回信息
const goBack = async (row: any) => {
  backDeatail.value = row
  isShowNameDialog.value = true
}

// 回填弹出框
const handleView = async (id: string) => {
  const { data } = await getWorkFeedback(id)
  questionsList.value = data?.questions as any
  dialogShow.value = true
}

// 弹出框的方法
const onNameDialogBeforeClose = (action: any, done: any) => {
  backDeatail.value.workAuditDesc = remark.value
  if (action === 'confirm') {
    if (remark.value.length === 0) {
      showFailToast('请填写退回理由')
    } else {
      remark.value.length > 0 &&
        recallWork([backDeatail.value]).then((res: any) => {
          if (res.code === 200) {
            showSuccessToast('退回成功')
            isShowNameDialog.value = false
            router.go(-1)
            emitter.emit('refresh')
          }
        })
    }
  } else if (action === 'cancel') {
    isShowNameDialog.value = false
  }
}
// 办结任务
const handleDone = async () => {
  try {
    await showConfirmDialog({
      title: '确认办结吗？',
      message: '',
    })
    const { code } = await completionWork(workList.value)
    if (code === 200) {
      router.go(-1)
      emitter.emit('refresh')
      showSuccessToast('办结成功')

      return
    } else {
      showFailToast('办结失败')
    }
  } catch (e) {
    //取消删除
  }
}
// 确定按钮
const handleWork = async () => {
  try {
    const { code } = await supervisionWork(workList.value)
    if (code === 200) {
      router.go(-1)
      emitter.emit('refresh')
      showSuccessToast('成功')

      return
    } else {
      showFailToast('失败')
    }
  } catch (e) {
    //取消删除
  }
}
onBeforeMount(() => {
  getDetail()
  handlePropsDataChange()
})
</script>
<template>
  <div class="container">
    <!-- 任务详情 -->
    <van-cell-group inset>
      <van-form input-align="right">
        <van-field readonly>
          <template #label>
            <span class="section-title">任务详情</span>
          </template>
        </van-field>
        <!-- 任务名称 -->
        <van-field>
          <template #label>任务名称</template>
          <template #input>
            <span>{{ detail.workTitle }}</span>
          </template>
        </van-field>
        <!-- 任务类型 -->
        <van-field>
          <template #label>任务类型</template>
          <template #input>
            <span>
              {{ $value_to_label(work_release_type, detail.workType) }}
            </span>
          </template>
        </van-field>
        <!-- 截止时间 -->
        <van-field>
          <template #label>截止时间</template>
          <template #input>
            <span>{{ $parse(detail.publishDate) }}</span>
          </template>
        </van-field>
        <!-- 任务内容 -->
        <van-field>
          <template #label>任务内容</template>
          <template #input>
            <span>{{ detail.workDesc }}</span>
          </template>
        </van-field>
        <!-- 任务附件 -->
        <van-field>
          <template #label>任务附件</template>
          <template #input>
            <v-uploader disabled url="oss" v-if="detail.workFiles && detail.workFiles?.length > 0"
              v-model="detail.workFiles" type="file" />
            <span v-else>无</span>
          </template>
        </van-field>
        <!-- 接收类型 -->
        <van-field>
          <template #label>接收类型</template>
          <template #input>
            <span>
              {{
                detail.receiveType === '1'
                ? '全部'
                : detail.receiveType === '2'
                  ? '分组'
                  : detail.receiveType === '3'
                    ? '指定用户'
                    : ''
              }}
            </span>
          </template>
        </van-field>

        <template v-if="detail.receiveType === '3'">
          <!-- 接收用户 -->
          <van-field>
            <template #label>接收用户</template>
            <template #input>
              <span>{{ join(detail.recUserNames) }}</span>
            </template>
          </van-field>
        </template>

        <template v-if="detail.receiveType === '2'">
          <!-- 接收群组 -->
          <van-field>
            <template #label>接收群组</template>
            <template #input>
              <span>{{ detail.receivePackage?.packageName }}</span>
            </template>
          </van-field>
          <!-- 组织 -->
          <van-field>
            <template #label>组织</template>
            <template #input>
              <template v-for="(item, index) in detail?.receivePackage?.orgNames">
                <v-plain-tag type="primary">
                  {{ item ?? '暂无组织' }}
                </v-plain-tag>
              </template>
            </template>
          </van-field>
          <!-- 角色 -->
          <van-field>
            <template #label>角色</template>
            <template #input>
              <template v-for="(item, index) in detail?.receivePackage?.roleNames">
                <v-plain-tag type="success">
                  {{ item ?? '暂无角色' }}
                </v-plain-tag>
              </template>
            </template>
          </van-field>
        </template>
      </van-form>
    </van-cell-group>

    <!-- 工作督查 -->
    <van-cell-group inset style="margin-top: 20px">
      <van-field readonly>
        <template #label>
          <span class="section-title">工作督查</span>
        </template>
      </van-field>
      <van-form input-align="right">
        <van-collapse v-model="activeNames">
          <van-collapse-item :name="index" v-for="(workdetail, index) in workList" :key="index">
            <template #title>
              <!-- 所属组织 -->
              <section class="between-center">
                <span class="font-medium pr-2">
                  {{
                    workdetail.roleName
                    ? workdetail.orgName + ' - ' + workdetail.roleName
                    : workdetail.orgName
                  }}
                </span>

                <span class="whitespace-nowrap">
                  <van-icon :name="workdetail.submitStatus === '3' ? 'checked' : 'clear'
                      " :style="{
      color:
        workdetail.submitStatus === '3' ? '#07c160' : '#ee0a24',
    }" />
                  {{ workdetail.submitStatus === '3' ? '已提交' : '未提交' }}
                </span>
              </section>
            </template>

            <!-- 执行人 -->
            <van-field v-if="workdetail.submitStatus !== '0'">
              <template #label>执行人</template>
              <template #input>
                <span>{{ workdetail.belongToName }}</span>
              </template>
            </van-field>

            <template v-if="workdetail.submitStatus === '3'">
              <!-- 完成时间 -->
              <van-field>
                <template #label>完成时间</template>
                <template #input>
                  <span>{{ $parse(workdetail.updateTime) }}</span>
                </template>
              </van-field>
            </template>

            <!-- 反馈 -->
            <van-field>
              <template #label>反馈</template>
              <template #input>
                <span v-if="workdetail.submitStatus !== '3'">待提交</span>
                <span v-else>{{ workdetail.feedbackDesc ?? '无' }}</span>
              </template>

            </van-field>
            <!-- 反馈附件 -->
            <van-field v-if="workdetail.workFiles">

              <template #input>
                <template v-if="workdetail.workFiles && workdetail.workFiles?.length > 0">
                  <v-uploader disabled url="oss" v-model="workdetail.workFiles" type="file" />
                </template>
                <div v-else>
                  暂无反馈附件
                </div>

              </template>
            </van-field>
            <!-- 状态 -->
            <van-field>
              <template #label>状态</template>
              <template #input>
                <!-- <span>
                  <van-icon :name="workdetail.isDone === '1' ? 'checked' : 'warning'"
                    :style="{ color: workdetail.isDone === '1' ? '#07c160' : '#ee0a24' }" />
                  {{ workdetail.isDone === '1' ? '已完成' : '未完成' }}
                </span> -->
                <van-radio-group v-model="workdetail.isDone" direction="horizontal">
                  <van-radio name="1" icon-size="18px" checked-color="#07c160">
                    完成
                  </van-radio>
                  <van-radio name="0" icon-size="18px" :icon="'clear'" checked-color="#ee0a24" style="margin-right: 0">
                    未完成
                  </van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <!-- 操作 -->

            <van-button class="w-16 m-3 float-right" size="small" round type="danger"
              :icon="workdetail.submitStatus === '3' ? '' : 'bell'" @click="
                workdetail.submitStatus === '3'
                  ? goBack(workdetail)
                  : urWork(workdetail)
                ">
              {{ workdetail.submitStatus === '3' ? '退回' : '催办' }}
            </van-button>
          </van-collapse-item>
        </van-collapse>
      </van-form>
    </van-cell-group>

    <van-dialog v-model:show="isShowNameDialog" title="请输入退回理由" show-cancel-button
      :before-close="onNameDialogBeforeClose">
      <!-- 输入框 -->
      <van-field v-model="remark" input-align="center" placeholder="请输入退回理由" v-fofo />
    </van-dialog>

    <van-dialog :showCancelButton="false" v-model:show="dialogShow" title="回填任务">
      <van-cell-group inset style="margin-top: 20px" class="p-2" v-if="detail.workType === '2'">
        <div v-for="(item, index) in questionsList" :key="index">
          <van-field left-icon="phone" disabled v-model="item.question" label="提问" />
          <van-field left-icon="chat-o" disabled v-model="item.mustDesc" label="回答" />
        </div>
      </van-cell-group>
    </van-dialog>

    <van-button class="my-2" block type="success" round @click="handleDone">
      办结
    </van-button>
    <van-button class="my-2" block type="primary" round @click="handleWork">
      确定
    </van-button>
  </div>
</template>
<style scoped>
.van-collapse>>>.van-collapse-item__content {
  padding: 0;
}
</style>
