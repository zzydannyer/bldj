import { defineStore } from 'pinia';
import { stringify, parse } from 'qs';
import AuthServer from '@/api/login';
import { rmToken, setToken, getToken } from '@/utils/auth';
import type { UserInfo, LoginRes, LoginReq } from '@/types/user';
import { sessionKey } from '@/constants';
import { showSuccessToast } from 'vant';

const useUserInfoStore = defineStore('user-info', {
  persist: {
    key: sessionKey,
    storage: sessionStorage,
    paths: ['permissions', 'roles', 'user', 'party'],
    serializer: {
      deserialize: parse,
      serialize: stringify
    },
    debug: true
  },
  state: (): UserInfo => ({
    permissions: [],
    roles: [],
    user: {} as UserInfo['user'],
    party: {} as UserInfo['party']
  }),
  getters: {
    partyList(state) {
      const { partyId, partyName, partyScopeId, partyScopeName } = state.party;
      const list = [];
      list.push({ value: partyId, label: partyName });
      if (partyScopeId && partyId != partyScopeId) {
        list.push({ value: partyScopeId, label: partyScopeName });
      }
      return list;
    }
  },
  actions: {
    set_user_info({ permissions, roles, user, party }: UserInfo) {
      this.permissions = permissions;
      this.roles = roles;
      this.user = user;
      this.party = party;
    },
    clear_user_info() {
      this.$reset();
      sessionStorage.clear();
    },
    async login(data: LoginReq): Promise<void> {
      try {
        const { token } = await AuthServer.USER_LOGIN(data);
        setToken(token);
        const userInfo = await AuthServer.GET_USER_INFO();
        this.set_user_info(userInfo);
        Promise.resolve();
      } catch (error: unknown) {
        Promise.reject(error);
      }
    },

    logout() {
      this.$reset();
      rmToken();
      showSuccessToast('退出成功');
    }
  }
});

export default useUserInfoStore;
