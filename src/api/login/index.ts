import request from '@/utils/request';

// 用户信息
export interface UserInfo {
  permissions: string[];
  roles: string[];
  user: {
    uid: string;
    loginName: string;
    loginPwd: string;
    salt: string;
    realName: string;
    orgId: string;
    orgName: string;
    mobile: string;
    email: string;
    birthday: string;
    sex: string;
    partyMemberId: string;
    ghMemberId: string;
    twMemberId: string;
    partyOrgId: string;
    partyOrgName: string;
    ghOrgId: string;
    twOrgId: string;
    avatar: string;
    isNeedUpdate: string;
    upTime: string;
    createTime: string;
    creatorUid: string;
    creatorRealName: string;
    isActive: string;
    partyScopeOrgId: string;
    orgLevel: number;
    updatePasswordDate: string;
    permissionMap: string;
    roleList: string;
    roleUids: string;
    roleNameList: string;
    isOrgDirect: boolean;
  };
  party: {
    partyScopeName: string;
    partyScopeId: string;
    partyName: string;
    partyId: string;
  };
}

// 登录请求参数
export interface LoginReq {
  username: string;
  password: string;
  captcha?: string;
}

// 登录返回信息
export interface LoginRes {
  token: string;
}

// 飞书登录
export interface FeishuLoginReq {
  socialCode: string;
  socialState: string;
  source: string;
}
// 登录
export function USER_LOGIN(data?: LoginReq) {
  return request<ResData<LoginRes>>({
    url: '/login',
    method: 'POST',
    data
  });
}

// 检查是否已经绑定飞书账号
export function AUTH_BINDING(params: FeishuLoginReq) {
  return request<ResData<boolean>>({
    url: '/auth/social/isBinding',
    method: 'GET',
    params
  });
}

//登录飞书账号
export function FEISHU_LOGIN(data: FeishuLoginReq) {
  return request<ResData<LoginRes>>({
    url: '/social-login',
    method: 'POST',
    data
  });
}

// 绑定飞书账号
export function FEISHU_REGISTER(data: FeishuLoginReq & LoginReq) {
  return request<ResData<LoginRes>>({
    url: '/auth/social/login',
    method: 'POST',
    data
  });
}

// 暂时没用
export function CALLBACK_LOGIN(data: FeishuLoginReq) {
  return request<ResData<unknown>>({
    url: '/auth/social/callback',
    method: 'POST',
    data
  });
}

// 获取用户信息
export function GET_USER_INFO() {
  return request<ResData<UserInfo>>({
    url: '/getInfo',
    method: 'GET'
  });
}

export const LOGOUT = () => {
  return request({
    url: '/logout',
    method: 'POST'
  });
};

export default {
  USER_LOGIN,
  AUTH_BINDING,
  FEISHU_LOGIN,
  FEISHU_REGISTER,
  CALLBACK_LOGIN,
  GET_USER_INFO,
  LOGOUT
};
