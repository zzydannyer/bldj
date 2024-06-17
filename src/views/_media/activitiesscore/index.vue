<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import { MediaMainQuery } from '@/types/_media'
  import {
    listMediaActivitiesScoreWithPending,
    listMediaActivitiesScoreWithCompleted,
  } from '@/api/media'
  import { router } from '@/router'
  import { useGlobal } from '@/utils'
  import { emitter } from '@/plugins/mitt'
  const queryParams = reactive<MediaMainQuery>(new MediaMainQuery())
  const initQueryParams = () => ({
    activitiesName: '',
    resourceName: '',
  })
  const { $parse } = useGlobal<GlobalPropertiesApi>()
  const listRef = ref()
  const handleSearch = () => {
    listRef.value.onRefresh()
  }
  // 重置
  const resetQuery = () => {
    Object.assign(queryParams, initQueryParams())
  }
  const status = ref('pending')
  const listFn = computed(() =>
    status.value === 'pending'
      ? listMediaActivitiesScoreWithPending
      : listMediaActivitiesScoreWithCompleted
  )
  // 查看详情页
  const handleDetail = (id: string, activitiesId: string) => {
    router.push('/media/mediaActivitiesScore/detail/' + id + '/' + activitiesId)
  }
  // 打分
  const handleGrade = (id: string, activitiesId: string) => {
    router.push('/media/mediaActivitiesScore/update/' + id + '/' + activitiesId)
  }
  // 刷新数据
  onMounted(() => emitter.on('refresh', handleSearch))

  onBeforeUnmount(() => emitter.off('refresh'))
</script>
<template>
  <main class="list-container">
    <v-search
      showTabs
      placeholder="请输入活动名称"
      v-model:searchVal="queryParams.activitiesName"
      @handle-search="handleSearch"
    >
      <template #popMenu>
        <van-field
          v-model="queryParams.resourceName"
          name="资源名称"
          label="资源名称"
          placeholder="请输入资源名称"
        />
        <van-button
          block
          plain
          type="primary"
          class="border-0"
          @click="resetQuery"
        >
          重置
        </van-button>
      </template>
      <template #dropMenu>
        <van-tabs v-model:active="status" @change="handleSearch">
          <van-tab title="未评分" name="pending" />
          <van-tab title="已评分" name="completed" />
        </van-tabs>
      </template>
    </v-search>

    <v-inset-list :list-fn="listFn" :query-params="queryParams" ref="listRef">
      <template #default="{ row }">
        <van-swipe-cell stop-propagation>
          <section
            class="v-list-item"
            @click="handleDetail(row.id, row.activitiesId)"
          >
            <van-text-ellipsis
              class="v-list-title"

              :content="row.activitiesName"
              rows="2"
            />
            <div class="between-end">
              <!-- 作者 -->
              <div class="v-company">
                {{ row.targetUserName }}
              </div>

              <div class="v-company">
                {{ row.mediaType === '2' ? '视频' : '图片' }}
              </div>
            </div>
            <div class="between-end">
              <!-- 资源标题 -->
              <div class="v-company">
                {{ row.resourceName }}
              </div>
              <!-- 时间 -->
              <div class="v-company">
                {{ $parse(row.shootingTime) }}
              </div>
            </div>
          </section>
          <template #right>
            <div v-if="status == 'pending'" class="h-full">
              <van-button
                text="评分"
                v-auth="['multimedia:media:audit']"
                type="primary"
                square
                class="h-full"
                @click="handleGrade(row.id, row.activitiesId)"
              />
            </div>
          </template>
        </van-swipe-cell>
      </template>
    </v-inset-list>
  </main>
</template>
