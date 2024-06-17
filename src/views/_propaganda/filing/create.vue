<script setup lang="ts">
import { PropagandaMain } from '@/types/_media/propaganda'
import {
  getDateRange,
  getNewMediaConfirm,
  checkScoreDetail,
  listOption,
  listStandCascadeList, validatorAchieveScoreEnough,
} from '@/api/media/scoreStandard'
import {
  PickerOption,
  showConfirmDialog,
  showSuccessToast,
  showToast,
} from 'vant'
import { joinDate, _5_years_ago } from '@/utils/date'
import { addPropaganda, checkRole } from '@/api/media/propaganda'
import { debounce, last } from 'lodash'
import { router } from '@/router'
import { useGlobal } from '@/utils'
import { emitter } from '@/plugins/mitt'
import { dateFormatter } from '@/utils/date'
import ProjectPicker from '@/views/media/projectPicker.tsx'
import {storeToRefs} from "pinia";
import useUserInfoStore from '@/store/modules/userInfo'
const { $useDict, $parse } = useGlobal<GlobalPropertiesApi>()
const { group_propaganda_ratio, group_propaganda_type } = $useDict(
  'group_propaganda_ratio',
  'group_propaganda_type'
)
const userInfoStore = useUserInfoStore()
const {roles, userId, orgCode} = storeToRefs(userInfoStore)
// 开始时间和结束时间
const startTime = ref<Date>()
const endTime = ref<Date>()
// 是否为集团角色
const isCulture = ref<Boolean>()
const form = reactive<PropagandaMain>(new PropagandaMain())
const showPicker = ref(false)
const scoreMainId = ref('')
const result = ref('')
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
  extra_1_text.value = ''
  extra_1_list.value = []
  extra_1_field.value = false
  extra_2_text.value = ''
  extra_2_list.value = []
  extra_2_field.value = false
  form.otherScore1Id = ''
  form.otherScore2Id = ''
  form.scoreExtra2Count = 0
}
const clearScoreStandard = () => {
  form.scoreDetailId = ''
  scoreDetailText.value = ''
}
// 获取集团认定id
const getGroupRatio = (val: any) => {
  const ratioArr = toRaw(toRaw(group_propaganda_ratio).value)

  const obj = ratioArr.filter((item: any) => {
    if (item.value == val) {
      return item
    }
  })

  return toRaw(obj[0]).label
}
// 赋分依据确定
const onScoreDetailConfirm = async ({ selectedOptions }: PickerOption) => {
  resetExtra()
  const lastOne = last(selectedOptions) as any
  form.optionMultiFlag = lastOne.optionMultiFlag
  form.scoreDetailId = selectedOptions
    .map((option: PickerOption) => option.id)
    .join(',')
  scoreDetailText.value = selectedOptions
    .map((option: PickerOption) => option.text)
    .join('/')
  if (isCulture.value) {
    const kind = await getNewMediaConfirm({ scoreId: form.scoreDetailId! });
    if (kind.data && !form.groupConfirmKind) {
      form.groupConfirmKind = kind.data;
    }
  }
  try {
    const { data } = await listOption({
      mainId: scoreMainId.value,
      parentId: lastOne.id,
    })

    extra_1_list.value = data
    if (data.length > 0) {
      showExtra.value = true
      extra_1_field.value = true
    }

    // 检查是否需要上限
    checkLimitScoreDetailId(selectedOptions);
  } catch (e) {
    console.error(e)
  } finally {
    showScoreDetail.value = false
  }
}

async function checkLimitScoreDetailId(val) {
  const obj = {
    orgCode: orgCode,
    scoreMainId: scoreMainId.value,
    scoreDetailId: val.join(",")
  };

  const { data } = await validatorAchieveScoreEnough(obj);
  // 该目标已达成分数
  const achieveScore = data.achieveScore;
  // 该分类设定的目标分数
  const limitScore = data.limitScore;
  // 该目标达成分数有无达到上限
  const enough = data.enough;
  // 该目标是否为需要上限的分类
  const requireUpper = data.requireUpper;

  if (requireUpper && enough) {
    alert(
        "本公司本年度当前赋分依据已通过分数为 " +
        achieveScore +
        " 分，已达到集团设定上限 " +
        limitScore +
        " 分。继续申报年度将不再累计分数。"
    );
  }
}
//  是否有集团文化部角色
const checkCultureRole = async () => {
  // 查询当前登陆人是否为集团文化部角色
  const { data } = await checkRole()
  isCulture.value = data
}
// 额外加分1下拉框
const extra_1_field = ref(false)
const extra_1_pop = ref(false)
const extra_1_text = ref('')
const extra_1_list = ref<[]>()
const extra_1_confirm = async ({ selectedOptions }: PickerOption) => {
  const lastOne = last(selectedOptions) as any
  form.otherScore1Id = selectedOptions[0].id
  extra_1_text.value = selectedOptions[0].text

  try {
    const { data } = await listOption({
      mainId: scoreMainId.value,
      parentId: lastOne.id,
    })
    extra_2_list.value = data
    if (data.length > 0) {
      extra_2_field.value = true
    } else {
      form.otherScore2Id = ''
      form.scoreExtra2Count = 0
      extra_2_text.value = ''
      extra_2_list.value = []
      extra_2_field.value = false
    }
  } catch (e) {
    console.error(e)
  } finally {
    extra_1_pop.value = false
  }
}
// 额外加分2下拉框
const extra_2_field = ref(false)
const extra_2_pop = ref(false)
const extra_2_text = ref('')
const extra_2_list = ref<[]>()
const extra_2_confirm = ({ selectedOptions }: PickerOption) => {
  form.otherScore2Id = selectedOptions[0].id
  extra_2_text.value = selectedOptions[0].text
  extra_2_pop.value = false
}
// 下拉菜单
const getTreeOptions = async () => {
  try {
    // 获取赋分依据级联下拉框
    const { data } = await listStandCascadeList({
      type: '',
      operaType: '',
    })
    scoreMainId.value = data.mainId
    form.scoreMainId = data.mainId
    scoreOption.value = rmEmptyChildren(data.data)
  } finally {
  }
}
// 媒体类别
const columns = [
  {
    value: '2',
    text: '视频',
  },
  {
    value: '1',
    text: '图片',
  },
  {
    value: '3',
    text: '其他',
  },
]
// 获取时间戳
const getDateTime = async () => {
  const { data } = await getDateRange()
  startTime.value = data?.startDate

  endTime.value = data?.endDate
}
// 报道日期
const showReportTime = ref(false)
const reportTimeText = ref('')

const onReportTimeConfirm = ({ selectedOptions }: PickerOption) => {
  form.reportTime = $parse(
    joinDate(selectedOptions, 'value', '-'),
    'YYYY-MM-DD HH:mm:ss'
  )
  reportTimeText.value = joinDate(selectedOptions, 'text')
  showReportTime.value = false
}

// 0:编辑 1：提交 2：基层审核通过 3：基层审核退回 4:基层向公司申诉
// 5：提交集团待审 6：集团审核通过 7：集团审核退回 8:公司向集团申诉
const onSubmit =async () => {
  const groupKind = form.groupConfirmKind
  if (groupKind) {
    form.groupRatio = toRaw(getGroupRatio(groupKind))
    const { data } = await checkScoreDetail({
            scoreId: form.scoreDetailId!,
            kind: groupKind
    });
    if(!data){
      showConfirmDialog({
      title: '警告',
      message:"赋分依据类型应与认定归类类型挂钩 \n" +"即非新媒体赋分不能选新媒体归类/新媒体赋分必须选择新媒体归类",
    }).then(isProject).catch(()=>{
    })
    }else{
      isProject()
    }
  }else{
    isProject()
  }

}
// 抽取提交的公共逻辑
const handleSubmit=()=>{
  form.reportStatus = '0'
    addPropaganda(form).then((res) => {
      if (res.code === 200) {
        showSuccessToast(res.msg || '提交成功')
        emitter.emit('refresh')
        router.go(-1)
      }
  })
}
// 弹出层嵌套抽离
const isProject=()=>{
  if (!form.projectId) {
    showConfirmDialog({
      title: '警告',
      message: '您未选择项目 当前申报将直接挂靠公司 是否确定？',
    })
      .then(handleSubmit)
      .catch(() => {
        // on cancel
      })
  } else {
    handleSubmit()
  }
}
// 确认
const onConfirm = ({ selectedOptions }: PickerOption) => {
  result.value = selectedOptions[0]?.text
  showPicker.value = false
  form.fileTypename = selectedOptions[0]?.text
  form.fileType = selectedOptions[0]?.value
  form.commonList = []
  form.imageList = []
  form.videoList = []
}
const onOversize = () => {
  showToast('文件大小超过50mb，请重新上传')
}
// 外部链接校验
const validator = (val: string) =>
  val
    ? /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/.test(
      val
    )
    : true

onBeforeMount(async () => {
  await getTreeOptions()
  await checkCultureRole()
  await getDateTime()
})
</script>
<template>
  <section class="container">
    <van-form input-align="left" @submit="onSubmit">
      <van-cell-group inset>
        <!-- 赋分依据 -->
        <van-field required v-model="scoreDetailText" is-link clearble label="赋分依据" placeholder="请选择赋分依据"
          autocomplete="off" @clear="clearScoreStandard" @click="showScoreDetail = true"
          :rules="[{ required: true, message: '请选择赋分依据' }]" />
        <van-popup v-model:show="showScoreDetail" round position="bottom">
          <van-cascader :closeable="false" title="赋分依据" :options="scoreOption" :field-names="fieldNames"
            @finish="onScoreDetailConfirm" />
        </van-popup>
        <!-- 额外附加分 -->
        <van-cell clickable title="" @click="toggle" v-if="extra_1_field">
          <template #value>
            <div class="flex gap-2 justify-end items-center">
              <span>额外加分项</span>
              <van-checkbox v-model="showExtra" icon-size="16px" @click.stop />
            </div>
          </template>
        </van-cell>
        <!-- 额外加分项1 -->
        <van-field v-if="extra_1_field && showExtra" v-model="extra_1_text" is-link readonly label="额外加分项1"
          placeholder="请选择额外加分项1" @click="extra_1_pop = true" />
        <van-popup v-model:show="extra_1_pop" round position="bottom">
          <van-picker :columns="extra_1_list" :columns-field-names="{ text: 'text', value: 'id' }" teleport="body"
            @confirm="extra_1_confirm" @cancel="extra_1_pop = false" />
        </van-popup>
        <!-- 额外加分项2 -->
        <van-field v-if="extra_2_field && showExtra" v-model="extra_2_text" is-link readonly label="额外加分项2"
          placeholder="请选择额外加分项2" @click="extra_2_pop = true" />

        <van-popup v-model:show="extra_2_pop" round position="bottom">
          <van-picker :columns="extra_2_list" :columns-field-names="{ text: 'text', value: 'id' }" teleport="body"
            @confirm="extra_2_confirm" @cancel="extra_2_pop = false" />
        </van-popup>
        <!-- 集团认定分类 -->
        <v-picker v-if="isCulture" required :rules="[{ required: true, message: '请选择集团认定归类' }]"
          v-model="form.groupConfirmKind" :columns="group_propaganda_type" :columns-field-names="{
            text: 'label',
            value: 'value',
          }" label="集团认定归类" placeholder="请选择集团认定归类" @confirm="onConfirm" />
        <!-- 报道标题 -->
        <van-field required v-model="form.reportTitle" label="报道标题" placeholder="请输入报道标题"
          :rules="[{ required: true, message: '请输入报道标题' }]" />
        <!-- 项目工程名称 -->
        <project-picker :rules="[]" :required="false" v-model:id="form.projectId" v-model:name="form.projectName" />

        <!-- 报道摘要 -->
        <van-field required v-model="form.reportBrief" rows="2" autosize show-word-limit maxlength="100" type="textarea"
          label="报道摘要" placeholder="请输入报道摘要" :rules="[{ required: true, message: '请输入报道摘要' }]" />

        <!-- 报道日期 -->
        <van-field required v-model="reportTimeText" is-link readonly name="datePicker" label="报道日期" placeholder="请选择报道日期"
          @click="showReportTime = true" :rules="[{ required: true, message: '请选择报道日期' }]" />
        <van-popup v-model:show="showReportTime" position="bottom">
          <van-date-picker title="报道日期" :min-date="new Date(startTime)" :max-date="new Date(endTime)"
            :formatter="dateFormatter" @confirm="onReportTimeConfirm" @cancel="showReportTime = false" />
        </van-popup>
        <!-- 外部链接 -->
        <van-field v-model="form.outLink" :rules="[{ validator, message: '请填写正确链接地址' }]" label="外部链接"
          placeholder="请输入外部链接" />
        <!-- 资源类型 -->
        <van-field v-model="form.fileTypename" is-link readonly name="picker" label="资源类型" placeholder="点击资源类型"
          @click="showPicker = true" />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-picker :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
        </van-popup>
        <!-- 普通附件 -->
        <van-field label="普通附件" v-if="form.fileType == '3'">
          <template #input>
            <v-uploader url="oss" :max-count="5" :max-size="50 * 1024 * 1024" @oversize="onOversize"
              v-model="form.commonList" type="file" />
          </template>
        </van-field>
        <!-- 图片素材 -->
        <van-field label="图片素材" v-if="form.fileType == '1'">
          <template #input>
            <v-uploader url="oss" :max-count="5" v-model="form.imageList" type="image" />
          </template>
        </van-field>
        <!-- 视频素材 -->
        <van-field label="视频素材" v-if="form.fileType == '2'">
          <template #input>
            <v-uploader url="oss" :max-count="5" v-model="form.videoList" type="video" />
          </template>
        </van-field>
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
