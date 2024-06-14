import { defineStore } from 'pinia';
import { stringify, parse } from 'qs';
import AuthServer from '@/api/auth';
import { rmToken, setAuth, setToken } from '@/utils/auth';
import type { userType } from '@/store/types';
import type { UserInfo, LoginResult, LoginReq } from '@/types/auth';
import { sessionKey } from '@/constants';
import { showSuccessToast } from 'vant';

const useUserInfoStore = defineStore('user-info', {
  persist: {
    key: sessionKey,
    storage: sessionStorage,
    paths: ['orgCode', 'userId', 'orgName', 'username', 'roles', 'auths'],
    serializer: {
      deserialize: parse,
      serialize: stringify
    },
    debug: true
  },
  state: (): userType => {
    return {
      // 用户id
      userId: '',
      // 用户名
      username: '',
      // 公司code
      orgCode: '',
      // 单位
      orgName: '',
      // 头像
      avatar: '',
      // 角色
      roles: [],
      // 权限
      auths: []
    };
  },
  getters: {
    isDepartment(state) {
      return state.roles && state.roles.includes('project-jbr');
    },
    isCompany(state) {
      return state.roles!.includes('company-jbr');
    },
    isGroup(state) {
      return state.orgCode!.length === 10 || state.orgCode?.slice(0, 12) === '000010002404' || state.roles?.includes('admin');
    }
  },
  actions: {
    set_user_info({ userId, orgCode, orgName, username, roles, roleNames, auths, avatar }: userType) {
      this.orgCode = orgCode;
      this.orgName = orgName;
      this.avatar = avatar;
      this.username = username;
      this.roles = roles;
      this.auths = auths;
      this.userId = userId;
    },
    clear_user_info() {
      this.$reset();
      sessionStorage.clear();
    },

    /**
     * @description 用户名登录
     * @param data
     */
    async login(data: LoginReq): Promise<LoginResult> {
      try {
        const { token } = await AuthServer.USER_LOGIN(data);
        console.log('🚀 ~ login ~ data:', data);

        setToken(token);
        const {
          user: { userId, orgCode, orgName, nickName },
          roles,
          roleNames,
          auths,
          avatars
        } = await AuthServer.GET_USER_INFO();
        setAuth(userId, orgCode, orgName, nickName, roles, roleNames, auths, avatars);
        return Promise.resolve({ code, token, msg });
      } catch (error: unknown) {
        return Promise.reject(error);
      }
    },

    /**
     * @description 前端登出(不调用接口)
     */
    logout() {
      this.$reset();
      rmToken();
      sessionStorage.clear();
      localStorage.clear();
      showSuccessToast('退出成功');
    }
  }
});

export default useUserInfoStore;
