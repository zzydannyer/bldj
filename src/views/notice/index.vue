<script setup lang="ts">
import {listNotice} from '@/api/system/notice'
import {SysNoticeQuery} from '@/types/system/sysNotice'
import {useGlobal} from '@/utils'
import {formatDate} from '@/utils/date'

defineOptions({
  name: 'Notice',
})
const router = useRouter()
const {$useDict} = useGlobal<GlobalPropertiesApi>()
const {sys_notice_type} = $useDict('sys_notice_type')
const listRef = ref()
// 初始化
const initQueryParams = () => new SysNoticeQuery()

const queryParams = reactive(initQueryParams())
// 搜索
const handleSearch = () => {
  listRef.value.onRefresh()
}
</script>

<template>
  <main class="list-container">
    <v-search
        :show-pop-icon="false"
        placeholder="请输入公告标题"
        v-model:searchVal="queryParams.noticeTitle"
        @handle-search="handleSearch"
    />

    <v-inset-list
        :shows="['search']"
        :list-fn="listNotice"
        :query-params="queryParams"
        ref="listRef"
    >
      <template #default="{ row }">
        <v-card
            class="h-14"
            @click="router.push('/notice/announcement/detail/' + row.noticeId)"
        >
          <!-- 公告内容 -->
          <van-text-ellipsis
              class="v-list-title h-10"
              :content="row.noticeTitle"
              rows="2"
          />
          <div class="between-center">
            <v-tag :dictData="sys_notice_type" :value="row.noticeType"/>
            <span class="v-date">
              <van-icon name="clock-o"/>
              {{ formatDate(row.createTime) }}
            </span>
          </div>
        </v-card>
      </template>
    </v-inset-list>
  </main>
</template>

<style scoped lang="scss">
.detalis-list {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}
</style>
