<script setup lang="ts">
  import { useGlobal } from '@/utils';
  import { Icon } from '@iconify/vue';
  import Search from '@/views/politics/components/keynote/search.vue';
  import Learning from '@/views/politics/components/keynote/learning.vue';
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
</script>
<template>
  <section class="card">
    <div class="titbg">
      <span class="pl-4 font-medium">年统计信息</span>
    </div>
    <van-field
      v-model="result"
      is-link
      readonly
      name="datePicker"
      label="月度选择"
      placeholder="点击选择月份"
      @click="showPicker = true"
    />
    <van-popup v-model:show="showPicker" position="bottom">
      <van-date-picker @confirm="onConfirm" @cancel="showPicker = false" />
    </van-popup>

    <table class="table-head mt-3 block">
      <thead>
        <tr>
          <th style="width: 35%">填报单位名称</th>
          <th style="width: 20%">学习次数</th>
          <th style="width: 20%">参与人数</th>
          <th style="width: 30%">未填报/已提交</th>
        </tr>
      </thead>
    </table>
    <van-collapse v-model="activeName" accordion class="mt-3">
      <van-collapse-item title="联华股份党委" name="1">
        <table class="table-body">
          <tr>
            <td style="width: 35%">百联汽车党委</td>
            <td style="width: 20%">0</td>
            <td style="width: 20%">0</td>
            <td>10/25</td>
          </tr>
          <tr>
            <td style="width: 35%">百联资产党委</td>
            <td style="width: 20%">0</td>
            <td style="width: 20%">0</td>
            <td>10/25</td>
          </tr>
          <tr>
            <td style="width: 35%">第一医药党委</td>
            <td style="width: 20%">0</td>
            <td style="width: 20%">0</td>
            <td>10/25</td>
          </tr>
          <tr>
            <td style="width: 35%">百联金服党支</td>
            <td style="width: 20%">0</td>
            <td style="width: 20%">0</td>
            <td>10/25</td>
          </tr>
        </table>
      </van-collapse-item>
      <van-collapse-item title="百联股份党委" name="2">
        <table class="table-body">
          <tr>
            <td style="width: 35%">百联汽车党委</td>
            <td style="width: 20%">0</td>
            <td style="width: 20%">0</td>
            <td>10/25</td>
          </tr>
          <tr>
            <td style="width: 35%">百联资产党委</td>
            <td style="width: 20%">0</td>
            <td style="width: 20%">0</td>
            <td>10/25</td>
          </tr>
          <tr>
            <td style="width: 35%">第一医药党委</td>
            <td style="width: 20%">0</td>
            <td style="width: 20%">0</td>
            <td>10/25</td>
          </tr>
          <tr>
            <td style="width: 35%">百联金服党支</td>
            <td style="width: 20%">0</td>
            <td style="width: 20%">0</td>
            <td>10/25</td>
          </tr>
        </table>
      </van-collapse-item>
      <van-collapse-item title="标题3" name="3">
        <table class="table-body">
          <tr>
            <td style="width: 35%">百联汽车党委</td>
            <td style="width: 20%">0</td>
            <td style="width: 20%">0</td>
            <td>10/25</td>
          </tr>
          <tr>
            <td style="width: 35%">百联资产党委</td>
            <td style="width: 20%">0</td>
            <td style="width: 20%">0</td>
            <td>10/25</td>
          </tr>
          <tr>
            <td style="width: 35%">第一医药党委</td>
            <td style="width: 20%">0</td>
            <td style="width: 20%">0</td>
            <td>10/25</td>
          </tr>
          <tr>
            <td style="width: 35%">百联金服党支</td>
            <td style="width: 20%">0</td>
            <td style="width: 20%">0</td>
            <td>10/25</td>
          </tr>
        </table>
      </van-collapse-item>
    </van-collapse>
  </section>
  <section class="card pb-40">
    <div class="titbg">
      <span class="pl-4 font-medium">学习态度</span>
    </div>
    <learning />
  </section>
</template>

<style lang="scss" scoped>
  .card {
    @apply rounded-md overflow-hidden  m-4 bg-white;
    .titbg {
      background-image: linear-gradient(to bottom, #fed6c8 30%, #fff 100%);
      line-height: 50px;
      color: #5a5a5b;
    }
    .table-head {
      @apply text-xs font-medium mx-2 rounded-full text-center table-auto;
      background-color: #f9f9f9;
      line-height: 30px;
      color: #5a5a5b;
    }

    .table-body {
      @apply text-xs text-center mx-2 table-auto font-medium w-full;
      line-height: 50px;
      td {
        border-bottom: solid 1px #f7f7f7;
      }
    }
  }
</style>
