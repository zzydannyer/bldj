<script setup lang="ts">
  import { Project } from '@/types/_media/project';
  import { showConfirmDialog, showSuccessToast, showToast } from 'vant';
  import { _5_years_ago, _10_years_future } from '@/utils/date';
  import { addWorkMain } from '@/api/_media/taskRelease';
  import { useGlobal } from '@/utils';
  import { PackageMain, Work } from '@/types/_media/task';
  import { listPackageMain } from '@/api/_media/package';
  import { selectUser } from '@/api/_system/user';
  import { SysUser } from '@/types/_system/sysUser';
  import { emitter } from '@/plugins/mitt';
  const { $useDict, $parse } = useGlobal<GlobalPropertiesApi>();

  const { work_release_type, work_type_code } = $useDict(
    'work_release_type',
    'work_type_code'
  );

  const router = useRouter();
  const form = reactive(new Work());
  const loading = ref(false);
  const worktype = ref<Project[]>([]);

  const addList = ref([{ id: 1, mustDesc: '' }]);
  const addNumber = ref(1);

  const columnsFieldNames = {
    text: 'label',
    value: 'value'
  };

  // 获取工作类型
  const getworktype = () => {
    worktype.value = [work_release_type.value];
  };

  /**
   * @description 分组和指定用户
   */
  const recieve_type_2_list = ref<PackageMain[]>([]);
  const recieve_type_3_list = ref<SysUser[]>([]);
  const recieve_type_2_fn = async () => {
    const { data } = await listPackageMain(new PackageMain());
    recieve_type_2_list.value = data!;
  };
  const recieve_type_3_fn = async () => {
    const { data } = await selectUser();
    recieve_type_3_list.value = data!;
  };
  // 提交
  const onSubmit = async () => {
    if (form.workType == '1' || form.workType == '3') {
      if (!form?.workDesc && !form?.workFiles) {
        showToast('请输入任务内容或者上传一个文件');
      } else {
        form.questions = addList.value.map((item: any) => ({
          mustDesc: item.mustDesc
        }));
        form.deadline = $parse(form.deadline, 'YYYY-MM-DD HH:mm:ss');
        try {
          let { code } = await addWorkMain(form);
          if (code === 200) {
            showSuccessToast('新增成功');
            router.push('/task/release');
            emitter.emit('refresh');
          }
        } catch (error) {}
      }
    } else {
      if (addList.value.length === 0) {
        showToast('回填任务请添加提问');
      } else {
        form.questions = addList.value.map((item: any) => ({
          mustDesc: item.mustDesc
        }));
        form.deadline = $parse(form.deadline, 'YYYY-MM-DD HH:mm:ss');
        try {
          let { code } = await addWorkMain(form);
          if (code === 200) {
            showSuccessToast('新增成功');
            router.push('/task/release');
            emitter.emit('refresh');
          }
        } catch (error) {}
      }
    }
  };
  // 提问问题数量加一
  const handleNumber = () => {
    addNumber.value = addNumber.value + 1;
    addList.value = [...addList.value, { id: addNumber.value, mustDesc: '' }];
  };

  //删除提问问题
  const handleDelete = async (index: number) => {
    await showConfirmDialog({ message: `确定删除问题${index + 1}吗？` });
    addList.value.splice(index, 1);
  };

  /**
   * @description 选择分组
   */
  const handleRadioChange = () => {
    form.recPackageId = undefined;
    form.recUserIds = [];
  };

  onBeforeMount(() => {
    Promise.allSettled([
      getworktype(),
      recieve_type_2_fn(),
      recieve_type_3_fn()
    ]);
  });
</script>

<template>
  <section class="container">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <!-- 类型 -->
        <v-picker
          required
          v-model="form.typeCode"
          :columns="work_type_code"
          label="类型"
          placeholder="请选择类型"
          :rules="[{ required: true, message: '请选择类型' }]"
          :columns-field-names="columnsFieldNames"
        />

        <!-- 任务名 -->
        <van-field
          v-model="form.workTitle"
          required
          :rules="[{ required: true, message: '请输入任务名' }]"
          label="任务名"
          placeholder="请输入任务名"
        />
        <!-- 截止时间 -->
        <v-icon-text-picker
          :minDate="new Date()"
          :maxDate="_10_years_future"
          v-model="form.deadline"
          required
          label="截止时间"
          :rules="[{ required: true, message: '请选择截止时间' }]"
          placeholder="请选择截止时间"
        />
        <!-- 任务内容 -->
        <van-field
          v-model="form.workDesc"
          rows="2"
          autosize
          show-word-limit
          maxlength="100"
          type="textarea"
          label="任务内容"
          placeholder="请输入任务内容"
        />
        <!-- 普通附件 -->
        <van-field label="普通附件">
          <template #input>
            <v-uploader
              url="oss"
              :max-count="5"
              :max-size="50 * 1024 * 1024"
              v-model="form.workFiles"
              type="file"
            />
          </template>
        </van-field>
      </van-cell-group>

      <van-cell-group style="margin-top: 20px">
        <!-- 接收类型 -->
        <van-field
          name="radio"
          label="接收类型"
          required
          :rules="[{ required: true, message: '请选择接收类型' }]"
        >
          <template #input>
            <van-radio-group
              v-model="form.receiveType"
              direction="horizontal"
              @change="handleRadioChange"
            >
              <van-radio name="2" shape="dot">分组</van-radio>
              <van-radio name="3" shape="dot">指定用户</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <!-- 分组 -->
        <v-picker
          required
          :rules="[{ required: true, message: '请选择接收群组' }]"
          v-if="form.receiveType === '2'"
          v-model="form.recPackageId"
          :columns="recieve_type_2_list"
          label="接收群组"
          placeholder="请选择接收群组"
          :columns-field-names="{ value: 'id', text: 'packageName' }"
        />

        <!-- 指定用户 -->
        <v-multi-picker
          required
          :rules="[{ required: true, message: '请选择接收用户' }]"
          v-if="form.receiveType === '3'"
          v-model="form.recUserIds"
          :columns="recieve_type_3_list"
          label="接收用户"
          placeholder="请选择接收用户"
          showSearch
          searchPlaceholder="请输入用户姓名"
          :columns-field-names="{ value: 'userId', text: 'nickName' }"
        />
      </van-cell-group>

      <van-cell-group style="margin-top: 20px">
        <!-- 任务类型 -->
        <v-picker
          required
          v-model="form.workType"
          :columns="work_release_type"
          label="任务类型"
          placeholder="请选择任务类型"
          :rules="[{ required: true, message: '请选择任务类型' }]"
          :columns-field-names="columnsFieldNames"
        />
        <!-- 调查添加 -->
        <div v-if="form.workType === '2'" class="m-4">
          <van-button type="primary" size="mini" @click="handleNumber">
            添加问题
          </van-button>

          <van-cell-group inset>
            <van-cell class="p-0" v-for="(item, index) in addList">
              <template #title>
                <van-field
                  class="pl-0"
                  required
                  :rules="[{ required: true, message: '请输入问题' }]"
                  v-model="item.mustDesc"
                  :label="'提问' + (index + 1)"
                  label-width="50"
                  placeholder="请输入问题"
                />
              </template>
              <template #right-icon>
                <span
                  @click="handleDelete(index)"
                  class="flex items-center text-red-500"
                >
                  删除
                </span>
              </template>
            </van-cell>
          </van-cell-group>
        </div>
      </van-cell-group>

      <van-button
        class="my-4"
        round
        block
        type="success"
        native-type="submit"
        :loading="loading"
      >
        提交
      </van-button>
    </van-form>
  </section>
</template>

<style lang="scss" scoped>
  :deep(.van-cascader) {
    .van-tab__text {
      max-width: 20vw;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  :deep(.vue-office-pdf-wrapper) {
    border: 1px solid #f56c6c;
    z-index: 0;

    canvas {
      border: 1px solid blue;
      background-color: white;
      color: black;
      z-index: 99;
    }
  }
</style>
