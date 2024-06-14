<script setup lang="ts">
import { _5_years_ago, formatDate } from '@/utils/date'
import {
  closeToast,
  showImagePreview,
  showLoadingToast,
  showToast,
} from 'vant'
import { getPropaganda, listAuditRecord } from '@/api/media/propaganda'
import { PropagandaAuditBo, PropagandaAuditVo, PropagandaMain } from '@/types/media/propaganda'
import { useGlobal } from '@/utils'

const {$useDict, $parse} = useGlobal<GlobalPropertiesApi>()
const { PRO_IMPORTANT_CLUE_STATUS } = $useDict(
    'PRO_IMPORTANT_CLUE_STATUS',
)
const route = useRoute()
const detail = ref<PropagandaMain>(new PropagandaMain())
const auditList = ref<PropagandaAuditVo[]>([])
const id = route.params.id as string
const groupScoreDesc = ref<string[]>([])
const scoreDesc = ref<string[]>([])

// 赋分依据详情
const getMediaLsit = async () => {
  try {
    showLoadingToast({ message: '加载中' })
    const { data } = await getPropaganda(id, 'view')
    detail.value = data!
    if (detail.value.scoreDesc) {
      scoreDesc.value = detail.value.scoreDesc
        .split('>')
        .map((item: string) => item)
    }
    if (detail.value.groupScoreDesc) {
      groupScoreDesc.value = detail.value.groupScoreDesc
        .split('>')
        .map((item: string) => item)
    }
  } catch (e) {
    console.error(e)
  } finally {
    closeToast()
  }
}

// 放大预览图片
const showImage = (url: any) => {
  const imgurl = url.map((item: any) => item.url)
  showImagePreview(imgurl)
}

// 审核记录
const getAuditRecord = async () => {
  const { data } = await listAuditRecord({ mainId: id })
  auditList.value = data!
}
// 状态
const matchText: Record<string, string> = {
  0: '创建',
  1: '通过',
  2: '退回',
  3: '基层向公司申诉',
  4: '公司向集团申诉',
  5: "集团复核调整",
  6: "集团复核撤销",
  7: "集团复核撤回撤销"
}

onMounted(() => {
  getMediaLsit()
  getAuditRecord()
})
</script>
<template>
  <main class="container">
    <v-card>
      <van-cell-group inset>
        <section class="section-title">{{ detail.reportBrief }}</section>
        <van-form input-align="right">
          <van-field>
            <template #label>项目名称</template>
            <template #input>{{ detail.projectName }}</template>
          </van-field>
          <van-field>
            <template #label>报道时间</template>
            <template #input>{{ formatDate(detail.reportTime) }}</template>
          </van-field>
          <van-field v-show="detail.companyFormula">
            <template #label>公司赋分公式</template>
            <template #input>{{ detail.companyFormula }}</template>
          </van-field>
          <van-field v-show="detail.groupFormula">
            <template #label>集团赋分公式</template>
            <template #input>{{ detail.groupFormula }}</template>
          </van-field>
          <van-field>
            <template #label>外部链接</template>
            <template #input>
              <van-text-ellipsis :content="detail.outLink" expand-text="展开" collapse-text="收起" />
            </template>
          </van-field>

          <van-field v-show="scoreDesc.length > 0">
            <template #label>赋分依据</template>
            <template #input>
              <div class="vant-steps--revert">
                <van-steps direction="vertical" :active="scoreDesc.length" inactive-color="#07c160">
                  <van-step v-for="(item, index) in scoreDesc" :key="index">
                    {{ item }}
                  </van-step>
                </van-steps>
              </div>
            </template>
          </van-field>

          <van-field v-show="groupScoreDesc.length > 0">
            <template #label>集团赋分依据</template>
            <template #input>
              <div class="vant-steps--revert">
                <van-steps direction="vertical" :active="groupScoreDesc.length" inactive-color="#07c160">
                  <van-step v-for="(item, index) in groupScoreDesc" :key="index">
                    {{ item }}
                  </van-step>
                </van-steps>
              </div>
            </template>
          </van-field>

          <van-field v-show="detail.clueScore && Number(detail.clueScore)!=0">
            <template #label>新闻线索分数</template>
            <template #input>{{ detail.clueScore }}</template>
          </van-field>

          <van-field v-show="detail.clueScore && Number(detail.clueScore)!=0">
            <template #label>新闻线索类型</template>
            <template #input>{{  PRO_IMPORTANT_CLUE_STATUS.find(
                item => item.value === detail.clueType
            )?.label }}</template>
          </van-field>
          <van-field v-show="detail.clueScore && Number(detail.clueScore)!=0">
            <template #label>新闻线索分比例</template>
            <template #input>{{Number(detail.clueRatio)}}%</template>
          </van-field>


          <p v-if="detail.appealBrief">
            申诉内容：
            <span>{{ detail.appealBrief }}</span>
          </p>
          <van-cell v-if="detail.imageList && detail.imageList.length > 0">
            <template #title>图片素材</template>
            <template #value>
              <van-image @click="showImage(detail.imageList)" v-for="(item, index) in detail.imageList" :key="index"
                :src="item.url" />
            </template>
          </van-cell>
          <van-cell v-else-if="detail.videoList && detail.videoList?.length > 0">
            <template #title>视频素材:</template>
            <template #value>
              <v-uploader url="oss" :disabled="true" v-model="detail.videoList" type="video" />
            </template>
          </van-cell>
          <van-cell v-else-if="detail.commonList && detail.commonList?.length > 0">
            <template #title>普通附件</template>
            <template #value>
              <v-uploader url="oss" :disabled="true" readonly v-model="detail.commonList" type="file" />
            </template>
          </van-cell>
        </van-form>
      </van-cell-group>
    </v-card>

    <v-card style="margin-top: 20px">
      <section class="section-title">审核记录</section>
      <div v-if="auditList.length > 0">
        <van-steps direction="vertical" finish-icon="checked" :active="auditList.length">
          <van-step v-for="(audit, index) in auditList" :key="index">
            <div>状态:{{ audit.auditResult && matchText[audit.auditResult] }}</div>
            <div>{{ audit.auditRoleName }}:{{ audit.auditName }}</div>
            <div>审核时间：{{ $parse(audit.createTime) }}</div>
            <div v-if="audit.auditResult !== '0'">
              {{
                audit.auditResult === '3' || audit.auditResult === '4'
                ? '申诉内容'
                : '审核意见'
              }}
              {{ audit.auditDesc }}
            </div>
          </van-step>
        </van-steps>
      </div>
      <template v-else>暂无审核记录</template>
    </v-card>
  </main>
</template>

<style scoped>
.van-cell {
  padding-left: 0;
  padding-right: 0;
}
</style>
