<script setup lang="ts">
  import { useGlobal } from '@/utils';
  import { Icon } from '@iconify/vue';
  import List from '@/views/org/components/entering/list.vue';
  const { $parse } = useGlobal<GlobalPropertiesApi>();
  const text = '沙家邦红色党建活动';
  defineOptions({
    name: 'MediaList'
  });

  const router = useRouter();
  const active = ref(0);
</script>

<template>
  <v-card v-for="i in 10" :key="i" class="mt-3 mx-4 card">
    <template #title>
      <van-text-ellipsis :content="text" @click="router.push('/detail')" />
    </template>
    <List :count="i" :name="'name' + i" />
  </v-card>
</template>
<style lang="scss" scoped>
  .card {
    border-left: solid 3px #ff6b72;
    border-radius: 0;
  }
</style>
