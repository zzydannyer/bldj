<script setup lang="ts">
  import { useGlobal } from '@/utils';
  import { Icon } from '@iconify/vue';
  import Search from '@/views/discipline/components/integrity/search.vue';
  import List from '@/views/discipline/components/integrity/list.vue';
  const { $parse } = useGlobal<GlobalPropertiesApi>();
  const text = '上海市国资委监管企业党支部规范化建设细则';
  defineOptions({
    name: 'MediaList'
  });

  const router = useRouter();
  const active = ref(0);
</script>

<template>
  <Search />
  <v-card v-for="i in 10" :key="i" class="mt-3 mx-4">
    <template #title>
      <van-text-ellipsis :content="text" @click="router.push('/detail')" />
    </template>
    <List :count="i" :name="'name' + i" />
  </v-card>
</template>
