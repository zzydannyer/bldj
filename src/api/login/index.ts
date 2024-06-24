import request from '@/utils/request';
import { LoginReq, LoginRes, FeishuLoginReq, UserInfo } from '@/types/user';

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
