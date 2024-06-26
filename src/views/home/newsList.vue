<script setup lang="ts">
  import useHomeData from '@/hooks/api/home';

  const router = useRouter();
  const [homeData, fetchData] = useHomeData();

  const { swiperList, homeNotice, homeNews, loading } = toRefs(homeData);
  onBeforeMount(fetchData);
</script>
<template>
  <van-pull-refresh v-model="loading" @refresh="fetchData">
    <van-cell-group>
      <van-cell v-for="(item, index) in homeNews" :key="item.uid">
        <template #title>
          {{ index }}
          <van-text-ellipsis
            :content="item.title"
            rows="2"
            @click="router.push('/detail/notice/' + item.uid)"
          />
          {{ loading }}
        </template>
      </van-cell>
    </van-cell-group>
  </van-pull-refresh>
</template>
<style lang="scss" scoped></style>
