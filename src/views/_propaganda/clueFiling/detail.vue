<script setup lang="ts">
  import { _5_years_ago, formatDate } from '@/utils/date';
  import { closeToast, showImagePreview, showLoadingToast, showToast } from 'vant';
  import { getPropaganda, listAuditRecord } from '@/api/media/propaganda';
  import { PropagandaAuditBo, PropagandaAuditVo, PropagandaMain } from '@/types/_media/propaganda';
  import { useGlobal } from '@/utils';
  import { getPropagandaClue } from '@/api/media/propagandaClue.ts';
  import { PropagandaClue } from '@/types/_media/propagandaClue';

  const route = useRoute();
  const detail = ref<PropagandaClue>(new PropagandaClue());
  const id = route.params.id as string;
  const { $parse } = useGlobal<GlobalPropertiesApi>();

  const getRecord = async () => {
    const { data } = await getPropagandaClue(id);
    detail.value = data!;
  };

  onMounted(() => {
    getRecord();
  });
</script>
<template>
  <main class="container">
    <v-card>
      <section class="section-title">新闻线索</section>
      <van-cell-group inset>
        <van-form input-align="right">
          <van-field>
            <template #label>项目工程名称</template>
            <template #input>{{ detail.projectName }}</template>
          </van-field>
          <van-field>
            <template #label>开始时间</template>
            <template #input>{{ formatDate(detail.startTime) }}</template>
          </van-field>
          <van-field>
            <template #label>结束时间</template>
            <template #input>{{ formatDate(detail.endTime) }}</template>
          </van-field>

          <van-field>
            <template #label>新闻线索内容</template>
            <template #input>{{ detail.clueContent }}</template>
          </van-field>

          <div class="between-end">
            <span class="van-cell van-field">联系人</span>
            <v-tree-select v-model="detail.linkUser" readonly name="linkUser" />
          </div>
        </van-form>
      </van-cell-group>
    </v-card>
  </main>
</template>

<style scoped>
  .van-cell {
    padding-left: 0;
    padding-right: 0;
  }
</style>
