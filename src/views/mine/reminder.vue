<script setup lang="ts">
  import { Icon } from '@iconify/vue';
  import { useIcon } from '@/utils/assets.ts';
  import ResourceType from '@/views/_task/execution/resourceType.tsx';
  import { listMediaPublic } from '@/api/media';
  import { jcListWorkSupervise } from '@/api';
  import { listWorkMain } from '@/api/media/taskRelease.ts';
  import { useGlobal } from '@/utils';

  const router = useRouter();
  const form = ref({ code: '' });
  const time = ref('');
  const resourceType = ref('');
  const name = ref('');
  const { $useDict, $parse } = useGlobal<GlobalPropertiesApi>();

  function getData(params: any) {
    return jcListWorkSupervise('1', params);
  }
</script>
<template>
  <div class="bg-white pt-3 h-dvh">
    <van-search v-model="value" show-action label="素材" placeholder="请输入搜索关键词" @search="onSearch">
      <template #action>
        <div @click="onClickButton">搜索</div>
      </template>
    </van-search>

    <v-inset-list :list-fn="getData" :query-params="{}" ref="listRef">
      <template #default="{ row, index }">
        <v-card class="v-list-item">
          <van-text-ellipsis class="v-list-title" :content="row.workTitle" rows="2" />

          <div class="between-center">
            <div class="v-company mt-1">
              <Icon icon="ph:buildings" v-if="row.orgName" />
              {{ row.orgName }}
            </div>

            <div class="v-date mt-1">
              <van-icon name="clock-o" />
              {{ $parse(row.publishDate) }}
            </div>
          </div>
        </v-card>
      </template>
    </v-inset-list>
  </div>
</template>
<style lang="scss" scoped>
  .bt {
    border-top: solid 20px #f5f5f5;
  }

  table {
    th,
    td {
      @apply border border-solid border-gray-200 leading-8;
    }
    th {
      @apply bg-slate-50;
    }
  }
</style>
