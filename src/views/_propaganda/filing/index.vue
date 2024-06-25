<script setup lang="ts">
  import {
    delPropaganda,
    listPropaganda,
    submitPropaganda
  } from '@/api/_media/propaganda';
  import { PropagandaMainQuery } from '@/types/_media/propaganda';
  import { useGlobal } from '@/utils';
  import { showConfirmDialog, showSuccessToast, FormInstance } from 'vant';
  import { appealPropaganda } from '@/api/_media/propaganda';
  import appealDialog from './appealDialog';
  import { checkRole } from '@/api/_media/propaganda';
  import useUserInfoStore from '@/store/modules/user';
  import { emitter } from '@/plugins/mitt';
  import { hasAuth } from '@/utils/auth';
  import { storeToRefs } from 'pinia';

  defineOptions({
    name: 'PropagandaFiling'
  });
  const userInfoStore = useUserInfoStore();
  const { isGroup, userId, isDepartment, isCompany } =
    storeToRefs(userInfoStore);

  // 是否为集团文化部
  const isCulture = ref(false);
  const router = useRouter();
  const { $parse } = useGlobal<GlobalPropertiesApi>();
  const queryParams = reactive<PropagandaMainQuery>(new PropagandaMainQuery());

  const kindMap: any = {
    1: '工程类',
    2: '企业类',
    3: '人物类',
    4: '新媒体'
  };
  const statusMap: any = {
    0: '编辑',
    1: '提交',
    2: '基层审核通过',
    3: '基层审核退回',
    4: '基层向公司申诉',
    5: '提交集团待审',
    6: '集团审核通过',
    7: '集团审核退回',
    8: '公司向集团申诉',
    9: '集团复核撤销'
  };

  const orgCodeValue = ref('');
  const listRef = ref();
  const handleSearch = () => {
    listRef.value.onRefresh();
  };
  const checkCultureRole = async () => {
    // 查询当前登陆人是否为集团文化部角色
    const data = await checkRole();
    isCulture.value = data.data!;
  };

  // 提交
  const form: any = ref({});
  const level = ref('');
  // 提交
  const handleSubmit = (id: number) => {
    showConfirmDialog({
      title: '确认提交吗?'
    }).then(() => {
      const roleType = isCompany.value ? 'company' : 'depart';
      submitPropaganda(id, roleType).then((res) => {
        if (res.code === 200) {
          showSuccessToast('提交成功');
          handleSearch();
        }
      });
    });
  };
  // 删除
  const handleDelete = (id: number) => {
    showConfirmDialog({
      title: '确认删除吗?'
    }).then(() => {
      delPropaganda(id).then((res) => {
        if (res.code === 200) {
          showSuccessToast('删除成功');
          handleSearch();
        }
      });
    });
  };
  //查看
  const handleDetail = (id: number) => {
    router.push('/propaganda/filing/detail/' + id);
  };

  // 申诉
  const handleAppeal = (id: number, orgCode: string, reportTitle: string) => {
    orgCodeValue.value = orgCode;
    if (isDepartment.value) {
      level.value = '3';
    }
    if (isCompany.value) {
      level.value = '1';
    }
    if (isGroup.value) {
      level.value = '2';
    }
    let formRef: FormInstance;
    let appealBrief = '';
    const defaultSlot = ([_formRef, _appealBrief]: [FormInstance, string]) => {
      formRef = _formRef;
      appealBrief = _appealBrief;
    };
    const element = h(
      appealDialog as any,
      { maxLength: 30, key: Math.random() },
      defaultSlot as any
    );
    const result = level.value === '3' ? '3' : '4';
    showConfirmDialog({
      title: '申诉理由',
      message: () => element,
      teleport: 'body',
      closeOnPopstate: true,
      beforeClose: async (type) => {
        try {
          if (type === 'confirm') {
            await formRef.validate();
            form.value.level = level.value;
            form.value.auditResult = result;
            form.value.id = id;
            form.value.appealBrief = appealBrief;
            form.value.reportTitle = reportTitle;
            await appealPropaganda(form.value);
            showSuccessToast('申诉成功');
            handleSearch();
            return true;
          }
          return true;
        } catch (e: any) {
          console.error(e);
          return false;
        }
      }
    });
    // router.push('/propaganda/filing/appeal/' + id + '/' + orgCode)
  };

  const handleReUpdate = (id: Numeric) => {
    router.push('/propaganda/filing/update/' + id + '/' + '5');
  };
  const handleUpdate = (id: Numeric) => {
    router.push('/propaganda/filing/update/' + id + '/' + '0');
  };

  onBeforeMount(checkCultureRole);
  // 刷新数据
  onMounted(() => emitter.on('refresh', handleSearch));

  onBeforeUnmount(() => emitter.off('refresh'));
</script>
<template>
  <main class="list-container">
    <v-search
      :show-pop-icon="false"
      placeholder="请输入报道标题"
      v-model:searchVal="queryParams.reportTitle"
      @handle-search="handleSearch"
    />

    <van-floating-bubble
      axis="xy"
      magnetic="x"
      v-if="hasAuth('multimedia:propaganda:add')"
    >
      <van-button
        type="primary"
        size="large"
        round
        to="/propaganda/filing/create"
      >
        <van-swipe
          vertical
          class="button-swipe"
          :autoplay="4000"
          :duration="600"
          :touchable="false"
          :show-indicators="false"
        >
          <van-swipe-item>
            <van-icon name="plus" />
          </van-swipe-item>
          <van-swipe-item class="whitespace-nowrap">新增</van-swipe-item>
        </van-swipe>
      </van-button>
    </van-floating-bubble>

    <v-inset-list
      :shows="['search']"
      :list-fn="listPropaganda"
      :query-params="queryParams"
      ref="listRef"
    >
      <template #default="{ row, index }">
        <v-card>
          <van-text-ellipsis
            class="v-list-title"
            :content="row.reportTitle"
            rows="2"
          />
          <van-tag plain type="primary" class="mt-2">
            {{ statusMap[row.reportStatus] }}
          </van-tag>
          <span class="v-date mt-2">
            <van-icon name="clock-o" />
            {{ $parse(row.reportTime) }}
          </span>

          <section class="absolute right-2 bottom-2">
            <van-button
              class="px-4"
              round
              type="default"
              hairline
              size="mini"
              text="查 看"
              @click="handleDetail(row.id)"
            />
            <van-button
              class="px-4"
              text="提 交"
              round
              type="success"
              size="mini"
              @click="handleSubmit(row.id)"
              v-show="
                (row.self &&
                  isDepartment &&
                  ['0', '3'].includes(row.reportStatus)) ||
                (isCompany && ['0', '7'].includes(row.reportStatus)) ||
                (isGroup && ['0', '7'].includes(row.reportStatus))
              "
              v-auth="['multimedia:propaganda:submit']"
              v-if="userId == row.creatorId"
            />
            <van-button
              v-if="!isCulture"
              class="px-4"
              text="申 诉"
              round
              type="danger"
              size="mini"
              @click="handleAppeal(row.id, row.orgCode, row.reportTitle)"
              v-show="
                (isDepartment &&
                  ['2'].includes(row.reportStatus) &&
                  row.self) ||
                (!isDepartment &&
                  ['6'].includes(row.reportStatus) &&
                  (row.companyAuditSelf || row.self))
              "
              v-auth="['multimedia:propaganda:edit']"
            />

            <van-button
              class="px-4"
              text="重新修改"
              round
              type="primary"
              size="mini"
              @click="handleReUpdate(row.id)"
              v-show="
                (row.self &&
                  isDepartment &&
                  ['0', '3'].includes(row.reportStatus)) ||
                (isCompany &&
                  ['7'].includes(row.reportStatus) &&
                  row.companyAuditSelf) ||
                (isGroup && ['0', '7'].includes(row.reportStatus))
              "
              v-auth="['multimedia:propaganda:edit']"
              v-if="row.reportStatus == '7' && userId != row.creatorId"
            />

            <van-button
              class="px-4"
              text="修 改"
              round
              type="primary"
              size="mini"
              @click="handleUpdate(row.id)"
              v-show="
                (row.self &&
                  isDepartment &&
                  ['0', '3'].includes(row.reportStatus)) ||
                (isCompany &&
                  ['0', '7'].includes(row.reportStatus) &&
                  row.self) ||
                (isGroup && ['0', '7'].includes(row.reportStatus))
              "
              v-auth="['multimedia:propaganda:edit']"
              v-else
            />

            <van-button
              class="px-4"
              text="删 除"
              round
              type="danger"
              size="mini"
              @click="handleDelete(row.id)"
              v-show="
                row.self &&
                ((isDepartment && ['0', '3'].includes(row.reportStatus)) ||
                  (isCompany && ['0', '3', '7'].includes(row.reportStatus)) ||
                  (isGroup && ['0', '3', '7'].includes(row.reportStatus)))
              "
              v-auth="['multimedia:propaganda:remove']"
            />
          </section>
        </v-card>
      </template>
    </v-inset-list>
  </main>
</template>

<style lang="scss" scoped>
  .button-swipe {
    height: 40px;
    line-height: 40px;
  }
</style>
