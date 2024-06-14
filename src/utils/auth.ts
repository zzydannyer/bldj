import Cookies from 'js-cookie';
import useUserInfoStore from '@/store/modules/userInfo';
import { parse } from 'qs';
import { sessionKey, TokenKey } from '@/constants';
import { isString, includes } from 'lodash';

/**
 * @description 获取`token`
 * 此处与`TokenKey`相同，此写法解决初始化时`Cookies`中不存在`TokenKey`报错
 */
export const getToken = (): string | undefined => Cookies.get(TokenKey);

/**
 * @description 格式化token
 * @param token
 */
export const formatToken = (token: string): string => 'Bearer ' + token;

/**
 * @description 设置`token`以及一些必要信息并采用无感刷新`token`方案
 */
export function setToken(token: string) {
  Cookies.set(TokenKey, token);
}

/** 删除`token`以及key值为`user-info`的session信息 */
export function rmToken() {
  Cookies.remove(TokenKey);
  sessionStorage.clear();
}

const isIncludeAllChildren = (value: Array<string>, auths: Array<string>) => {
  const permissions = Object.values(auths);
  return value.every((auth) => permissions.includes(auth));
};

export const hasAuth = (value: string | Array<string>): boolean => {
  const { auths } = useUserInfoStore();

  if (!auths) return false;

  if (includes(auths, '*:*:*')) return true;

  const isAuths = isString(value) ? includes(auths, value) : isIncludeAllChildren(value, auths);
  return isAuths ? true : false;
};

/**
 * @description
 * @param orgCode
 * @param username
 * @param roles
 * @param auths
 */
export function setAuth(
  userId: Numeric,
  orgCode: Numeric,
  orgName: string,
  username: string,
  roles: string[],
  roleNames: string[],
  auths: string[],
  avatar: string
) {
  const userInfoStore = useUserInfoStore();
  userInfoStore.set_user_info({
    userId,
    orgCode,
    orgName,
    username,
    roles,
    roleNames,
    auths,
    avatar
  });
}
