<script setup lang="ts">
  import { useGlobal } from '@/utils';
  import { Icon } from '@iconify/vue';
  import { register } from 'swiper/element/bundle';

  register();
  const spaceBetween = 10;
  const onProgress = (e: any) => {
    const [swiper, progress] = e.detail;
    // console.log(progress);
  };

  const onSlideChange = (e: any) => {
    // console.log('slide changed');
  };
  import Help from '@/views/culture/components/responsibility/helping.vue';
  import { getLm } from '@/api';
  import { useImage } from '@/utils/assets';
  import { listPublicMediaActivitiesScore } from '@/api/_media';
  const { $parse } = useGlobal<GlobalPropertiesApi>();
  defineOptions({
    name: 'MediaList'
  });

  const router = useRouter();
  const active = ref(0);
  const props = withDefaults(
    defineProps<{
      name: string;
      time: string;
      count: number;
    }>(),
    {
      name: '束鸿朗',
      time: '2014-06-07',
      count: 11
    }
  );
</script>
<template>
  <section class="card flex">
    <div class="bluebg basis-[120PX] grow-0 shrink-0">
      <div>50<span>人</span></div>
      <div>赋能转岗</div>
    </div>
    <swiper-container
      class="basis-[120PX] grow-0 shrink-0"
      :breakpoints="{
        768: {
          slidesPerView: 3
        }
      }"
      :centered-slides="true"
      :pagination="{
        hideOnClick: false
      }"
      :slides-per-view="1"
      :space-between="spaceBetween"
      @swiperprogress="onProgress"
      @swiperslidechange="onSlideChange"
    >
      <swiper-slide
        v-for="i in 10"
        :key="i"
        class="swiper-slide"
        style="width: 375px !important"
      >
        1111111212312312312321312312312
        <!--        <div>-->
        <!--          11111111111111111-->
        <!--          <van-space-->
        <!--            ><Icon icon="bxs:user" /><span>{{ name + i }}</span></van-space-->
        <!--          >-->
        <!--          <van-space-->
        <!--            ><Icon icon="ion:time-outline" class="color1" /><span>{{-->
        <!--              time-->
        <!--            }}</span></van-space-->
        <!--          >-->
        <!--        </div>-->
        <!--        <div>上海物资股份有限公司</div>-->
        <!--        <div>值班经理兼消防员</div>-->
        <!--        <div>值班经理</div>-->
      </swiper-slide>
    </swiper-container>
  </section>
</template>

<style lang="scss" scoped>
  .card {
    @apply m-4 rounded-md overflow-hidden bg-white p-4;
    border: solid 1px #efefef;
    .swiper-slide {
      @apply w-[120PX] h-[60PX] bg-slate-200;
    }
    .bluebg {
      @apply rounded-md w-[120PX] h-[146PX] center-center flex-col inline-flex;
      background-color: #ecf7ff;
    }
  }
</style>
