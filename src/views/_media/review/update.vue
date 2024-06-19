<script setup lang="ts">
  import {
    getMedia,
    backAudit,
    passAudit,
    submitGroup,
    listActivitiesByMainId
  } from '@/api/_media/index.ts';
  import { MediaMain } from '@/types/_media/index.ts';
  import {
    PickerOption,
    closeToast,
    showConfirmDialog,
    showLoadingToast,
    showSuccessToast
  } from 'vant';
  import {
    joinDate,
    _5_years_ago,
    formatDate,
    dateFormatter
  } from '@/utils/date';
  import { showToast } from 'vant';
  import ProjectPicker from '@/views/media/projectPicker.tsx';
  import { useGlobal } from '@/utils';
  import MediaReview from './mediaReview.tsx';
  import ResourceType from '@/views/media/resourceType.tsx';
  import { emitter } from '@/plugins/mitt';
  const activitiesName = ref<any>([]);
  const form = reactive<MediaMain>(new MediaMain());
  const route = useRoute();
  const checkedIds = ref<string[]>([]);
  const router = useRouter();
  const remark = ref('');
  const isShowNameDialog = ref(false);
  const formref = ref();
  // 获取路由参数
  const id = route.params.id as string;
  const { $parse } = useGlobal<GlobalPropertiesApi>();
  const ratevalue = ref(1);
  const getMediaList = async () => {
    try {
      showLoadingToast({ message: '加载中' });
      const { data } = await getMedia(id);
      let res = await listActivitiesByMainId(id);
      activitiesName.value = res.data!;
      // 项目名称
      form.projectName = data?.projectName;
      // 作者
      form.author = data?.author;

      form.resourceTypeName = data?.resourceTypeName;
      // 素材简介
      form.materialBrief = data?.materialBrief;
      // ID
      form.id = data?.id;
      // 拍摄地点
      form.shootingArea = data?.shootingArea;
      // 公司地点
      form.orgName = data?.orgName;
      // 资源类别
      form.resourceType = data?.resourceType;
      // 报道日期
      form.shootingTime = data?.shootingTime;
      // 资源类型id
      form.projectId = data?.projectId;
      // resourceTypeQueryText.value = resType[0].label
      form.mediaList = data?.mediaList;
      // 媒体类别
      form.mediaType = data?.mediaType;
      // 是否有项目
      form.project = data?.project;
      // 通知类型
      form.mediaStatus = data?.mediaStatus;
      // 评分依据
      // ratevalue.value=data?.score
      // 媒体标题
      form.mediaTitle = data?.mediaTitle;
      // 默认选择的图片id
      checkedIds.value = [];
    } catch (e) {
      console.error(e);
    } finally {
      closeToast();
    }
  };

  // 提交审核
  const onSubmit = async () => {
    form.score = ratevalue.value;
    form.shootingTime = $parse(form.shootingTime, 'YYYY-MM-DD HH:mm:ss');
    showConfirmDialog({
      title: '确定通过吗'
    })
      .then(() => passAudit(form, checkedIds.value.join(',')))
      .then((res) => {
        if (res.code === 200) {
          showSuccessToast(res.msg);
          router.go(-1);
        }
      })
      .catch(() => {
        // on cancel
      });
  };

  // 拒绝审核
  const NoAudit = () => {
    isShowNameDialog.value = true;
  };
  // 弹出框的方法
  const onNameDialogBeforeClose = (action: any, done: any) => {
    if (action === 'confirm') {
      if (remark.value) {
        backAudit(form.id as number, remark.value).then((res) => {
          if (res.code === 200) {
            showToast('拒绝成功');
            isShowNameDialog.value = false;
            emitter.emit('refresh');
            router.go(-1);
          }
        });
      } else {
        showToast('请填写退回理由');
      }
    } else if (action === 'cancel') {
      isShowNameDialog.value = false;
    }
  };

  // 修改文件名称
  const handleChangeName = (name: string, index: number) => {
    form.mediaList![index].resourceName = name;
  };
  // 选中通过图片
  const handleCheckedChange = (ids: string[]) => {
    checkedIds.value = ids;
  };
  // 评分
  const onChange = (value: string) => showToast('当前评分：' + value + '分');
  // 评分后更新视频
  const handleScore = (selected: any, index: number) => {
    form.mediaList![index].score = selected.value;
    form.mediaList![index].scoreLabel = selected.label;
  };
  // 裁剪后更新视频
  const handleUpdateVideo = (id: string, url: string, ossId: number) => {
    form.mediaList!.forEach((item) => {
      if (item.id === id) {
        item.resourceUrl = url;
        item.newOssId = ossId;
      }
    });
  };
  // 通知集团至审核
  const handlePassAndSubmitGroup = async () => {
    form.score = ratevalue.value;
    let res = await formref.value.validate();
    if (res === undefined) {
      form.shootingTime = $parse(form.shootingTime, 'YYYY-MM-DD HH:mm:ss');
      showConfirmDialog({
        title: '确定提交至集团吗？'
      })
        .then(() => passAudit(form, checkedIds.value.join(',')))
        .then(() => {
          submitGroup(form.id).then((res) => {
            if (res.code === 200) {
              showSuccessToast(res.msg);
              router.go(-1);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    }
  };
  onBeforeMount(getMediaList);
</script>
<template>
  <section class="container">
    <!-- {{ $parse(new Date(), 'YYYY-MM-DD HH:mm:ss') }} -->
    <van-form ref="formref" label-width="60" @submit="onSubmit">
      <van-cell-group inset>
        <!-- 媒体标题 -->
        <van-field
          required
          v-model="form.mediaTitle"
          label="媒体标题:"
          placeholder="请输入媒体标题"
          :rules="[{ required: true, message: '媒体标题不能为空' }]"
        />
        <!-- 征集活动 -->
        <van-field v-if="activitiesName.length > 0">
          <template #label>
            <span>征集活动</span>
          </template>
          <template #input>
            <van-tag plain v-for="item in activitiesName" type="primary">
              {{ item.activitiesName }}
            </van-tag>
          </template>
        </van-field>
        <!-- 作者 -->
        <van-field
          required
          v-model="form.author"
          label="作者:"
          placeholder="请输入作者"
          :rules="[{ required: true, message: '作者不能为空' }]"
        />
        <!-- 公司 -->
        <van-field
          readonly
          v-model="form.orgName"
          label="公司:"
          placeholder="请输入公司"
        />
        <!-- 素材类别 -->
        <resource-type v-model="form.resourceType" />
        <!-- 项目工程名称 -->
        <project-picker
          v-model:id="form.projectId"
          v-model:name="form.projectName"
        />
        <!-- 报道日期 -->
        <v-date-picker
          v-model="form.shootingTime"
          label="拍摄时间:"
          placeholder="请选择拍摄时间"
        />

        <!-- 拍摄地点 -->
        <v-area-picker
          required
          v-model="form.shootingArea"
          :columns="globalOptions"
          label="拍摄地点:"
          placeholder="请选择拍摄地点"
          :rules="[{ required: true, message: '请输入拍摄地点' }]"
          :columns-field-names="{
            text: 'label',
            value: 'value',
            children: 'children'
          }"
        />

        <!-- 图片视频素材 -->
        <van-field
          class="media-review"
          :label="form.mediaType === '1' ? '图片素材:' : '视频素材:'"
          label-align="top"
        >
          <template #input>
            <media-review
              :type="form.mediaType === '1' ? 'image' : 'video'"
              :media-submit="form.mediaStatus"
              :media-list="form.mediaList"
              @nameChange="handleChangeName"
              @checkedChange="handleCheckedChange"
              @update-score="handleScore"
              @update-video="handleUpdateVideo"
            />
          </template>
        </van-field>

        <!-- 素材简介 -->
        <van-field
          required
          v-model="form.materialBrief"
          rows="2"
          autosize
          show-word-limit
          maxlength="300"
          type="textarea"
          label="素材简介:"
          placeholder="请输入素材简介"
          :rules="[{ required: true, message: '请输入素材简介' }]"
        />
      </van-cell-group>

      <van-button class="mt-2" block round type="danger" @click="NoAudit">
        退回
      </van-button>
      <van-button class="mt-2" block round type="primary" native-type="submit">
        通过审核
      </van-button>
      <van-button
        block
        round
        class="mt-2"
        type="success"
        @click="handlePassAndSubmitGroup"
        v-if="form.mediaStatus == '1'"
      >
        通过并呈报集团
      </van-button>
    </van-form>
    <van-dialog
      v-model:show="isShowNameDialog"
      title="请输入理由"
      show-cancel-button
      :before-close="onNameDialogBeforeClose"
    >
      <!-- 输入框 -->
      <van-field
        required
        :rules="[{ required: true, message: '请填写退回理由' }]"
        v-model="remark"
        input-align="center"
        placeholder="请输入理由"
        v-fofo
      />
    </van-dialog>
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

  :deep(.media-review) {
    .van-checkbox-group {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fit, 8rem);
      justify-content: space-between;
      row-gap: 10px;
      column-gap: normal;

      .van-checkbox {
        overflow: visible;
        white-space: nowrap;
      }

      .media-container {
        overflow: hidden;
        position: relative;
        width: 100%;

        .van-image {
          width: 100%;
          height: 8rem;
          background-color: #eee;
        }
      }
    }
  }
</style>
