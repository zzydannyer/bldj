<script setup lang="ts">
  import { useGlobal } from '@/utils';
  import { Icon } from '@iconify/vue';
  import Search from '@/views/workGroup/components/youthachievements/search.vue';
  import List from '@/views/workGroup/components/youthachievements/list.vue';
  const { $parse } = useGlobal<GlobalPropertiesApi>();
  const text = '沙家邦红色党建活动';
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
