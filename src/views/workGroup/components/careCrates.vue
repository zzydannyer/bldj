<script setup lang="ts">
  import { useGlobal } from '@/utils';
  import { Icon } from '@iconify/vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import 'swiper/css/pagination';
  import { Pagination } from 'swiper/modules';

  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '"></span>';
    }
  };
  const modules = [Pagination];
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

    <Swiper class="mySwiper" :modules="modules" :pagination="pagination">
      <SwiperSlide v-for="i in 10" :key="i" class="swiper-slide">
        <div>
          11111111111111111
          <van-space
            ><Icon icon="bxs:user" /><span>{{ name + i }}</span></van-space
          >
          <van-space
            ><Icon class="color1" icon="ion:time-outline" /><span>{{
              time
            }}</span></van-space
          >
        </div>
        <div>上海物资股份有限公司</div>
        <div>值班经理兼消防员</div>
        <div>值班经理</div>
      </SwiperSlide>
    </Swiper>
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

  .swiper {
    width: 100%;
    height: 100%;
    flex: 1;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .swiper-pagination-bullet {
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    color: #000;
    opacity: 1;
    background: rgba(0, 0, 0, 0.2);
  }

  .swiper-pagination-bullet-active {
    color: #fff;
    background: #007aff;
  }
</style>
