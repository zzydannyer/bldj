<script setup lang="ts">
  import { useGlobal } from '@/utils';
  import { Icon } from '@iconify/vue';
  import Party from '@/views/discipline/components/integrity/party.vue';
  import Supervision from '@/views/discipline/components/integrity/supervision.vue';
  import Search from '@/views/culture/social/search.vue';
  import StickerTable from 'vue-sticker-table';

  const { $parse } = useGlobal<GlobalPropertiesApi>();

  defineOptions({
    name: 'MediaList'
  });
  const router = useRouter();
  const active = ref<string>('');
  const layout = 'fixed';
  const immediate = true;
  const scrolls = {};
  const source = [
    {
      materialName: ' 联华股份党委',
      one: 1,
      two: 2,
      three: 2,
      four: 3
    },
    {
      materialName: ' 联华超市营运中心党委',
      jModel: '张三',
      OrderQty: 200.0,
      description: 6017.7,
      lineType: '项目计划'
    },
    {
      materialName: ' 联家超市公司党委',
      jModel: '张三',
      OrderQty: 200.0,
      description: 6017.7,
      lineType: '项目计划'
    },
    {
      materialName: ' 华联吉买盛党委',
      jModel: '张三',
      OrderQty: 200.0,
      description: 6017.7,
      lineType: '项目计划'
    }
  ];
  const loadData = () => {
    return [...source];
  };
  const customRow = (record: any, index: any) => ({
    on: {
      click: () => {
        console.log(record, index);
      }
    }
  });
  const columns = [
    {
      title: '名称',
      width: 150,
      fixed: 'left' as 'left',
      scopedSlots: { customRender: 'name' }
    },
    {
      title: '第一季度',
      dataIndex: 'one',
      ellipsis: true,
      width: 75,
      scopedSlots: { customRender: 'season' }
    },
    {
      title: '第二季度',
      dataIndex: 'two',
      width: 75,
      scopedSlots: { customRender: 'season' }
    },
    {
      title: '第三季度',
      dataIndex: 'three',
      ellipsis: true,
      width: 75,
      scopedSlots: { customRender: 'season' }
    },
    {
      title: '第四季度',
      dataIndex: 'four',
      width: 75,
      scopedSlots: { customRender: 'season' }
    }
  ];
</script>
<template>
  <Search />
  <div class="card bg-white">
    <sticker-table
      :layout="layout"
      :columns="columns"
      :scrolls="scrolls"
      :loadData="loadData"
      :customRow="customRow"
      :immediate="immediate"
      rowKey="uuid"
    >
      <!--    <template #serial="{ rowIndex }">-->
      <!--      {{ rowIndex + 1 }}-->
      <!--    </template>-->
      <template #name="{ source }">
        <span>{{ source.materialName }}</span>
      </template>
      <template #season="{ source, column }">
        <span
          class="box"
          :style="{
            '--bgColor':
              source[column.dataIndex] === 1
                ? '#66d877'
                : source[column.dataIndex] === 2
                  ? '#ffc671'
                  : source[column.dataIndex] === 3
                    ? '#ef5960'
                    : '#ef5960'
          }"
        ></span>
      </template>
    </sticker-table>
  </div>
</template>

<style lang="scss" scoped>
  .card {
    @apply rounded p-4 m-4 text-xs;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    th,
    td {
      @apply leading-8 whitespace-nowrap px-4 leading-8 text-center;
      border: 1px solid black;
      min-width: 100px;
      text-align: center !important;
      color: #5f5f5f;
    }
    th {
      @apply bg-slate-50;
      color: #5f5f5f;
    }
    .box {
      --bgColor: #66d877;
      @apply w-[15PX] h-[15PX] rounded inline-block;
      background-color: var(--bgColor);
    }
  }
</style>
