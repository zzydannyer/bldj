import { defineStore } from 'pinia';
import { stringify, parse } from 'qs';
import { rmToken } from '@/utils/auth';
import type { UserInfo } from '@/types/user';
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
    SET_USERINFO({ permissions, roles, user, party }: UserInfo) {
      this.permissions = permissions;
      this.roles = roles;
      this.user = user;
      this.party = party;
    },
    CLEAR_USERINFO() {
      this.$reset();
      sessionStorage.clear();
    },
    LOGOUT() {
      this.$reset();
      rmToken();
      showSuccessToast('退出成功');
    }
  }
});

export default useUserInfoStore;
