<script setup lang="ts">
  import { useGlobal } from '@/utils';
  import { Icon } from '@iconify/vue';
  import Party from '@/views/discipline/components/integrity/party.vue';
  import Supervision from '@/views/discipline/components/integrity/supervision.vue';
  import Search from '@/views/culture/social/search.vue';
  const { $parse } = useGlobal<GlobalPropertiesApi>();
  defineOptions({
    name: 'MediaList'
  });
  const router = useRouter();
  const active = ref<string>('');
</script>
<template>
  <Search />
  <div class="card bg-white">
    <div class="v-full overflow-x-auto">
      <table class="border-collapse border border-slate-400">
        <tr>
          <th></th>
          <th>第一季度</th>
          <th>第二季度</th>
          <th>第三季度</th>
          <th>第四季度</th>
        </tr>
        <tr>
          <td>联华股份党委</td>
          <td><span class="box"></span></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>联华超市营运中心党委</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>联家超市公司党委</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>华联吉买盛党委</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>联华快客便利党委</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>联华快客便利党委</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .card {
    @apply rounded p-4 m-4 text-xs;
  }
  table {
    th,
    td {
      @apply border border-solid border-gray-200 leading-8 whitespace-nowrap px-4 leading-8 text-center;
    }
    th {
      @apply bg-slate-50;
    }
    .box {
      @apply w-[15PX] h-[15PX] rounded inline-block;
      background-color: #66d877;
    }
  }
</style>
