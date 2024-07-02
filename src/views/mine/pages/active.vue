<script setup lang="ts">
  import { Icon } from '@iconify/vue';
  import { useIcon } from '@/utils/assets';
  import ResourceType from '@/views/_task/execution/resourceType.tsx';

  const router = useRouter();
  const form = ref({ code: '' });
  const resourceType = ref('');
  const name = ref('');
  const result = ref('');
  const showCalendar = ref(false);
  const onConfirm = (date) => {
    result.value = `${date.getMonth() + 1}/${date.getDate()}`;
    showCalendar.value = false;
  };
</script>
<template>
  <div class="bg-white pt-3 h-dvh">
    <van-field
      v-model="result"
      is-link
      readonly
      name="calendar"
      label="日期"
      placeholder="点击选择日期"
      @click="showCalendar = true"
    />
    <van-calendar v-model:show="showCalendar" @confirm="onConfirm" />

    <div class="flex justify-center bt pt-6 mt-4">
      <table
        class="border-collapse border-gray-400 w-[90%] text-center text-xs"
      >
        <thead>
          <tr>
            <th>姓名</th>
            <th>组织</th>
            <th>登录次数</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>肖敏</td>
            <td>财务管理部</td>
            <td>3</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .bt {
    border-top: solid 12px #f5f5f5;
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
