import { SysUser } from './system/sysUser';

// 用户信息
export interface UserInfo {
  orgCode: string;
  username: string;
  user: SysUser;
  roles: string[];
  auths: string[];
}

export interface LoginReq {
  username: string;
  password: string;
  captcha: string;
}

// 登录返回信息
export interface LoginResult {
  token: string;
}
