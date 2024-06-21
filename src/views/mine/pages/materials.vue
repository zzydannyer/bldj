<script setup lang="ts">
  import { Icon } from '@iconify/vue';
  import { useIcon } from '@/utils/assets';
  import ResourceType from '@/views/_task/execution/resourceType.tsx';
  import { listMediaPublic } from '@/api/media';

  const router = useRouter();
  const form = ref({ code: '' });
  const time = ref('');
  const resourceType = ref('');
  const name = ref('');
</script>
<template>
  <div class="bg-white pt-3 h-dvh">
    <van-search
      v-model="value"
      label="素材"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
    >
      <template #action>
        <div @click="onClickButton">搜索</div>
      </template>
    </van-search>

    <v-card body-class="flex flex-between gap-2">
      <section class="flex-1">
        <van-text-ellipsis class="v-list-title" content="333333333" rows="2" />
        <v-plain-tag size="mini" type="primary"> 45fefvgr </v-plain-tag>
        <div class="start-center gap-1 mt-1">
          <span class="v-author">
            <van-icon name="contact-o" />
            45fefvgr
          </span>
          <span class="v-date">
            <van-icon name="clock-o" />
            45fefvgr
          </span>
        </div>
      </section>

      <section class="absolute right-2 bottom-2">
        <van-button
          class="px-4"
          hairline
          round
          size="mini"
          text="查 看"
          type="default"
          @click="handleDetail(row.id)"
        />
      </section>
    </v-card>
    <!--    <v-inset-list ref="listRef">-->
    <!--      <template #default="{ row }">-->
    <!--        -->
    <!--      </template>-->
    <!--    </v-inset-list>-->
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
