<script setup lang="ts">
import {
  PickerOption,
  showConfirmDialog,
  showSuccessToast,
  showToast, Toast,
} from 'vant'
import { joinDate, _5_years_ago } from '@/utils/date'
import { router } from '@/router'
import { useGlobal } from '@/utils'
import { emitter } from '@/plugins/mitt'
import { dateFormatter } from '@/utils/date'
import ProjectPicker from '@/views/media/projectPicker.tsx'
import {storeToRefs} from "pinia";
import useUserInfoStore from '@/store/modules/userInfo'
import {PropagandaClue} from "@/types/_media/propagandaClue";
import {addPropagandaClue} from "@/api/media/propagandaClue.ts";
import dayjs from "dayjs";
const { $useDict, $parse } = useGlobal<GlobalPropertiesApi>()
const { group_propaganda_ratio, group_propaganda_type } = $useDict(
  'group_propaganda_ratio',
  'group_propaganda_type'
)
const userInfoStore = useUserInfoStore()
const {roles, userId, orgCode} = storeToRefs(userInfoStore)
const form = reactive<PropagandaClue>(new PropagandaClue())
const rmEmptyChildren = (arr: any[]) => {
  for (let item of arr) {
    if (item.children.length === 0) {
      delete item.children
    } else {
      rmEmptyChildren(item.children)
    }
  }
  return arr
}

// 赋分依据
const showScoreDetail = ref(false)
const scoreDetailText = ref('')
const scoreOption = ref<any[]>([])
// 额外加分项
const showExtra = ref(false)
const fieldNames = {
  text: 'text',
  value: 'id',
  children: 'children',
}

const toggle = () => {
  showExtra.value = !showExtra.value
  showExtra.value === false && resetExtra()
}

const resetExtra = () => {
  showExtra.value = false
}

// 开始日期
const showStartTime = ref(false)
const startTimeText = ref('')

const onStartTimeConfirm = ({ selectedOptions }: PickerOption) => {
  form.startTime = $parse(
    joinDate(selectedOptions, 'value', '-'),
    'YYYY-MM-DD HH:mm:ss'
  )
  startTimeText.value = joinDate(selectedOptions, 'text')
  showStartTime.value = false
}

// 结束日期
const showEndTime = ref(false)
const endTimeText = ref('')

const onEndTimeConfirm = ({ selectedOptions }: PickerOption) => {
  form.endTime = $parse(
      joinDate(selectedOptions, 'value', '-'),
      'YYYY-MM-DD HH:mm:ss'
  )
  if (new Date(form.endTime) < new Date(form.startTime)) {
    showToast('结束时间不能小于开始时间');
  }
  endTimeText.value = joinDate(selectedOptions, 'text')
  showEndTime.value = false
}

// 0:编辑 1：提交 2：基层审核通过 3：基层审核退回 4:基层向公司申诉
// 5：提交集团待审 6：集团审核通过 7：集团审核退回 8:公司向集团申诉
const onSubmit =async () => {
  if (new Date(form.endTime) < new Date(form.startTime)) {
    showToast('结束时间不能小于开始时间');
    return
  }
  addPropagandaClue(form).then((res) => {
    if (res.code === 200) {
      showSuccessToast(res.msg || '提交成功')
      emitter.emit('refresh')
      router.go(-1)
    }
  })
}

onMounted(async () => {
})
</script>
<template>
  <section class="container">
    <van-form input-align="left" @submit="onSubmit">
      <van-cell-group inset>
        <!-- 项目工程名称 -->
        <project-picker :rules="[]" :required="false" v-model:id="form.projectId" v-model:name="form.projectName" />

        <!-- 开始时间 -->
        <van-field required v-model="startTimeText" is-link readonly name="datePicker" label="开始时间" placeholder="请选择开始时间"
                   @click="showStartTime = true" :rules="[{ required: true, message: '请选择开始时间' }]" />
        <van-popup v-model:show="showStartTime" position="bottom">
          <van-date-picker title="开始时间" :min-date="_5_years_ago"
                           :formatter="dateFormatter" @confirm="onStartTimeConfirm" @cancel="showStartTime = false" />
        </van-popup>
        <!-- 截止时间 -->
        <van-field required v-model="endTimeText" is-link readonly name="datePicker" label="结束时间" placeholder="请选择结束时间"
                   @click="showEndTime = true" :rules="[{ required: true, message: '请选择结束时间' }]" />
        <van-popup v-model:show="showEndTime" position="bottom">
          <van-date-picker title="结束时间" :min-date="_5_years_ago"
                           :formatter="dateFormatter" @confirm="onEndTimeConfirm" @cancel="showEndTime = false" />
        </van-popup>

        <!-- 报道摘要 -->
        <van-field required v-model="form.clueContent" rows="2" autosize show-word-limit maxlength="800" type="textarea"
          label="新闻线索内容" placeholder="请输入新闻线索内容" :rules="[{ required: true, message: '请输入新闻线索内容' }]" name="clueContent"/>

        <van-cell-group inset class="mt-[16PX]">
          <v-tree-select v-model="form.linkUser" placeholder="请选择联系人" label="联系人" name="linkUser" />
        </van-cell-group>

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

:deep(.van-picker__toolbar) {
  .van-search {
    padding: 0;
    flex: 1;
  }
}
</style>
