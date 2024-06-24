<script lang="ts" setup>
  import useUserInfoStore from '@/store/modules/userInfo';
  import {
    closeToast,
    showFailToast,
    showLoadingToast,
    showSuccessToast
  } from 'vant';
  import { useIcon } from '@/utils/assets';
  import { encrypt } from '@/plugins/encrypt';
  import { setToken, getToken } from '@/utils/auth';
  import { FeishuLoginReq } from '@/types/user';
  import AuthServer from '@/api/login';

  const route = useRoute();
  const router = useRouter();
  const { SET_USERINFO } = useUserInfoStore();

  const form = reactive({
    username: '',
    password: '',
    socialCode: '',
    socialState: '',
    source: 'feishu'
  });

  async function login(isFeishu: boolean = true) {
    try {
      showLoadingToast({
        message: '登录中...',
        forbidClick: true
      });
      let res;
      if (isFeishu) {
        await getSocialCode();
        if (!isBinding.value) {
          res = await AuthServer.FEISHU_REGISTER({
            ...form,
            password: encrypt(form.password),
            username: encrypt(form.username)
          });
        } else {
          res = await AuthServer.FEISHU_LOGIN({
            socialCode: form.socialCode,
            socialState: form.socialState,
            source: form.source
          });
        }
      } else {
        res = await AuthServer.USER_LOGIN({
          password: encrypt(form.password),
          username: encrypt(form.username)
        });
      }
      let token = res.data?.token;
      token && setToken(token);
      const { data: userInfo } = await AuthServer.GET_USER_INFO();
      SET_USERINFO(userInfo);
      showSuccessToast('登录成功');
      setTimeout(() => {
        router.push('/home');
      }, 1000);
    } catch (e: unknown) {
      showFailToast(e as string);
    } finally {
      setTimeout(() => {
        closeToast();
      }, 1000);
    }
  }

  const isBinding = ref(true);
  async function authBinding() {
    const { data } = await AuthServer.AUTH_BINDING({
      socialCode: form.socialCode,
      socialState: form.socialState,
      source: form.source
    });
    isBinding.value = data;
    if (data) {
      login(true);
    } else {
      showFailToast('账号未关联');
    }
  }
  // 调用JSAPI tt.requestAccess 获取 authorization code
  function getSocialCode(): Promise<void> {
    return new Promise((resolve, reject) => {
      window.tt.requestAccess({
        appID: 'cli_a38ad1626cb99013',
        scopeList: [],
        // 获取成功后的回调
        success(res: any) {
          console.log('🚀 ~ success ~ res:', res);
          form.socialCode = res.code;
          form.socialState = res.state;
          resolve();
        },
        // 获取失败后的回调
        fail(err: any) {
          console.log(`getAuthCode failed, err:`, JSON.stringify(err));
          reject();
        }
      });
    });
  }
  function beforeLogin() {
    if (!window.h5sdk) {
      console.log('invalid h5sdk');
      alert('please open in feishu');
      return;
    }

    window.h5sdk.error((err: any) => {
      console.error('h5sdk error:', JSON.stringify(err));
    });

    // 通过ready接口确认环境准备就绪后才能调用API
    window.h5sdk.ready(async () => {
      await getSocialCode();
      await authBinding();
    });
  }
  onBeforeMount(beforeLogin);
</script>

<template>
  <van-form class="login-container" @submit="login(true)">
    <van-row align="center" justify="center">
      <van-image class="-ml-6" height="30" :src="useIcon('logo')" width="30" />
      <span class="title">百联党建</span>
    </van-row>
    <transition name="van-slide-up">
      <section v-if="!isBinding">
        <van-cell-group>
          <van-field
            v-model="form.username"
            label="用户名"
            name="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="form.password"
            label="密码"
            name="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
            type="password"
          />
        </van-cell-group>
        <van-button block class="mt-2" native-type="submit" type="primary">
          绑定百联账号
        </van-button>
        <!-- <van-button block native-type="submit" type="primary">登录</van-button> -->
      </section>
    </transition>
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
