<script setup lang="ts">
import { PropagandaAuditBo, PropagandaMain } from '@/types/media/propaganda'
import {
  addPropagandaAudit,
  checkRole,
  getPropaganda,
} from '@/api/media/propaganda'
import { listOption, listStandCascadeList } from '@/api/media/scoreStandard'
import { PickerOption, showSuccessToast, showFailToast } from 'vant'
import { last } from 'lodash'
import { toRaw } from 'vue'
import { useGlobal } from '@/utils'
import useUserInfoStore from '@/store/modules/userInfo'
import { emitter } from '@/plugins/mitt'
import { storeToRefs } from 'pinia'
import {checkChooseDetail, validateImportantClue} from "@/api/media/propagandaClue.ts";
const { $useDict, $parse } = useGlobal<GlobalPropertiesApi>()
const { group_propaganda_ratio, group_propaganda_type,   PRO_IMPORTANT_CLUE_STATUS,
  propaganda_clue_ratio } = $useDict(
  'group_propaganda_ratio',
  'group_propaganda_type',
    "PRO_IMPORTANT_CLUE_STATUS",
    "propaganda_clue_ratio"
)
const userInfoStore = useUserInfoStore()
const formref = ref()
const router = useRouter()
const route = useRoute()
const { id, type } = route.params
const loading = ref(false)
const form = reactive<PropagandaAuditBo>(new PropagandaAuditBo())
const auditMainId = ref('')
// 是否为集团角色
const isCulture = ref<Boolean>()
const showPicker = ref<Boolean>(false)
const { isGroup, isCompany } = storeToRefs(userInfoStore)

// 当前提交人所选择的项目是否为重点项目有效范围内
const importantClue = ref(false);
// 当前提交人的赋分依据是什么类别的 0:省部级媒体 1:中央媒体
const detailLevel = ref<string>("");
// 拷贝一份原先提交人的数据
const copyForm = ref<PropagandaMain>(new PropagandaMain());
// 新闻线索类别文字描述
const clueLabel = ref<string>("");

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
// 赋分根据新媒体和媒体数据过滤
const group_propaganda = computed(() => {
  let res
  if (type === '1') {
    res = JSON.stringify(
      group_propaganda_type.value.filter((i: any) => i.value !== '4')
    )
  } else if (type === '2') {
    res = JSON.stringify(
      group_propaganda_type.value.filter((i: any) => i.value === '4')
    )
  }
  return JSON.parse(res as string)
})
// 赋分依据
const scoreDetailText = ref<string>('')
const showScoreDetail = ref(false)
const scoreDatailMainid = ref<string>('')
const scoreOption = ref<any[]>([])
// 额外加分项
const showExtra = ref(false)
const fieldNames = {
  text: 'text',
  value: 'id',
  children: 'children',
}
const scoreMainId = ref<number>()
const otherScore1Id = ref<string[]>([])
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
  form.otherScoreNum = 0
}
const clearScoreStandard = () => {
  form.scoreDetailId = ''
  scoreDetailText.value = ''
}
const auditView = async () => {
  {
    const { data } = await getPropaganda(id as string, 'audit')
    copyForm.value = data;
    if (isCulture.value) {
      form.groupKind = '4'
    }
    form.optionMultiFlag = data?.optionMultiFlag
    form.otherScore1Id = data?.otherScore1Id
    form.otherScore2Id = data?.otherScore2Id
    form.otherScoreNum = form.optionMultiFlag === '1' ? 1 : 0
    // 消息推送-填充创建人，报道标题
    form.creatorId = data?.creatorId
    form.reportTitle = data?.reportTitle
    // isGroup是否为集团isCompany是否为公司
    if (isGroup.value) {
      scoreMainId.value = data?.groupScoreMainId
      scoreDatailMainid.value = data?.groupScoreDetailId?.split(',')[4] ?? ''
      scoreDetailText.value = data?.groupScoreDesc ? data?.groupScoreDesc : data?.scoreDesc as string
      form.auditDetailId = data?.groupScoreDetailId?.split(',').slice(0, 5).join(',')
    } else if (isCompany.value) {
      scoreMainId.value = data?.scoreMainId
      scoreDatailMainid.value = data?.scoreDetailId?.split(',')[3] ?? ''
      scoreDetailText.value = data?.scoreDesc as string
      form.auditDetailId = data?.scoreDetailId?.split(',').slice(0, 4).join(',')
    }
    // 额外加分回显
    if (data?.otherScore1Id) {
      extra_1_field.value = true
      otherScore1Id.value = [data.otherScore1Id!]
      const { data: resData } = await listOption({
        mainId: auditMainId.value,
        parentId: scoreDatailMainid.value,
      })

      extra_1_list.value = resData
      extra_1_text.value = resData.find((i: any) => {

        return i.id === form.otherScore1Id
      })?.text
    }


    // 处理展示新闻线索分
    if (isGroup.value && isCulture) {
      const obj = {
        projectId: copyForm.value.projectId,
        orgCode: copyForm.value.orgCode,
        reportTime: copyForm.value.reportTime,
        groupScoreMainId: copyForm.value.groupScoreMainId,
        groupScoreDetailId: copyForm.value.groupScoreDetailId?.split(',')
      };

      const {data} = await validateImportantClue(obj);
      importantClue.value = data.importantClue;
      detailLevel.value = data.clueType;

      if (importantClue.value) {
        if (detailLevel.value !== "" || detailLevel.value !== undefined) {
          clueLabel.value = PRO_IMPORTANT_CLUE_STATUS.value.find(
              item => item.value === detailLevel.value
          )?.label;
          form.clueRatio = propaganda_clue_ratio.value.find(
              item => item.value === detailLevel.value
          )?.label;
          form.clueType = detailLevel.value;
        }
      }
    }

  }
}
// 确定按钮
const onConfirm = ({ selectedOptions }: PickerOption) => {
  showPicker.value = false
  form.fileTypename = selectedOptions[0]?.text
  form.groupKind = selectedOptions[0]?.value
}
// 分数确认按钮
const onScoreDetailConfirm = async ({ selectedOptions }: PickerOption) => {
  resetExtra()
  form.auditDetailId = selectedOptions
    .map((option: PickerOption) => option.id)
    .join(',')
  const lastOne = last(selectedOptions) as any
  form.scoreDetailId = lastOne.scoreDetailId
  form.optionMultiFlag = lastOne.optionMultiFlag
  scoreDetailText.value = selectedOptions
    .map((option: PickerOption) => option.text)
    .join('/')

  try {
    const { data } = await listOption({
      mainId: auditMainId.value,
      parentId: lastOne.id,
    })

    extra_1_list.value = data
    if (data.length > 0) {
      showExtra.value = true
      extra_1_field.value = true
    }

    // 当为集团时 同时和公司提交人选择的赋分依据比较 若集团选择的不再是省部级/中央 则隐藏新闻线索，清空比例
    if (isGroup.value && isCulture) {
      const obj = {
        groupScoreMainId: scoreMainId.value,
        groupScoreDetailId: form.auditDetailId?.split(',')
      };

      const { data } = await checkChooseDetail(obj);

      if (data === "" || data === undefined) {
        importantClue.value = false;
        form.clueRatio = 0;
        form.clueType = "";
      } else {
        // importantClue.value = true;
        // form.clueRatio = propaganda_clue_ratio.value.find(
        //     item => item.value === data
        // )?.label;
        // form.clueType = data;
        // clueLabel.value = PRO_IMPORTANT_CLUE_STATUS.value.find(
        //     item => item.value === data
        // )?.label;
        // 查询当前审核所选标准的level
        const obj = {
          projectId: copyForm.value.projectId,
          orgCode: copyForm.value.orgCode,
          reportTime: copyForm.value.reportTime,
          groupScoreMainId: scoreMainId.value,
          groupScoreDetailId: form.auditDetailId?.split(',')
        };
        const { data } = await validateImportantClue(obj);
        const clueData = data
        importantClue.value = clueData.importantClue;
        detailLevel.value = clueData.clueType;

        if (importantClue.value) {
          if (detailLevel.value !== "" || detailLevel.value !== undefined) {
            clueLabel.value = PRO_IMPORTANT_CLUE_STATUS.value.find(
                item => item.value === detailLevel.value
            )?.label;
            form.clueRatio = propaganda_clue_ratio.value.find(
                item => item.value === detailLevel.value
            )?.label;
            form.clueType = detailLevel.value;
          }
        }
      }
    }

  } catch (e) {
    console.error(e)
  } finally {
    showScoreDetail.value = false
  }
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
      mainId: auditMainId.value,
      parentId: lastOne.id,
    })
    extra_2_list.value = data
    if (data.length > 0) {
      extra_2_field.value = true
    } else {
      form.otherScore2Id = ''
      form.otherScoreNum = 0
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
const getTreeOptions = async () => {
  try {
    // type类型  type为2的时候为新媒体
    const isoperaType = userInfoStore?.roles?.includes('company-jbr')
      ? 'companyAudit'
      : ' '
    let isType = (type as string) === '2' ? '1002' : '1003'
    // 获取赋分依据级联下拉框
    loading.value = true
    const { data } = await listStandCascadeList({
      type: isType,
      operaType: isoperaType,
    })
    auditMainId.value = data.mainId
    form.auditMainId = data.mainId
    scoreOption.value = rmEmptyChildren(data.data)
  } finally {
    loading.value = false
  }
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
//  是否有集团文化部角色
const checkCultureRole = async () => {
  // 查询当前登陆人是否为集团文化部角色
  const { data } = await checkRole()
  isCulture.value = data
}

// 退回
const handleReturn = async (val: string) => {
  let vaidate = await formref.value.resetValidation([
    'scoreDetailText',
    'groupKind',
  ])
  let res = await formref.value.validate(['auditDesc'])
  if (res === undefined) {
    const groupKind = form.groupKind
    form.mainId = id as string
    form.auditResult = val
    if (groupKind) {
      form.groupRatio = toRaw(getGroupRatio(groupKind))
    }
    form.otherScoreNum = form.optionMultiFlag === '1' ? 1 : 0
    let { code, msg } = await addPropagandaAudit(form)
    if (code === 200) {
      showSuccessToast(msg || '退回成功')
      emitter.emit('refresh')
      router.go(-1)
    } else {
      showFailToast(msg || '操作失败')
    }
  }
}
// 提交
const handleSubmit = async (val: string) => {
  let vaidate = await formref.value.resetValidation('auditDesc')
  form.otherScoreNum = form.optionMultiFlag === '1' ? 1 : 0
  let res = await formref.value.validate(['groupKind', 'scoreDetailText'])
  const groupKind = form.groupKind
  if (res === undefined) {
    if (groupKind) {
      form.groupRatio = toRaw(getGroupRatio(groupKind))
    }
    form.mainId = id as string
    form.auditResult = val
    let { code, msg } = await addPropagandaAudit(form)
    if (code === 200) {
      showSuccessToast(msg || '通过成功')
      emitter.emit('refresh')
      router.go(-1)
    } else {
      showFailToast(msg || '操作失败')
    }
  }
}
onBeforeMount(() => {
  getTreeOptions()
  checkCultureRole()
  auditView()
})
</script>
<template>
  <section class="container">
    <van-form ref="formref" input-align="left">
      <van-cell-group inset>
        <!-- 赋分依据 -->
        <van-field name="scoreDetailText" v-model="scoreDetailText" is-link clearble label="赋分依据" placeholder="请选择赋分依据"
          autocomplete="off" @clear="clearScoreStandard" @click="showScoreDetail = true"
          :rules="[{ required: true, message: '请选择赋分依据' }]" />
        <van-popup v-model:show="showScoreDetail" round position="bottom">
          <van-cascader :closeable="false" title="赋分依据" v-model="scoreDatailMainid" :options="scoreOption"
            :field-names="fieldNames" @finish="onScoreDetailConfirm" />
        </van-popup>
        <!-- 额外附加分 -->
        <van-cell clickable title="" @click="toggle" v-if="extra_1_field">
          <template #value>
            <div class="flex gap-2 justify-end items-center">
              <span>额外加分项</span>
              <van-checkbox v-model="extra_1_field" icon-size="16px" @click.stop />
            </div>
          </template>
        </van-cell>

        <!-- 额外加分项1 -->
        <van-field v-if="extra_1_field" v-model="extra_1_text" is-link readonly label="额外加分项1" placeholder="请选择额外加分项1"
          @click="extra_1_pop = true" />

        <van-popup v-model:show="extra_1_pop" round position="bottom">
          <van-picker v-model="otherScore1Id" :columns="extra_1_list" :columns-field-names="{ text: 'text', value: 'id' }"
            teleport="body" @confirm="extra_1_confirm" @cancel="extra_1_pop = false" />
        </van-popup>

        <!-- 集团认定分类 -->
        <v-picker name="groupKind" v-if="isCulture" required :rules="[{ required: true, message: '请选择集团认定归类' }]"
          v-model="form.groupKind" :columns="group_propaganda" :columns-field-names="{
            text: 'label',
            value: 'value',
          }" label="集团认定归类" placeholder="请选择集团认定归类" @confirm="onConfirm" />

        <!-- 新闻线索分类 -->
        <van-cell clickable title="新闻线索类别" v-show="importantClue && detailLevel !== ''">
          <template #value>
            <div class=" gap-2 justify-end items-center">
              <van-tag mark type="success" size="medium" style="text-align: center;">{{clueLabel}}</van-tag>
            </div>
            <div class="flex gap-2 justify-end items-center">
              <van-field class="unique-class" v-model="form.clueRatio" style="text-align: center" type="number" placeholder="请输入比例" :rules="[{ required: true, message: '请输入比例' }]"/>
              <span>%</span>
            </div>
          </template>
        </van-cell>

        <!-- 审核意见 -->
        <van-field autosize show-word-limit maxlength="300" type="textarea" v-model="form.auditDesc" name="auditDesc"
          label="审核意见" placeholder="请输入审核意见" :rules="[{ required: true, message: '请填写审核意见' }]" />
      </van-cell-group>
      <div class="my-4 between-center gap-2">
        <van-button round block type="primary" @click="handleSubmit('1')">
          通过
        </van-button>
        <van-button round block type="danger" @click="handleReturn('2')">
          退回
        </van-button>
      </div>
    </van-form>
  </section>
</template>
<style lang="scss" scoped>
.unique-class :deep .van-field__control {
  text-align: center;
}
</style>
