<script setup lang="ts">
  import { useGlobal } from '@/utils';
  import { Icon } from '@iconify/vue';
  import Help from '@/views/culture/social/helping.vue';
  import { getLm } from '@/api';
  import { useImage } from '@/utils/assets';
  import { listPublicMediaActivitiesScore } from '@/api/_media';
  const { $parse } = useGlobal<GlobalPropertiesApi>();
  defineOptions({
    name: 'MediaList'
  });
  const router = useRouter();
  const active = ref(0);

  function removeHtmlTags(str: string) {
    return str.replace(/<[^>]*>/g, '');
  }
  const cxgzsl = ref();
  async function fetchData() {
    const { data } = await getLm();
    cxgzsl.value = data.cxgzsL.map((i) => ({
      ...i,
      content: removeHtmlTags(i.content)
    }));
  }
  onBeforeMount(fetchData);
</script>
<template>
  <section class="bg">
    <div class="tit">劳模风采<span class="line"></span></div>
    <section class="mt-2 pl-4 whitespace-nowrap overflow-x-auto pt-2">
      <div
        v-for="(notice, index) in 10"
        :key="index"
        class="advance-card"
        @click="router.push('/workGroup/modelDetail')"
      >
        <van-image
          class="w-[90PX] rounded overflow-hidden"
          fit="cover"
          :src="useImage('pic')"
        />
        <van-text-ellipsis :content="'陶依嘉'" rows="1" />
        <span class="v-icon-text">
          <div class="text2">上海市劳模规范</div>
        </span>
      </div>
    </section>
  </section>

  <section class="bg">
    <div class="tit">创新工作室<span class="line"></span></div>
  </section>
  <!--      @click="handleDetail(row.id, row.activitiesId)"-->
  <section class="pb-10 bg-white">
    <div
      v-for="(row, index) in cxgzsl"
      :key="index"
      class="flex flex-between gap-2 bg-white px-4 pt-5"
      @click="router.push('/workGroup/workDetail')"
    >
      <img v-src="row.imgUrl" class="rounded" height="85" width="100" />
      <section class="flex-1 text-sm flex-col gap-2">
        <div class="w-full">
          <van-text-ellipsis :content="row.name" rows="1" />
        </div>
        <van-text-ellipsis
          class="text-xs detail"
          :content="row.content"
          rows="2"
        />
        <div class="link">查看详情 ></div>
      </section>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .bg {
    @apply bg-white mt-2 py-2;
  }
  .advance-card {
    @apply inline-flex p-4 w-[90PX] align-top flex-col;
    border-radius: 10px;
    // prettier-ignore
    margin-right: 16PX;
    padding: 0;
  }
  .tit {
    @apply relative ml-4 leading-8 font-medium text-base;
    .line {
      @apply m-1 w-8 h-0.5 absolute rounded-sm;
      background-color: #ff2600;
      left: -4px;
      bottom: -12px;
    }
  }
  .detail {
    @apply text-xs mt-1 flex;
    color: #5e5e5e;
  }
  .link {
    @apply text-xs mt-2;
  }
</style>
