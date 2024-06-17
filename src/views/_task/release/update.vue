<script setup lang="ts">
  import { Project } from '@/types/_media/project';
  import { PickerOption, showConfirmDialog, showSuccessToast, showToast } from 'vant';
  import { _10_years_future, _5_years_ago } from '@/utils/date';
  import { updateWorkMain, getWorkMain } from '@/api/media/taskRelease';
  import { useGlobal } from '@/utils';
  import { PackageMain, Work } from '@/types/_media/task';
  import { listPackageMain } from '@/api/media/package';
  import { selectUser } from '@/api/system/user';
  import { SysUser } from '@/types/_system/sysUser';
  import { emitter } from '@/plugins/mitt';
  const { $useDict, $parse } = useGlobal<GlobalPropertiesApi>();
  // import VueOfficePdf from '@vue-office/pdf'
  const { work_release_type, work_type_code } = $useDict('work_release_type', 'work_type_code');
  const route = useRoute();
  const router = useRouter();
  const form = reactive(new Work());
  const worktype = ref<Project[]>([]);
  const addList = ref([{ id: 1, mustDesc: '' }]);
  const typeCodeId = ref<any>([]);
  const worktypeId = ref<any>([]);
  const addNumber = ref(1);
  const { id } = route.params;

  const columnsFieldNames = {
    text: 'label',
    value: 'value'
  };
  const typeCodeValue = ref();
  // 获取工作类型
  const getworktype = () => {
    worktype.value = [work_release_type.value];
  };

  // 报道日期

  // 日期格式化
  const formatter = (type: string, option: PickerOption) => {
    if (type === 'year') option.text += '年';
    if (type === 'month') option.text += '月';
    if (type === 'day') option.text += '日';
    return option;
  };

  // 提问问题数量加一
  const handleNuber = () => {
    addNumber.value = addNumber.value + 1;
    addList.value = [...addList.value, { id: addNumber.value, mustDesc: '' }];
  };
  // 删除提问问题
  const handleDelete = async (index: number) => {
    await showConfirmDialog({ message: `确定删除问题${index + 1}吗？` });
    addList.value.splice(index, 1);
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
  // 提交数据
  const onSubmit = () => {
    if (form.workType === '1' || form.workType === '3') {
      if (form.workDesc?.length === 0 && form.workFiles?.length === 0) {
        showToast('请输入任务内容或者上传一个文件');
      } else {
        form.deadline = $parse(form.deadline, 'YYYY-MM-DD HH:mm:ss');
        form.questions = addList.value.map((item: any) => {
          return { mustDesc: item.mustDesc };
        });
        form.id = id as string;
        updateWorkMain(form).then((res) => {
          if (res.code === 200) {
            showSuccessToast(res.msg || '修改成功');
            router.push('/task/release');
            emitter.emit('refresh');
          }
          // console.log(res);
        });
      }
    } else {
      if (addList.value.length === 0) {
        showToast('回填任务请添加提问');
      } else {
        form.deadline = $parse(form.deadline, 'YYYY-MM-DD HH:mm:ss');
        form.questions = addList.value.map((item: any) => {
          return { mustDesc: item.mustDesc };
        });
        form.id = id as string;
        updateWorkMain(form).then((res) => {
          if (res.code === 200) {
            showSuccessToast(res.msg || '修改成功');
            router.push('/task/release');
            emitter.emit('refresh');
          }
          // console.log(res);
        });
      }
    }
  };

  // 页面首次加载数据
  const getWorkMainLsit = async () => {
    let { data }: any = await getWorkMain(id as string);
    form.workTitle = data.workTitle;
    form.deadline = data.deadline;
    form.workDesc = data.workDesc;
    form.workFiles = data.workFiles;
    form.receiveType = data.receiveType;
    form.typeCode = data.typeCode;
    typeCodeId.value = [data.typeCode];
    worktypeId.value = [data.workType];
    form.workType = data.workType;
    form.recUserIds = data.recUserIds;
    addList.value = data.questions.map((item: any, index: number) => {
      return { mustDesc: item?.mustDesc, id: index + 1 };
    });
    form.recPackageId = data.recPackageId;
    worktype.value = work_release_type?.value[data.workType - 1]?.label;
    typeCodeValue.value = work_type_code?.value[data.typeCode - 1]?.label;
  };
  const validator = (val: any) => {
    if (val) {
      return true;
    } else {
      return false;
    }
  };
  onBeforeMount(() => {
    getWorkMainLsit();
    Promise.allSettled([getworktype(), recieve_type_2_fn(), recieve_type_3_fn()]);
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
        <!-- 任务名 -->
        <van-field v-model="form.workTitle" required label="任务名" placeholder="请输入任务名" />
        <!-- 截止时间 -->
        <v-date-picker
          :minDate="new Date()"
          :maxDate="_10_years_future"
          v-model="form.deadline"
          required
          :rules="[{ required: true, message: '请选择截止时间' }]"
          label="截止时间"
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
            <v-uploader url="oss" :max-count="5" :max-size="50 * 1024 * 1024" v-model="form.workFiles" type="file" />
          </template>
        </van-field>
        <van-field name="radio" label="接收类型" required :rules="[{ required: true, message: '请选择接收类型' }]">
          <template #input>
            <van-radio-group v-model="form.receiveType" direction="horizontal">
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
        <!-- 调查添加 -->
        <div v-if="form.workType === '2'" class="m-4">
          <van-button type="primary" size="mini" @click="handleNuber"> 添加问题 </van-button>

          <van-cell-group inset>
            <van-cell class="p-0" v-for="(item, index) in addList">
              <template #title>
                <van-field
                  class="pl-0"
                  required
                  :rules="[{ required: true, message: '请输入问题' }]"
                  v-model="item.mustDesc"
                  :label="'提问' + (index + 1)"
                  placeholder="请输入问题"
                />
              </template>
              <template #right-icon>
                <span @click="handleDelete(index)" class="flex items-center text-red-500"> 删除 </span>
              </template>
            </van-cell>
          </van-cell-group>
        </div>
      </van-cell-group>

      <van-button class="my-4" round block type="success" native-type="submit"> 提交 </van-button>
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
