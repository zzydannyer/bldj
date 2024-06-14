<script lang="ts" setup>
  import useUserInfoStore from '@/store/modules/userInfo';
  import { showFailToast, showSuccessToast } from 'vant';
  import { useTimeoutFn } from '@vueuse/core';
  import { useIcon, useImage } from '@/utils/assets';
  import { encrypt } from '@/plugins/encrypt';

  const router = useRouter();

  const form = reactive({
    username: '',
    password: ''
  });

  const login = async () => {
    try {
      const { code, msg } = await useUserInfoStore().login({
        password: encrypt(form.password),
        username: encrypt(form.username),
        captcha: 'mobile'
      });
      if (code !== 200) throw new Error(msg);
      showSuccessToast('登录成功');
      useTimeoutFn(() => {
        router.push('/home');
      }, 1000);
    } catch (e: unknown) {
      showFailToast(e);
    }
  };
</script>

<template>
  <van-form class="login-container" @submit="login">
    <van-row justify="center" align="center">
      <van-image width="30" height="30" :src="useIcon('logo')" />
      <span class="title">百联党建</span>
    </van-row>

    <van-cell-group>
      <van-field v-model="form.username" name="用户名" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <van-button block type="primary" native-type="submit">登录</van-button>
  </van-form>
</template>

<style lang="scss" scoped>
  .login-container {
    transform: translateY(150px);
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-content: center;
    gap: 24px;
    padding: 0 $body-padding;
    .title {
      @apply text-gray-700 text-2xl font-bold inline-block ml-3;
    }
    :deep(.van-field__right-icon) {
      display: flex;
      align-items: center;

      .verify-code {
        // prettier-ignore
        height: 30PX;
      }
    }
  }
</style>
