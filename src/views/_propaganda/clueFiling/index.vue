<script setup lang="ts">
// 审批
import {useGlobal} from '@/utils'
import useUserInfoStore from '@/store/modules/userInfo'
import {storeToRefs} from 'pinia'
import {showConfirmDialog, showSuccessToast} from "vant";
import {delPropagandaClue, listPropagandaClue, submitPropagandaClue} from "@/api/media/propagandaClue.ts";
import {hasAuth} from "@/utils/auth.ts";
import {PropagandaClueQuery} from "@/types/_media/propagandaClue";
import {emitter} from '@/plugins/mitt'

defineOptions({
  name: 'PropagandaClueFiling',
})
const userInfoStore = useUserInfoStore()
const {$useDict, $parse} = useGlobal<GlobalPropertiesApi>()
const { PRO_CLUE_STATUS } = $useDict(
    'PRO_CLUE_STATUS',
)

const router = useRouter()
const queryParams = reactive<PropagandaClueQuery>(new PropagandaClueQuery())
const {roles, userId, orgCode} = storeToRefs(userInfoStore)
const isCompany = computed(
    () => roles?.value?.includes('company-jbr')
)
const listRef = ref()
const handleSearch = () => {
  listRef.value.onRefresh()
}


// 提交
const handleSubmit = (id: number) => {
  showConfirmDialog({
    title: '确认提交吗?',
  }).then(() => {
    submitPropagandaClue(id).then((res) => {
      if (res.code === 200) {
        showSuccessToast('提交成功')
        handleSearch()
      }
    })
  })
}

// 删除
const handleDelete = (id: number) => {
  showConfirmDialog({
    title: '确认删除吗?',
  }).then(() => {
    delPropagandaClue(id).then((res) => {
      if (res.code === 200) {
        showSuccessToast('删除成功')
        handleSearch()
      }
    })
  })
}
//查看
const handleDetail = (id: number) => {
  router.push('/propaganda/clue-filing/detail/' + id)
}

const handleUpdate = (id: Numeric) => {
  router.push('/propaganda/clue-filing/update/' + id)
}
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

    <van-floating-bubble
        axis="xy"
        magnetic="x"
        v-if="hasAuth('multimedia:propagandaClue:edit')"
    >
      <van-button
          type="primary"
          size="large"
          round
          to="/propaganda/clue-filing/create"
      >
        <van-swipe
            vertical
            class="button-swipe"
            :autoplay="4000"
            :duration="600"
            :touchable="false"
            :show-indicators="false"
        >
          <van-swipe-item>
            <van-icon name="plus"/>
          </van-swipe-item>
          <van-swipe-item class="whitespace-nowrap">新增</van-swipe-item>
        </van-swipe>
      </van-button>
    </van-floating-bubble>

    <v-inset-list
        :shows="['search']"
        :list-fn="listPropagandaClue"
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
                text="提 交"
                round
                type="success"
                size="mini"
                v-auth="['multimedia:propagandaClue:submit']"
                @click="handleSubmit(row.id)"
                v-if="userId == row.creatorId && row.clueStatus == '0'"
            />
            <van-button
                class="px-4"
                text="修改"
                round
                type="primary"
                size="mini"
                @click="handleUpdate(row.id)"
                v-if="userId == row.creatorId && row.clueStatus == '0'"
                v-auth="['multimedia:propagandaClue:edit']"
            />

            <van-button
                class="px-4"
                text="删 除"
                round
                type="danger"
                size="mini"
                @click="handleDelete(row.id)"
                v-if="userId == row.creatorId && row.clueStatus == '0'"
                v-auth="['multimedia:propagandaClue:remove']"
            />
          </section>
        </v-card>
      </template>
    </v-inset-list>
  </main>
</template>


<style scoped></style>
