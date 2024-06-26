<script setup lang="ts">
  import { useGlobal } from '@/utils';
  import { Icon } from '@iconify/vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import 'swiper/css/pagination';
  import { Pagination } from 'swiper/modules';
  import { useIcon } from '@/utils/assets';
  import { getLm } from '@/api';
  import List from '@/views/workGroup/components/youthachievements/list.vue';

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
  const text = '沙家邦红色党建活动';
  onBeforeMount(fetchData);
</script>
<template>
  <div class="pb-40">
    <section class="card flex">
      <div class="bluebg basis-[120PX] grow-0 shrink-0 relative">
        <div class="text-3xl font-medium">
          50<span class="text-sm font-normal">人</span>
        </div>
        <div class="text-base">赋能转岗</div>
        <van-image
          class="w-[80PX] h-[80PX] absolute bottom-0 right-0 opacity-10"
          fit="cover"
          :src="useIcon('care_icon1')"
        />
      </div>

      <Swiper class="mySwiper" :modules="modules" :pagination="pagination">
        <SwiperSlide v-for="i in 3" :key="i">
          <div class="flex justify-between">
            <van-space class="text-sm"
              ><Icon icon="bxs:user" class="iconbg" /><span>{{
                name + i
              }}</span></van-space
            >
            <van-space
              ><Icon icon="ion:time-outline" class="iconbg" /><span>{{
                time
              }}</span></van-space
            >
          </div>
          <div class="bt">上海物资股份有限公司</div>
          <div class="bg">值班经理兼消防员</div>
          <div class="text-lg text-center">
            <Icon icon="solar:arrow-down-broken" />
          </div>
          <div class="bg">值班经理</div>
        </SwiperSlide>
      </Swiper>
    </section>
    <section class="card flex">
      <div class="bluebg yellowbg basis-[120PX] grow-0 shrink-0 relative">
        <div class="text-3xl font-medium">
          126<span class="text-sm font-normal">人</span>
        </div>
        <div class="text-base">门店合伙人</div>
        <van-image
          class="w-[80PX] h-[80PX] absolute bottom-0 right-0 opacity-10"
          fit="cover"
          :src="useIcon('care_icon2')"
        />
      </div>

      <Swiper class="mySwiper" :modules="modules" :pagination="pagination">
        <SwiperSlide v-for="i in 3" :key="i">
          <div class="flex justify-between">
            <van-space class="text-sm"
              ><Icon icon="flowbite:home-solid" class="iconyellow" /><span>{{
                name + i
              }}</span></van-space
            >
            <van-space
              ><Icon icon="ion:time-outline" class="iconbg" /><span>{{
                time
              }}</span></van-space
            >
          </div>
          <div class="bt">上海物资股份有限公司</div>
          <div class="justify-between center-center">
            <div class="bg h-[70PX] grow center-center flex-col">
              <div>销售金额</div>
              <div>2536.24万元</div>
            </div>
            <div class="bg h-[70PX] grow ml-2 center-center flex-col">
              <div>职工人数</div>
              <div>26人</div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
    <section class="card flex">
      <div class="bluebg greenbg basis-[120PX] grow-0 shrink-0 relative">
        <div class="text-3xl font-medium">
          50<span class="text-sm font-normal">人</span>
        </div>
        <div class="text-base">转型创业</div>
        <van-image
          class="w-[80PX] h-[80PX] absolute bottom-0 right-0 opacity-5"
          fit="cover"
          :src="useIcon('care_icon3')"
        />
      </div>

      <Swiper class="mySwiper" :modules="modules" :pagination="pagination">
        <SwiperSlide v-for="i in 3" :key="i">
          <div class="flex justify-between">
            <van-space class="text-sm"
              ><Icon icon="flowbite:home-solid" class="iconyellow" /><span>{{
                name + i
              }}</span></van-space
            >
            <van-space
              ><Icon icon="ion:time-outline" class="iconbg" /><span>{{
                time
              }}</span></van-space
            >
          </div>
          <div class="bt">上海物资股份有限公司</div>
          <div class="justify-between center-center">
            <div class="bg h-[70PX] grow center-center flex-col">
              <div>销售金额</div>
              <div>2536.24万元</div>
            </div>
            <div class="bg h-[70PX] grow ml-2 center-center flex-col">
              <div>职工人数</div>
              <div>26人</div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
    <section class="bg">
      <div class="tit">立功竞赛<span class="line"></span></div>
    </section>
    <v-card v-for="i in 10" :key="i" class="mt-3 mx-4">
      <template #title>
        <van-text-ellipsis
          :content="text"
          @click="router.push('/workGroup/detail')"
        />
      </template>
      <List :count="i" :name="'name' + i" />
    </v-card>
    <section class="bg mt-4">
      <div class="tit">百暖连心<span class="line"></span></div>
    </section>
    <!--      @click="handleDetail(row.id, row.activitiesId)"-->
    <section class="pb-10 bg-white card card_heart">
      <div
        v-for="(row, index) in cxgzsl"
        :key="index"
        class="flex flex-between gap-2 bg-white px-4 pt-5"
        @click="router.push('/workGroup/heartDetail')"
      >
        <img width="100" height="85" v-src="row.imgUrl" class="rounded" />
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
  </div>
</template>

<style lang="scss" scoped>
  .card {
    @apply m-4 rounded-md overflow-hidden bg-white p-4 pb-2;
    border: solid 1px #efefef;
    .swiper-slide {
      @apply h-[170PX] block text-xs pl-4 text-left;
      width: 10.5rem !important;
      .iconbg {
        color: #009dff;
      }
      .iconyellow {
        color: #ffad00;
      }
      .bg {
        @apply rounded p-1 text-center;
        background-color: rgb(247, 247, 247);
      }
      .bt {
        @apply my-2 pb-2;
        border-bottom: solid 1px #f1f1f1;
      }
    }
    .bluebg {
      @apply rounded-md w-[120PX] h-[146PX] center-center flex-col inline-flex;
      background-color: #ecf7ff;
    }
    .yellowbg {
      background-color: #fff3eb;
    }
    .greenbg {
      background-color: #ecffef;
    }
    :deep(.van-space-item) {
      margin-right: 3px !important;
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
  .tit {
    @apply relative ml-4 leading-8 font-medium text-base;
    .line {
      @apply m-1 w-8 h-0.5 absolute rounded-sm;
      background-color: #ff2600;
      left: -4px;
      bottom: -12px;
    }
  }
  .card_heart {
    @apply p-0 pb-4;
  }
  .detail {
    @apply text-xs mt-1 flex;
    color: #5e5e5e;
  }
  .link {
    @apply text-xs mt-2;
  }
</style>
