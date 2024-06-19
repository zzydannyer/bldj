<script setup lang="ts">
  import { MediaMainQuery } from '@/types/_media';
  import { useGlobal } from '@/utils';
  import ResourceType from '@/views/media/resourceType.tsx';
  const { $parse } = useGlobal<GlobalPropertiesApi>();

  defineOptions({
    name: 'MediaList'
  });

  const router = useRouter();

  const queryParams = reactive<MediaMainQuery>(new MediaMainQuery());
  // 重置
  const resetQuery = () => {
    Object.assign(queryParams, new MediaMainQuery());
    mediaTypeQueryArray.value = [];
  };

  const onChangeMediaType = (value: string[]) => {
    if (value.length === 2 || value.length === 0) {
      queryParams.mediaType = '';
      return;
    }
    queryParams.mediaType = value[0];
  };

  const mediaTypeQueryArray = ref([]);
  const listRef = ref();

  const handleSearch = () => {
    queryParams.shootingTime = queryParams.shootingTime ? (queryParams.shootingTime = $parse(queryParams.shootingTime, 'YYYY-MM-DD HH:mm:ss')) : '';
    listRef.value.onRefresh();
  };

  const handleDetail = (id: number) => {
    router.push('/media/list/detail/' + id);
  };
</script>

<template>
  <main class="list-container">
    <v-search placeholder="请输入项目名称" v-model:searchVal="queryParams.projectName" @handle-search="handleSearch">
      <template #popMenu>
        <!-- 资源类别 -->
        <resource-type :required="false" v-model="queryParams.resourceType" />

        <!-- 拍摄时间 -->
        <v-date-picker v-model="queryParams.shootingTime" label="拍摄时间" placeholder="请选择拍摄时间" />

        <van-button block plain type="primary" class="border-0" @click="resetQuery"> 重置 </van-button>
      </template>
    </v-search>

    <v-inset-list :shows="['search']" :list-fn="listMediaPublic" :query-params="queryParams" ref="listRef">
      <template #default="{ row }">
        <v-card body-class="flex flex-between gap-2">
          <van-image width="100" height="100" fit="cover" :src="row.thumbnailUrl" />
          <section class="flex-1">
            <van-text-ellipsis class="v-list-title" :content="row.resourceName" rows="2" />
            <v-plain-tag type="primary" size="mini">
              {{ row.resourceTypeName }}
            </v-plain-tag>
            <div class="start-center gap-1 mt-1">
              <span class="v-author">
                <van-icon name="contact-o" />
                {{ row.author }}
              </span>
              <span class="v-date">
                <van-icon name="clock-o" />
                {{ $parse(row.shootingTime) }}
              </span>
            </div>
          </section>

          <section class="absolute right-2 bottom-2">
            <van-button class="px-4" round type="default" hairline size="mini" text="查 看" @click="handleDetail(row.id)" />
          </section>
        </v-card>
      </template>
    </v-inset-list>
  </main>
</template>
