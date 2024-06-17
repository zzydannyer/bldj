<script lang="ts" setup>
  import useUserInfoStore from '@/store/modules/userInfo';
  import { showFailToast, showSuccessToast } from 'vant';
  import { useIcon, useImage } from '@/utils/assets';
  import { encrypt } from '@/plugins/encrypt';

  const router = useRouter();

  const form = reactive({
    username: '',
    password: ''
  });

  const login = async () => {
    try {
      await useUserInfoStore().login({
        password: encrypt(form.password),
        username: encrypt(form.username),
        captcha: 'mobile'
      });
      showSuccessToast('登录成功');
      setTimeout(() => {
        router.push('/home');
      }, 1000);
    } catch (e: unknown) {
      showFailToast(e as string);
    }
  };
  function init(code: string, state: string) {
    const data = {
      socialCode: code,
      socialState: state,
      source: 'feishu'
    };
  }
  // window.h5sdk?.ready(() => {
  //   //  lark.ready参数为回调函数，在环境准备就绪时触发
  //   console.log('ok');
  //   window.tt?.requestAccess({
  //     appID: 'cli_a38ad1626cb99013',
  //     scopeList: [],
  //     // 获取成功后的回调
  //     success(res: any) {
  //       console.log(res);
  //       // init(res.code, res.state)
  //     },
  //     // 获取失败后的回调
  //     fail(err: unknown) {
  //       console.log(JSON.stringify(err));
  //     }
  //   });
  // });
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
