<script setup lang="ts">
  import { Icon } from '@iconify/vue';
  import { useIcon } from '@/utils/assets';
  const router = useRouter();
  const form = ref({ code: '' });
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
</template>
<style lang="scss" scoped>
  .my-bg {
    @apply w-full h-[150PX] bg-no-repeat flex pt-12 pl-7;
    background-image: url('@/assets/images/bg.png');
    background-size: 100% 100%;
    .avatar-bg {
      @apply w-[55PX] h-[55PX] bg-white;
      .avatar {
        @apply w-[27PX] h-[27PX] text-red-600;
      }
    }
    .right-text {
      @apply h-[40PX] mt-2 ml-2;
    }
    .text-tit {
      @apply text-base text-white font-medium;
    }
    .text-b {
      @apply text-sm text-white;
    }
  }
</style>
