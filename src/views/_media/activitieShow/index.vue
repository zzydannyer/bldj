<script setup lang="ts">
  import { listPublicMediaActivitiesScore } from '@/api/media'
  import { MediaMainQuery } from '@/types/_media'
  import { useGlobal } from '@/utils'
  import ResourceType from '@/views/media/resourceType.tsx'

  const { $parse } = useGlobal<GlobalPropertiesApi>()

  defineOptions({
    name: 'MediaList',
  })

  const router = useRouter()

  const queryParams = reactive<MediaMainQuery>(new MediaMainQuery())
  // 重置
  const resetQuery = () => {
    Object.assign(queryParams, new MediaMainQuery())
    mediaTypeQueryArray.value = []
  }

  const onChangeMediaType = (value: string[]) => {
    if (value.length === 2 || value.length === 0) {
      queryParams.mediaType = ''
      return
    }
    queryParams.mediaType = value[0]
  }

  const mediaTypeQueryArray = ref([])
  const listRef = ref()

  const handleSearch = () => {
    queryParams.shootingTime = queryParams.shootingTime
      ? (queryParams.shootingTime = $parse(
          queryParams.shootingTime,
          'YYYY-MM-DD HH:mm:ss'
        ))
      : ''
    listRef.value.onRefresh()
  }

  const handleDetail = (id: number, activitiesId: string) => {
    router.push('/media/mediaActivities/detail/' + id + '/' + activitiesId)
  }
</script>

<template>
  <main class="list-container">
    <v-search
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
    </v-search>

    <v-inset-list
      :shows="['search']"
      :list-fn="listPublicMediaActivitiesScore"
      :query-params="queryParams"
      ref="listRef"
    >
      <template #default="{ row }">
        <v-card
          body-class="flex flex-between gap-2"
          @click="handleDetail(row.id, row.activitiesId)"
        >
          <van-image width="100" height="100" :src="row.thumbnailUrl" />

          <section class="flex-1 text-sm flex-col between-start">
            <div class="w-full">
              <van-text-ellipsis
                class="v-list-title"

                :content="row.activitiesName"
                rows="2"
              />
            </div>
            <v-plain-tag type="success">
              {{ row.resourceName }}
            </v-plain-tag>
            <div class="text-sm v-date">
              {{ row.projectName }}
            </div>

            <div class="w-full between-center">
              <span class="v-date self-end">
                {{ $parse(row.shootingTime) }}
              </span>
            </div>
          </section>
        </v-card>
      </template>
    </v-inset-list>
  </main>
</template>
