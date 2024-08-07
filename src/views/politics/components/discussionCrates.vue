<script setup lang="ts">
  import { useGlobal } from '@/utils';
  import { Icon } from '@iconify/vue';
  import * as echarts from 'echarts';

  import Learning from '@/views/politics/components/keynote/system.vue';
  const { $parse } = useGlobal<GlobalPropertiesApi>();
  defineOptions({
    name: 'MediaList'
  });
  const router = useRouter();
  const active = ref<string>('');
  import { createApp } from 'vue';
  import { Collapse, CollapseItem } from 'vant';
  const app = createApp();
  app.use(Collapse);
  app.use(CollapseItem);
  import { ref } from 'vue';
  const activeName = ref('1');
  const result = ref('');
  const showPicker = ref(false);
  const onConfirm = ({ selectedValues }) => {
    result.value = selectedValues.join('/');
    showPicker.value = false;
  };
  const chartRef = ref();
  function initChart() {
    const myChart = echarts.init(chartRef.value);
    const option = {
      color: ['#3b98ff', '#fc765f', '#17d2d8'],
      tooltip: {
        trigger: 'item'
      },
      legend: {
        bottom: '5%',
        left: 'center',
        itemWidth: 15,
        itemHeight: 10
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['50%', '70%'],
          center: ['50%', '35%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 10,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: '三重一大' },
            { value: 735, name: '党委议事决策' },
            { value: 580, name: '前置事项清单' }
          ]
        }
      ]
    };
    myChart.setOption(option);
  }
  onMounted(initChart);
</script>
<template>
  <div class="mt-4 mb-4 pb-20">
    <van-grid :border="false" :column-num="2" :gutter="20">
      <van-grid-item class="topbg">
        <div class="text-left w-full tit font-medium">会议</div>
        <div class="w-full text-center text-slate-500">
          <span class="text-2xl digital">54</span>场
        </div>
        <div class="text-xs w-full bottom">
          <div class="text-slate-500">
            上季度：<span class="digital">30</span>
          </div>
          <div class="mt-1 text-slate-500">
            环比增长：<span class="digital">40%</span>
          </div>
        </div></van-grid-item
      >
      <van-grid-item class="topbg">
        <div class="text-left w-full tit font-medium">议题</div>
        <div class="w-full text-center text-slate-500">
          <span class="text-2xl digital">27</span>场
        </div>
        <div class="text-xs w-full bottom">
          <div class="text-slate-500">
            上季度：<span class="digital">30</span>
          </div>
          <div class="mt-1 text-slate-500">
            环比增长：<span class="digital">40%</span>
          </div>
        </div></van-grid-item
      >
    </van-grid>
    <section class="card">
      <div class="titbg">
        <span class="pl-4 font-medium">制度分类</span>
      </div>
      <div>
        <div class="w-[90vw] h-[200PX] mx-auto" ref="chartRef"></div>
      </div>
    </section>
    <section class="card pb-2">
      <div class="titbg">
        <span class="pl-4 font-medium">统计汇总</span>
      </div>
      <table class="table-head mt-3">
        <thead>
          <tr>
            <th style="width: 40%">填报单位名称</th>
            <th style="width: 20%">制度数</th>
            <th style="width: 20%">会议数</th>
            <th style="width: 20%">事项数</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="width: 40%">联华股份党委</td>
            <td style="width: 20%">2</td>
            <td style="width: 20%">4</td>
            <td style="width: 20%">8</td>
          </tr>
          <tr>
            <td style="width: 40%">联华股份党委</td>
            <td style="width: 20%">2</td>
            <td style="width: 20%">4</td>
            <td style="width: 20%">8</td>
          </tr>
          <tr>
            <td style="width: 40%">联华股份党委</td>
            <td style="width: 20%">2</td>
            <td style="width: 20%">4</td>
            <td style="width: 20%">8</td>
          </tr>
          <tr>
            <td style="width: 40%">联华股份党委</td>
            <td style="width: 20%">2</td>
            <td style="width: 20%">4</td>
            <td style="width: 20%">8</td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="card">
      <div class="titbg">
        <span class="pl-4 font-medium">制度文件</span>
      </div>

      <learning />
    </section>
  </div>
</template>

<style lang="scss" scoped>
  .card {
    @apply rounded-md overflow-hidden  m-4 bg-white;
    .titbg {
      background-image: linear-gradient(to bottom, #fed6c8 30%, #fff 100%);
      line-height: 45px;
      color: #5a5a5b;
    }
    .table-head {
      @apply text-xs font-medium mx-2 rounded-full text-center table-auto w-[95%];
      line-height: 50px;
      th {
        background-color: #f7f7f7;
        line-height: 30px;
      }
      td {
        @apply leading-10 font-normal;
      }
    }
  }
  .topbg {
    :deep(.van-grid-item__content) {
      border-radius: $border-radius;
      border: solid 1px #fcc7c7;
    }
    .tit {
      margin-top: -10px;
      color: #5a5a5b;
    }
    .digital {
      color: #ff4a27;
    }
    .bottom {
      @apply mt-2 pt-2;
      border-top: solid 1px #ffbea6;
    }
    --van-grid-item-content-background: #fce2dd;
  }
</style>
