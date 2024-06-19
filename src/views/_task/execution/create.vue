<script setup lang="ts">
  import { MediaMain } from '@/types/_media';
  import { addMedia, directSubmitMedia } from '@/api/_media/index';
  import { _5_years_ago } from '@/utils/date';
  import { showSuccessToast } from 'vant';
  import { emitter } from '@/plugins/mitt';
  import ProjectPicker from '@/views/media/projectPicker.tsx';
  import { useGlobal } from '@/utils';
  import { FieldRuleValidator } from 'vant/es/field/types';
  import ResourceType from '@/views/media/resourceType.tsx';
  // import VueOfficePdf from '@vue-office/pdf'

  const { $parse } = useGlobal<GlobalPropertiesApi>();
  const form = reactive<MediaMain>(new MediaMain());
  const route = useRoute();
  const router = useRouter();
  const { status, id } = route.params;
  // switch开关
  const switchValue = ref(true);
  const onSubmit = async (direct?: boolean) => {
    try {
      form.project = switchValue.value;
      form.mediaType = status as '1' | '2';
      form.shootingTime = $parse(form.shootingTime, 'YYYY-MM-DD HH:mm:ss');
      if (direct) form.workFeedbackId = id as string;
      const fn = direct === true ? directSubmitMedia : addMedia;
      const { code } = await fn(form);
      if (code === 200) {
        showSuccessToast('新增成功');
        router.push('/media/upload');
        emitter.emit('refresh');
      }
    } catch (e) {
    } finally {
    }
  };
  // 素材简介的校验
  const validator = (val: FieldRuleValidator) => {
    if (50 <= val.length * 1 && val.length <= 300) {
      return true;
    } else {
      return false;
    }
  };
</script>

<template>
  <section class="container">
    <van-form ref="formref" @submit="onSubmit">
      <van-cell-group inset>
        <!-- 关联项目 -->
        <van-field label="是否关联项目">
          <template #input>
            <van-switch
              size="16px"
              :active-value="true"
              :inactive-value="false"
              v-model="switchValue"
            ></van-switch>
          </template>
        </van-field>
        <!-- 项目工程名称 -->
        <project-picker
          v-if="switchValue"
          v-model:id="form.projectId"
          v-model:name="form.projectName"
        />

        <!-- 作者 -->
        <van-field
          required
          v-model="form.author"
          label="作者"
          placeholder="请输入作者"
          :rules="[{ required: true, message: '作者不能为空' }]"
        />
        <!-- 资源类别 -->
        <resource-type v-model="form.resourceType" />

        <!-- 报道日期 -->
        <v-date-picker
          required
          :rules="[{ required: true, message: '请上传拍摄时间' }]"
          v-model="form.shootingTime"
          label="拍摄时间"
          placeholder="请选择拍摄时间"
        />

        <!-- 拍摄地点 -->
        <v-area-picker
          required
          v-model="form.shootingArea"
          :columns="globalOptions"
          label="拍摄地点"
          placeholder="请选择拍摄地点"
          :rules="[{ required: true, message: '请输入拍摄地点' }]"
          :columns-field-names="{
            text: 'label',
            value: 'value',
            children: 'children'
          }"
        />
        <!-- 视频素材 -->
        <van-field
          required
          :rules="[{ required: true, message: '请上传视频素材' }]"
          label="视频素材"
          v-if="status === '2'"
        >
          <template #input>
            <v-uploader
              :http-params="{ mainId: form.id }"
              url="media"
              v-model="form.mediaList"
              type="video"
            />
          </template>
        </van-field>

        <!-- 图片素材 -->
        <van-field
          required
          :rules="[{ required: true, message: '请上传图片素材' }]"
          label="图片素材"
          v-else-if="status === '1'"
        >
          <template #input>
            <v-uploader
              :http-params="{ mainId: form.id }"
              url="media"
              v-model="form.mediaList"
              type="image"
            />
          </template>
        </van-field>

        <!-- 报道摘要 -->
        <van-field
          required
          v-model="form.materialBrief"
          rows="2"
          autosize
          show-word-limit
          maxlength="300"
          type="textarea"
          label="素材简介"
          placeholder="请输入素材简介"
          :rules="[
            { validator, message: '请输入50-300之间的字符' },
            { required: true, message: '请输入素材简介' }
          ]"
        />
      </van-cell-group>
      <div>
        <van-button
          class="my-4"
          round
          block
          type="primary"
          native-type="submit"
        >
          确定
        </van-button>
        <van-button
          class="my-4"
          round
          block
          type="success"
          @click="onSubmit(true)"
        >
          提交
        </van-button>
      </div>
    </van-form>
  </section>
</template>

<style lang="scss" scoped>
  :deep(.van-picker__toolbar) {
    .van-search {
      padding: 0;
      flex: 1;
    }
  }
</style>
