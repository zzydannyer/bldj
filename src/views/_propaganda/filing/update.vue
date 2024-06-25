<script setup lang="ts">
  import { PropagandaMain } from '@/types/_media/propaganda';
  import {
    checkScoreDetail,
    getDateRange,
    getNewMediaConfirm,
    listOption,
    listStandCascadeList
  } from '@/api/_media/scoreStandard';
  import { checkRole, getPropaganda } from '@/api/_media/propaganda';
  import {
    PickerOption,
    closeToast,
    showConfirmDialog,
    showLoadingToast,
    showSuccessToast,
    showToast
  } from 'vant';
  import useUserInfoStore from '@/store/modules/user';
  import { joinDate, _5_years_ago, dateFormatter } from '@/utils/date';
  import { updatePropaganda } from '@/api/_media/propaganda';
  import { debounce, last } from 'lodash';
  import { emitter } from '@/plugins/mitt';
  import { RouteParams } from 'vue-router';
  import { useGlobal } from '@/utils';
  import ProjectPicker from '@/views/media/projectPicker.tsx';
  import StandardPicker from '@/views/_propaganda/filing/standardPicker';

  const { $useDict, $parse } = useGlobal<GlobalPropertiesApi>();
  const { group_propaganda_ratio, group_propaganda_type } = $useDict(
    'group_propaganda_ratio',
    'group_propaganda_type'
  );
  // 开始时间和结束时间
  const startTime = ref<Date>();
  const endTime = ref<Date>();
  const form = reactive(new PropagandaMain());
  let copyForm = reactive(new PropagandaMain());
  const route = useRoute();
  const { id, status } = route.params as RouteParams;
  const result = ref('');
  const scoreMainId = ref('');
  // 是否为集团角色
  const isCulture = ref<boolean>();
  const router = useRouter();
  const userInfoStore = useUserInfoStore();
  const rmEmptyChildren = (arr: any[]) => {
    for (let item of arr) {
      if (item.children.length === 0) {
        delete item.children;
      } else {
        rmEmptyChildren(item.children);
      }
    }
    return arr;
  };
  // 资源类型
  const mediaList = ref([]);
  const columns = [
    {
      value: '1',
      text: '图片'
    },
    {
      value: '2',
      text: '视频'
    },
    {
      value: '3',
      text: '其他'
    }
  ];
  const otherScore1Id = ref<string[]>([]);
  const showPicker = ref(false);

  // 回显赋值
  const getPropagandaLsit = async () => {
    try {
      showLoadingToast({ message: '加载中...', forbidClick: true });

      let { data } = await getPropaganda(id as string, 'edit');

      if (!data) throw new Error('接口错误');
      copyForm = data;
      // 报道标题
      form.reportTitle = data.reportTitle;
      // 报道摘要
      form.reportBrief = data.reportBrief;
      // 报道日期
      form.reportTime = data.reportTime;
      // 其他选择id
      form.otherScore1Id = data.otherScore1Id;
      // 赋分主要详情id

      let scoreDetail = (
        isDepartment.value ? data.scoreDetailId : data.groupScoreDetailId
      )?.split(',');
      if (isDepartment.value) {
        form.scoreDetailId = scoreDetail?.slice(0, 4).join(',');
      } else {
        form.scoreDetailId = scoreDetail?.slice(0, 5).join(',');
      }
      // 外部链接
      form.outLink = data.outLink;
      // 其他附件
      form.commonList = data.commonList;
      // 图片链接
      form.imageList = data.imageList;
      // 视频
      form.videoList = data.videoList;
      // 集团认定分类
      form.groupConfirmKind = data.groupConfirmKind;
      // 项目id
      form.projectId = data.projectId;
      // 项目名称
      form.projectName = data.projectName;
      // 状态码
      form.optionMultiFlag = data.optionMultiFlag;
      // 判断如果有赋分1情况下的时候回显数据
      if (data.otherScore1Id) {
        extra_1_field.value = true;
        otherScore1Id.value = [data.otherScore1Id!];
        const { data: resData } = await listOption({
          mainId: scoreMainId.value,
          parentId: isDepartment.value
            ? form.scoreDetailId?.split(',')[3] ?? ''
            : form.scoreDetailId?.split(',')[4] ?? ''
        });

        extra_1_list.value = resData;
        extra_1_text.value = resData.find((i: any) => {
          return i.id === form.otherScore1Id;
        })?.text;
      }
      // 图片1 视频2 其他类型3
      if (form.imageList) {
        form.fileType = '1';
      }
      if (form.videoList) {
        form.fileType = '2';
      }
      if (form.commonList) {
        form.fileType = '3';
      }
      // 类别的数据
      mediaList.value = [form?.fileType];
    } catch (e) {
      console.error(e);
    } finally {
      closeToast();
    }
  };

  // const scoreDetailId = computed({
  //   get: () => {
  //     const res = last(form.scoreDetailId?.split(','))
  //     return res
  //   },
  //   set: (val) => {
  //     form.scoreDetailId = val!
  //   },
  // })
  //  是否有集团文化部角色
  const checkCultureRole = async () => {
    // 查询当前登陆人是否为集团文化部角色
    const { data } = await checkRole();
    isCulture.value = data;
  };

  // 额外加分项
  const toggle = () => {
    extra_1_field.value = !extra_1_field.value;
    extra_1_field.value === false && resetExtra();
  };

  const onConfirm = ({ selectedOptions }: PickerOption) => {
    result.value = selectedOptions[0]?.text;
    showPicker.value = false;
    form.fileTypename = selectedOptions[0]?.text;
    form.fileType = selectedOptions[0]?.value;
    form.commonList = [];
    form.imageList = [];
    form.videoList = [];
  };

  const resetExtra = () => {
    extra_1_text.value = '';
    extra_1_list.value = [];
    extra_1_field.value = false;
    // extra_2_text.value = ''
    // extra_2_list.value = []
    // extra_2_field.value = false
    form.otherScore1Id = '';
    form.otherScore2Id = '';
    form.scoreExtra2Count = 0;
  };
  // 媒体类型
  const mediatype = {
    1: '图片',
    2: '视频',
    3: '其他'
  };
  // 集团赋分依据确定事件
  const onScoreDetailConfirm = async (selectedOptions?: any) => {
    resetExtra();
    const lastOne = last(selectedOptions) as any;
    form.optionMultiFlag = lastOne.optionMultiFlag;
    form.scoreDetailId = selectedOptions
      .map((option: PickerOption) => option.id)
      .join(',');

    if (isCulture.value) {
      const kind = await getNewMediaConfirm({ scoreId: form.scoreDetailId! });
      if (kind.data && !form.groupConfirmKind) {
        form.groupConfirmKind = kind.data;
      }
    }
    try {
      const { data } = await listOption({
        mainId: scoreMainId.value,
        parentId: lastOne?.id
      });

      extra_1_list.value = data;
      if (data.length > 0) {
        extra_1_field.value = true;
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 额外加分1下拉框
  const extra_1_field = ref(false);
  const extra_1_pop = ref(false);
  const extra_1_text = ref('');
  const extra_1_list = ref<[]>();
  const extra_1_confirm = async ({ selectedOptions }: PickerOption) => {
    form.otherScore1Id = selectedOptions[0].id;
    extra_1_text.value = selectedOptions[0].text;
    extra_1_pop.value = false;
  };

  const isDepartment = computed(() =>
    userInfoStore.roles?.includes('project-jbr')
  );

  // 获取集团认定id
  const getGroupRatio = (val: any) =>
    group_propaganda_ratio.value.find((item: any) => item.value === val)?.label;

  // 获取scoreMainId
  const handleTreeOptionsLoad = (mainId: string) => {
    scoreMainId.value = mainId;
    form.scoreMainId = mainId;
  };
  // 0:编辑 1：提交 2：基层审核通过 3：基层审核退回 4:基层向公司申诉
  // 5：提交集团待审 6：集团审核通过 7：集团审核退回 8:公司向集团申诉
  const onSubmit = async () => {
    const groupKind = form.groupConfirmKind;
    form.id = id as string;
    const reStatus = status as string;
    console.log('reStatus', reStatus);
    if (reStatus === '80') {
      // 若当前是项目部 则状态置为1
      // 若当前是公司 则状态置为5
      if (copyForm.reportStatus === '3') {
        form.reportStatus = '1';
      } else if (copyForm.reportStatus === '7') {
        form.reportStatus = '5';
      }
    } else {
      form.reportStatus = reStatus;
    }
    console.log('form.reportStatus', form.reportStatus);
    form.reportTime = $parse(form.reportTime!, 'YYYY-MM-DD HH:mm:ss');
    if (groupKind) {
      form.groupRatio = getGroupRatio(groupKind);
      const { data } = await checkScoreDetail({
        scoreId: form.scoreDetailId!,
        kind: groupKind
      });
      if (!data) {
        showConfirmDialog({
          title: '警告',
          message:
            '赋分依据类型应与认定归类类型挂钩 \n' +
            '即非新媒体赋分不能选新媒体归类/新媒体赋分必须选择新媒体归类'
        })
          .then(isProject)
          .catch(() => {});
      } else {
        isProject();
      }
    } else {
      isProject();
    }
  };

  // 弹出层嵌套抽离
  const isProject = async () => {
    if (!form.projectId) {
      const res = await showConfirmDialog({
        title: '警告',
        message: '您未选择项目 当前申报将直接挂靠公司 是否确定？'
      });
      if (res === 'cancel') return;
    }
    const { code, msg } = await updatePropaganda(form);
    if (code === 200) {
      showSuccessToast(msg || '提交成功');
      emitter.emit('refresh');
      router.go(-1);
    }
  };
  // 外部链接校验
  const validator = (val: string) =>
    val
      ? /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/.test(
          val
        )
      : true;
  // 获取时间戳
  const getDateTime = async () => {
    const { data } = await getDateRange();
    startTime.value = data?.startDate;

    endTime.value = data?.endDate;
  };
  onBeforeMount(() => {
    getPropagandaLsit();
    checkCultureRole();
    getDateTime();
  });
</script>
<template>
  <section class="container">
    <van-form input-align="left" @submit="onSubmit">
      <van-cell-group inset>
        <!-- 赋分依据 -->
        <standard-picker
          v-model:scoreDetailId="form.scoreDetailId"
          @load="handleTreeOptionsLoad"
          @finish="onScoreDetailConfirm"
        />

        <!-- 额外附加分 -->
        <van-cell clickable title="" @click="toggle" v-if="extra_1_field">
          <template #value>
            <div class="flex gap-2 justify-end items-center">
              <span>额外加分项</span>
              <van-checkbox
                v-model="extra_1_field"
                icon-size="16px"
                @click.stop
              />
            </div>
          </template>
        </van-cell>

        <!-- 额外加分项1 -->
        <van-field
          v-if="extra_1_field"
          v-model="extra_1_text"
          is-link
          readonly
          label="额外加分项1"
          placeholder="请选择额外加分项1"
          @click="extra_1_pop = true"
        />

        <van-popup v-model:show="extra_1_pop" round position="bottom">
          <van-picker
            v-model="otherScore1Id"
            :columns="extra_1_list"
            :columns-field-names="{ text: 'text', value: 'id' }"
            teleport="body"
            @confirm="extra_1_confirm"
            @cancel="extra_1_pop = false"
          />
        </van-popup>

        <!-- 额外加分项2 -->
        <!-- <van-field v-if="extra_2_field && showExtra" v-model="extra_2_text" is-link readonly label="额外加分项2"
          placeholder="请选择额外加分项2" @click="extra_2_pop = true" />
        <van-popup v-model:show="extra_2_pop" round position="bottom">
          <van-picker :columns="extra_2_list" :columns-field-names="{ text: 'text', value: 'id' }" teleport="body"
            @confirm="extra_2_confirm" @cancel="extra_2_pop = false" />
        </van-popup>
       -->
        <!-- 集团认定分类 -->
        <v-picker
          v-if="isCulture"
          required
          :rules="[{ required: true, message: '请选择集团认定归类' }]"
          v-model="form.groupConfirmKind"
          :columns="group_propaganda_type"
          :columns-field-names="{
            text: 'label',
            value: 'value'
          }"
          label="集团认定归类"
          placeholder="请选择集团认定归类"
          @confirm="onConfirm"
        />
        <!-- 报道标题 -->
        <van-field
          required
          v-model="form.reportTitle"
          label="报道标题"
          placeholder="请输入报道标题"
          :rules="[{ required: true, message: '请输入报道标题' }]"
        />

        <!-- 项目工程名称 -->
        <project-picker
          :rules="[]"
          :required="false"
          v-model:id="form.projectId"
          v-model:name="form.projectName"
        />

        <!-- 报道摘要 -->
        <van-field
          required
          v-model="form.reportBrief"
          rows="2"
          autosize
          show-word-limit
          maxlength="100"
          type="textarea"
          label="报道摘要"
          placeholder="请输入报道摘要"
          :rules="[{ required: true, message: '请输入报道摘要' }]"
        />
        <v-date-picker
          required
          v-model="form.reportTime"
          :min-date="new Date(startTime)"
          :max-date="new Date()"
          label="报道日期"
          :rules="[{ required: true, message: '请选择报道日期' }]"
          placeholder="请选择报道日期"
        />

        <!-- 外部链接 -->
        <van-field
          v-model="form.outLink"
          :rules="[{ validator, message: '请填写正确链接地址' }]"
          label="外部链接"
          placeholder="请输入外部链接"
        />
        <van-field
          v-model="mediatype[form.fileType]"
          is-link
          readonly
          name="picker"
          label="资源类型"
          placeholder="点击资源类型"
          @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-picker
            v-model="mediaList"
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>
        <!-- <v-picker required :medialist="form.mediaList" v-model="form.fileType" :columns="columns" label="资源类型" placeholder="请选择类型"
                    :rules="[{ required: true, message: '' }]" /> -->
        <!-- 普通附件 -->
        <van-field label="普通附件" v-if="form.fileType == '3'">
          <template #input>
            <v-uploader
              :max-count="5"
              :max-size="50 * 1024 * 1024"
              v-model="form.commonList"
              url="oss"
              type="file"
            />
          </template>
        </van-field>
        <!-- 图片素材 -->
        <van-field label="图片素材" v-if="form.fileType == '1'">
          <template #input>
            <v-uploader
              :max-count="5"
              url="oss"
              v-model="form.imageList"
              type="image"
            />
          </template>
        </van-field>
        <!-- 视频素材 -->
        <van-field label="视频素材" v-if="form.fileType == '2'">
          <template #input>
            <v-uploader
              :max-count="5"
              url="oss"
              v-model="form.videoList"
              type="video"
            />
          </template>
        </van-field>
      </van-cell-group>

      <van-button class="my-4" round block type="success" native-type="submit">
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
</style>
