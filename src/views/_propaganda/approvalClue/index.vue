<script setup lang="ts">
import {checkRole,} from '@/api/media/propaganda'
import {PropagandaMainQuery} from '@/types/_media/propaganda'
import {useGlobal} from '@/utils'
import useUserInfoStore from '@/store/modules/userInfo'
import {emitter} from '@/plugins/mitt'
import {storeToRefs} from 'pinia'
import {listAuditPropagandaClue} from "@/api/media/propagandaClue.ts";

defineOptions({
  name: 'PropagandaClueApproval',
})
const userInfoStore = useUserInfoStore()
const { userId} =
    storeToRefs(userInfoStore)
const router = useRouter()
const {$useDict, $parse} = useGlobal<GlobalPropertiesApi>()
const { PRO_CLUE_STATUS } = $useDict(
    'PRO_CLUE_STATUS',
)
const queryParams = reactive<PropagandaMainQuery>(new PropagandaMainQuery())

const listRef = ref()
const handleSearch = () => {
  listRef.value.onRefresh()
}

// 审 核
const handleAudit = (id: number) => {
  router.push('/propaganda/approval-clue/audit/' + id)
}
//查看
const handleDetail = (id: number) => {
  router.push('/propaganda/clue-filing/detail/' + id)
}

onBeforeMount()
// 刷新数据
onMounted(() => emitter.on('refresh', handleSearch))

onBeforeUnmount(() => emitter.off('refresh'))
</script>
<template>
  <main class="list-container">
    <v-search
        placeholder="请输入项目名称"
        v-model:searchVal="queryParams.projectName"
        @handle-search="handleSearch"
    />

    <v-inset-list
        :shows="['search']"
        :list-fn="listAuditPropagandaClue"
        :query-params="queryParams"
        ref="listRef"
    >
      <template #default="{ row, index }">
        <v-card>
          <van-text-ellipsis
              class="v-list-title"
              :content="row.projectName"
              rows="2"
          />
          <div class="between-end">
            <v-tag
                class="mt-2"
                plain
                :dictData="PRO_CLUE_STATUS"
                :value="row.clueStatus"
            />
            <van-tag plain type="primary" class="mt-2">
              {{ row.orgName }}
            </van-tag>
          </div>
            <span class="v-date mt-2">
              <van-icon name="clock-o"/>
              {{ $parse(row.startTime) }}-{{ $parse(row.endTime) }}
            </span>

          <br/>
          <br/>
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
                round
                type="danger"
                size="mini"
                @click="handleAudit(row.id)"
                v-if="row.clueStatus == '1'"
                v-auth="['multimedia:propagandaClue:audit']"
            />
          </section>
        </v-card>
      </template>
    </v-inset-list>
  </main>
</template>

<style lang="scss" scoped>
.button-swipe {
  height: 40px;
  line-height: 40px;
}
</style>
