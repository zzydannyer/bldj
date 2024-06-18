<script setup lang="ts">
  import { delWorkMain, distributeWork, listWorkMain, withdrawWork } from '@/api/media/taskRelease';
  import { showConfirmDialog, showFailToast, showSuccessToast } from 'vant';
  import { useGlobal } from '@/utils';
  import { WorkQuery } from '@/types/_media/task';
  import { Icon } from '@iconify/vue';
  import { emitter } from '@/plugins/mitt';
  import { hasAuth } from '@/utils/auth';

  defineOptions({
    name: 'TaskRelease'
  });

  const router = useRouter();
  const listRef = ref();
  const { $useDict, $parse } = useGlobal<GlobalPropertiesApi>();
  const { work_status, work_release_type, work_type_code } = $useDict('work_status', 'work_release_type', 'work_type_code');

  const queryParams = reactive<WorkQuery>(new WorkQuery());
  const offset: [Numeric, Numeric] = [0, 5];
  const typeCodeOption = computed(() => {
    return [
      { text: '全部类型', value: '' },
      ...work_type_code.value.map(({ label, value }: any) => ({
        text: label,
        value
      }))
    ];
  });

  const workTypeOption = computed(() => {
    return [
      { text: '全部任务类型', value: '' },
      ...work_release_type.value.map(({ label, value }: any) => ({
        text: label,
        value
      }))
    ];
  });
  const workStatusOption = computed(() => {
    return [
      { text: '全部任务状态', value: '' },
      ...work_status.value.map(({ label, value }: any) => ({
        text: label,
        value
      }))
    ];
  });

  // 删除
  const handleDelete = async (id: number) => {
    try {
      await showConfirmDialog({
        title: '确认删除？',
        message: ''
      });

      const { code } = await delWorkMain(id);
      if (code === 200) {
        showSuccessToast('删除成功');
        handleSearch();
        return;
      }
      showFailToast('删除失败');
    } catch (e) {
      //取消删除
    }
  };
  // 跳转详情页
  const handleDetail = (id: number) => {
    router.push('/task/release/detail/' + id);
  };
  // 撤回
  const handleDewrite = async (id: number) => {
    try {
      await showConfirmDialog({
        title: '确认撤回？',
        message: ''
      });

      const { code } = await withdrawWork(id);
      if (code === 200) {
        showSuccessToast('撤回成功');
        handleSearch();
        return;
      }
      showFailToast('撤回失败');
    } catch (e) {
      //取消删除
    }
  };
  // 督查
  const handleSupervise = (id: Numeric) => {
    router.push('/task/release/supervision/' + id);
  };
  // 下达
  const handleRelase = async (id: number) => {
    try {
      await showConfirmDialog({
        title: '确认下达吗？',
        message: ''
      });

      const { code } = await distributeWork(id);
      if (code === 200) {
        showSuccessToast('下达成功');
        handleSearch();
        return;
      }
      showFailToast('下达失败');
    } catch (e) {
      //取消删除
    }
  };
  const handleSearch = () => {
    listRef.value.onRefresh();
  };

  // 刷新数据
  onMounted(() => emitter.on('refresh', handleSearch));

  onBeforeUnmount(() => emitter.off('refresh'));
</script>

<template>
  <main class="list-container">
    <v-search :show-pop-icon="false" placeholder="请输入任务名" v-model:searchVal="queryParams.workTitle" @handle-search="handleSearch">
      <template #dropMenu>
        <van-dropdown-menu>
          <van-dropdown-item @change="handleSearch" v-model="queryParams.typeCode" :options="typeCodeOption" />
          <van-dropdown-item @change="handleSearch" v-model="queryParams.workType" :options="workTypeOption" />
          <van-dropdown-item @change="handleSearch" v-model="queryParams.status" :options="workStatusOption" />
        </van-dropdown-menu>
      </template>
    </v-search>

    <van-floating-bubble axis="xy" magnetic="x" v-if="hasAuth('work:workMain:add')">
      <van-button type="primary" size="large" round to="/task/release/create">
        <van-swipe vertical class="button-swipe" :autoplay="4000" :duration="600" :touchable="false" :show-indicators="false">
          <van-swipe-item>
            <van-icon name="plus" />
          </van-swipe-item>
          <van-swipe-item class="whitespace-nowrap">新增</van-swipe-item>
        </van-swipe>
      </van-button>
    </van-floating-bubble>

    <v-inset-list :list-fn="listWorkMain" :query-params="queryParams" ref="listRef">
      <template #default="{ row, index }">
        <v-card class="v-list-item" @click="handleDetail(row.id)">
          <van-text-ellipsis class="v-list-title" :content="row.workTitle" rows="2" />

          <div class="mt-1">
            <v-tag plain :dictData="work_release_type" :value="row.workType" />
            <v-tag plain :dictData="work_type_code" :value="row.typeCode" />
            <v-tag plain :dictData="work_status" :value="row.status" />
          </div>

          <div class="v-company mt-1">
            <Icon icon="ph:buildings" v-if="row.orgName" />
            {{ row.orgName }}
          </div>

          <van-notice-bar class="mt-1" background="transparent" :scrollable="false">
            <van-swipe vertical :autoplay="3000" :touchable="false" :show-indicators="false">
              <van-swipe-item class="v-date">
                <van-icon name="clock-o" />
                {{ $parse(row.publishDate) }}
              </van-swipe-item>
              <van-swipe-item class="v-date v-danger">
                <Icon icon="ri:hourglass-fill" />
                {{ $parse(row.deadline) }}
              </van-swipe-item>
            </van-swipe>
          </van-notice-bar>

          <section class="absolute right-2 bottom-2">
            <van-button class="px-4" round type="default" hairline size="mini" text="查 看" @click="handleDetail(row.id)" />
            <van-button
              class="px-4"
              text="督 查"
              round
              type="primary"
              size="mini"
              @click="handleSupervise(row.id)"
              v-auth="['work:workMain:supervision']"
              v-if="row.status === '21' || row.status === '22'"
            />

            <van-button
              class="px-4"
              text="撤 回"
              round
              type="danger"
              size="mini"
              @click="handleDewrite(row.id)"
              v-auth="['work:workMain:withdraw']"
              v-if="['20', '21', '22'].includes(row.status)"
            />

            <van-button
              class="px-4"
              text="下 达"
              round
              type="success"
              size="mini"
              @click="handleRelase(row.id)"
              v-auth="['work:workMain:distribute']"
              v-if="row.status === '0'"
            />

            <van-button
              class="px-4"
              text="修改"
              round
              type="primary"
              size="mini"
              @click="router.push('/task/release/update/' + row.id)"
              v-auth="['work:workMain:edit']"
              v-if="['0', '-1'].includes(row.status)"
            />

            <van-button
              class="px-4"
              text="删除"
              round
              type="danger"
              size="mini"
              @click="handleDelete(row.id)"
              v-auth="['work:workMain:remove']"
              v-if="['0', '-1'].includes(row.status)"
            />
          </section>
        </v-card>
      </template>
    </v-inset-list>
  </main>
</template>

<style lang="scss" scoped>
  .van-notice-bar {
    flex: 1;
    height: $notice-height;
    padding: 0;

    :deep(.van-notice-bar__wrap) {
      justify-content: flex-start;

      .van-swipe {
        height: $notice-height;
        line-height: $notice-height;
      }
    }
  }

  .button-swipe {
    height: 40px;
    line-height: 40px;
  }
</style>
