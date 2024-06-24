<script setup lang="ts">
  import { Icon } from '@iconify/vue';
  import { useIcon } from '@/utils/assets';

  const router = useRouter();
  const form = ref({ code: '' });
</script>
<template>
  <main>
    <van-cell title="所属角色" value="工会干部（二级）" />
    <van-cell-group class="mt-2">
      <van-cell title="用户名称" value="唐蓓" />
      <van-cell title="用户邮箱" value="as@hotmail.com" />
      <van-cell title="所属机构" value="上海百联集团股份有限公司" />
      <van-cell title="所属党组织" value="百联" />
      <van-cell title="创建日期" value="2022-07-17 17:44:38" />
    </van-cell-group>
  </main>
</template>
