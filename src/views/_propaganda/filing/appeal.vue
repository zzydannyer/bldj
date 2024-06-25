<script setup lang="ts">
  import { appealPropaganda } from '@/api/_media/propaganda';
  import { showFailToast, showSuccessToast } from 'vant';
  import useUserInfoStore from '@/store/modules/user';
  import { storeToRefs } from 'pinia';
  const route = useRoute();
  const router = useRouter();
  // 提交
  const form: any = ref({});
  const userInfoStore = useUserInfoStore();
  const { isGroup, isDepartment, isCompany } = storeToRefs(userInfoStore);

  const { id, orgCode }: any = route.params;
  const level = ref();

  // 媒体报送申报
  const handleAppeal = () => {
    if (isDepartment.value) {
      level.value = '3';
    }
    if (isCompany.value) {
      level.value = '1';
    }
    if (isGroup.value) {
      level.value = '2';
    }
  };

  const onSubmit = () => {
    // level是没有集团层面的
    // level: 1-公司层级 3-项目部级别 / result: 3-项目部向公司申诉 4-公司向集团申诉
    const result = level.value === '3' ? '3' : '4';
    form.value.level = level.value;
    form.value.auditResult = result;
    form.value.id = id;
    appealPropaganda(form.value).then((res) => {
      if (res.code === 200) {
        showSuccessToast(res.msg ?? '申诉成功');
        router.go(-1);
      } else {
        showFailToast(res.msg ?? '申诉失败');
      }
    });
  };
  onMounted(handleAppeal);
</script>
<template>
  <section class="container">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          autosize
          show-word-limit
          maxlength="300"
          type="textarea"
          v-model="form.appealBrief"
          name="申诉理由"
          label="申诉理由"
          placeholder="请输入申诉理由"
          :rules="[{ required: true, message: '请填写申诉理由' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交申诉
        </van-button>
      </div>
    </van-form>
  </section>
</template>
<style scoped lang="scss"></style>
