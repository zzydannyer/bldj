<script setup lang="ts">
// 审批
import {listAuditPropagandaMedia} from '@/api/media/propaganda'
import {PropagandaMainQuery} from '@/types/_media/propaganda'
import {useGlobal} from '@/utils'
import useUserInfoStore from '@/store/modules/userInfo'
import {storeToRefs} from 'pinia'
import {Icon} from '@iconify/vue'

defineOptions({
  name: 'PropagandaApprovalNew',
})
const userInfoStore = useUserInfoStore()
const {$useDict, $parse} = useGlobal<GlobalPropertiesApi>()
const router = useRouter()
const queryParams = reactive<PropagandaMainQuery>(new PropagandaMainQuery())
const statusMap: any = {
  0: '编辑',
  1: '提交',
  2: '基层审核通过',
  3: '基层审核退回',
  4: '基层向公司申诉',
  5: '提交集团待审',
  6: '集团审核通过',
  7: '集团审核退回',
  8: '公司向集团申诉',
  9: '集团复核撤销',
}
const {roles, userId, orgCode} = storeToRefs(userInfoStore)
const isCompany = computed(
    () => roles?.value?.includes('company-jbr')
)
// 是否为后台管理
const isAdmin = computed(() => roles?.value?.includes('admin'))
const listRef = ref()
const handleSearch = () => {
  listRef.value.onRefresh()
}
//提交至集团
const handleGroup = async (id: number) => {
  router.push('/propaganda/approval/create/' + id + '/' + '1002')
}
// 查看
const handleDetail = (id: number) => {
  router.push('/propaganda/filing/detail/' + id)
}
</script>
<template>
  <main class="list-container">
    <v-search
        :show-pop-icon="false"
        placeholder="请输入报道标题"
        v-model:searchVal="queryParams.reportTitle"
        @handle-search="handleSearch"
    >
      <template #dropMenu>
        <van-tabs
            v-model:active="queryParams.params.auditStatus"
            @change="handleSearch"
        >
          <van-tab title="待审核" name="auditing"/>
          <van-tab title="已审核" name="audited"/>
        </van-tabs>
      </template>
    </v-search>
    <v-inset-list
        :shows="['search', 'tabs']"
        :list-fn="listAuditPropagandaMedia"
        :query-params="queryParams"
        ref="listRef"
    >
      <template #default="{ row, index }">
        <v-card>
          <van-text-ellipsis
              class="v-list-title"
              :content="row.reportTitle"
              rows="2"
          />
          <!-- 审核状态 -->
          <v-plain-tag class="mt-1" border type="primary">
            {{ statusMap[row.reportStatus] }}
          </v-plain-tag>

            <div class="v-author mt-1">
              <van-icon name="contact-o"/>
              {{ row.mediaName }}
            </div>
            <div class="v-date mt-1">
              <van-icon name="clock-o"/>
              {{ $parse(row.createTime) }}
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
                round
                text="审 核"
                size="mini"
                v-auth="['multimedia:propaganda:audit']"
                v-if="queryParams.params.auditStatus == 'auditing' && !isAdmin"
                type="primary"
                @click="
                router.push('/propaganda/approval/audit/' + row.id + '/' + 2)
              "
            />
            <van-button
                class="px-4"
                round
                text="提交至集团审核"
                size="mini"
                v-auth="['multimedia:propaganda:auditToGroup']"
                v-if="
                queryParams.params.auditStatus == 'audited' &&
                row.reportStatus == '2' &&
                row.lastAuditorId == userId &&
                isCompany
              "
                type="success"
                @click="handleGroup(row.id)"
            />
          </section>
        </v-card>
      </template>
    </v-inset-list>
  </main>
</template>

<style scoped></style>
