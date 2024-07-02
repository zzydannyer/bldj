<script setup lang="ts">
  import { Icon } from '@iconify/vue';
  import { useIcon } from '@/utils/assets';
  const router = useRouter();
  const form = ref({ code: '' });
  const showCalendar = ref(false);
  const onConfirm = (date) => {
    result.value = `${date.getMonth() + 1}/${date.getDate()}`;
    showCalendar.value = false;
  };
</script>
<template>
  <van-cell-group>
    <!--    <van-field v-model="value" label="文本" placeholder="输入框内容右对齐" input-align="right" />-->
    <v-picker
      required
      v-model="form.cocodede"
      :columns="[
        {
          text: '游客',
          value: 0
        },
        {
          text: 'sadaf',
          value: 1
        }
      ]"
      label="身份类型"
      placeholder="请选择类型"
      :rules="[{ required: true, message: '请选择类型' }]"
    />
  </van-cell-group>

  <van-cell-group class="mt-3">
    <!-- 头像 -->
    <van-field v-model="text" label="头像" input-align="right" />
    <!-- 姓名 -->
    <van-field v-model="tel" type="tel" label="姓名" input-align="right" />
    <!-- 出生日期 -->

    <van-field
      v-model="result"
      is-link
      readonly
      name="calendar"
      label="出生日期"
      @click="showCalendar = true"
      input-align="right"
    />
    <van-calendar v-model:show="showCalendar" @confirm="onConfirm" />

    <!-- 手机号码 -->
    <van-field
      v-model="tel"
      type="tel"
      label="手机号码"
      input-align="right"
      required
    />
    <!-- 地址 -->
    <van-field v-model="text" label="地址" input-align="right" />
  </van-cell-group>
  <div class="p-4">
    <van-button
      block
      class="button"
      size="small"
      to="uploadMaterials"
      type="primary"
      text="保存"
    />
  </div>
</template>
<style lang="scss" scoped>
  .button {
    @apply font-bold;
    --van-button-primary-background: #e22001;
    --van-button-primary-border-color: #e22001;
  }
</style>
