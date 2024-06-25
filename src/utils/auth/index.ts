import Cookies from 'js-cookie';
import useUserInfoStore from '@/store/modules/user';
import { parse } from 'qs';
import { sessionKey, TokenKey } from '@/constants';
import { isString, includes } from 'lodash';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function rmToken() {
  Cookies.remove(TokenKey);
}

export function formatToken(token: string) {
  return 'Bearer ' + token;
}

function isIncludeAllChildren(value: Array<string>, auths: Array<string>) {
  const permissions = Object.values(auths);
  return value.every((auth) => permissions.includes(auth));
}

export function hasAuth(value: string | Array<string>): boolean {
  const { permissions } = useUserInfoStore();

  if (!permissions) return false;

  if (includes(permissions, '*:*:*')) return true;

  const isAuths = isString(value)
    ? includes(permissions, value)
    : isIncludeAllChildren(value, permissions);
  return isAuths ? true : false;
}
