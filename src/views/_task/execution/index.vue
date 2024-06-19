<script setup lang="ts">
  import {
    listworkFeedback,
    recallWorkFeedback
  } from '@/api/_media/taskExecution';
  import { useGlobal } from '@/utils';
  import { WorkQuery } from '@/types/_media/task';
  import { Icon } from '@iconify/vue';
  import { showConfirmDialog, showSuccessToast, showFailToast } from 'vant';
  import { emitter } from '@/plugins/mitt';
  defineOptions({
    name: 'TaskExecution'
  });
  const { $useDict, $parse } = useGlobal<GlobalPropertiesApi>();
  const { work_release_type, feedback_status, work_type_code } = $useDict(
    'work_release_type',
    'feedback_status',
    'work_type_code'
  );
  const router = useRouter();
  // 分享面板
  const show = ref(false);
  const actions = [
    { name: '新增视频', path: '/task/execution/create/', status: '2' },
    { name: '新增图片', path: '/task/execution/create/', status: '1' },
    { name: '新增文件', path: '/task/execution/update/', status: '3' }
  ];
  // 保存rowid
  const rowId = ref(0);

  // 撤回
  const handleDewrite = async (id: number) => {
    try {
      await showConfirmDialog({
        title: '确认撤回？',
        message: ''
      });

      const { code } = await recallWorkFeedback(id);
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
  const listRef = ref();
  const queryParams = reactive<WorkQuery>(new WorkQuery());
  const workTypeOption = computed(() => {
    return [
      { text: '全部任务类型', value: '' },
      ...work_release_type.value.map(({ label, value }: any) => ({
        text: label,
        value
      }))
    ];
  });
  // 跳转详情页
  const ToexDetails = (id: number, workId: number) => {
    router.push('/task/execution/detail/' + id + '/' + workId);
  };
  const onSelect = (item: any) => {
    // 默认情况下点击选项时不会自动收起
    show.value = false;
    router.push(item.path + rowId.value + '/' + item.status);
  };

  // 新增图片和弹出
  const handleCreate = (id: number) => {
    // 保存id传值
    rowId.value = id as number;
    show.value = true;
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
    <v-search
      :show-search="false"
      :show-pop-icon="false"
      placeholder="请输入任务名"
      v-model:searchVal="queryParams"
      @handle-search="handleSearch"
    >
      <template #dropMenu>
        <van-dropdown-menu>
          <van-dropdown-item
            @change="handleSearch"
            v-model="queryParams.workType"
            :options="workTypeOption"
          />
        </van-dropdown-menu>
      </template>
    </v-search>
    <v-inset-list
      :shows="['search']"
      :list-fn="listworkFeedback"
      :query-params="queryParams"
      ref="listRef"
    >
      <template #default="{ row }">
        <van-swipe-cell stop-propagation>
          <section class="v-list-item" @click="ToexDetails(row.id, row.workId)">
            <van-text-ellipsis
              class="v-list-title"
              :content="row.workName"
              rows="2"
            />

            <div>
              <v-tag
                plain
                :dictData="work_release_type"
                :value="row.workType"
              />
              <v-tag plain :dictData="work_type_code" :value="row.typeCode" />
              <v-tag
                plain
                :dictData="feedback_status"
                :value="row.submitStatus"
              />
            </div>
            <div class="v-company">
              <!-- <Icon width="20" height="20" icon="ph:buildings" v-if="row.orgName" /> -->
              {{ row.orgName }}
            </div>

            <div class="between-end">
              <van-notice-bar background="transparent" :scrollable="false">
                <van-swipe
                  vertical
                  :autoplay="3000"
                  :touchable="false"
                  :show-indicators="false"
                >
                  <van-swipe-item class="v-date">
                    <van-icon name="clock-o" />
                    {{ $parse(row.deadline) }}
                  </van-swipe-item>
                  <van-swipe-item class="v-date v-danger">
                    <Icon icon="ri:hourglass-fill" />
                    {{ $parse(row.deadline) }}
                  </van-swipe-item>
                </van-swipe>
              </van-notice-bar>
            </div>
          </section>
          <template #right>
            <van-button
              square
              text="撤回"
              v-auth="['work:workFeedback:recall']"
              v-if="
                row.submitStatus === '3' &&
                (row.workStatus === '21' || row.workStatus === '20')
              "
              type="danger"
              class="h-full"
              @click="handleDewrite(row.id)"
            />
            <template
              v-if="
                row.workStatus !== '23' &&
                (row.submitStatus === '0' ||
                  row.submitStatus === '1' ||
                  row.submitStatus === '2' ||
                  row.submitStatus === '-1')
              "
            >
              <van-button
                v-if="row.workType === '3'"
                @click="handleCreate(row.id)"
                square
                text="执行"
                type="primary"
                class="h-full"
              />
              <van-button
                square
                text="执行"
                v-else-if="
                  row.workStatus !== '23' &&
                  ['-1', '0', '1', '2'].includes(row.submitStatus)
                "
                v-auth="['work:workFeedback:exe']"
                type="primary"
                class="h-full"
                @click="
                  router.push('/task/execution/update/' + row.id + '/' + '0')
                "
              />
            </template>
          </template>
        </van-swipe-cell>
      </template>
    </v-inset-list>
    <!-- 分享面板 -->
    <van-action-sheet
      v-model:show="show"
      :actions="actions"
      cancel-text="取消"
      @select="onSelect"
      close-on-click-action
      close-on-popstate
      teleport="body"
    />
  </main>
</template>

<style lang="scss" scoped>
  .van-notice-bar {
    flex: 1;
    height: $notice-height;
    padding: 0;

    :deep(.van-notice-bar__wrap) {
      justify-content: flex-end;

      .van-swipe {
        height: $notice-height;
        line-height: $notice-height;
      }
    }
  }
</style>
