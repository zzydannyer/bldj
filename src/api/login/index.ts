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

export function FEISHU_LOGIN(data: FeishuLoginReq) {
  return request<ResData<LoginRes>>({
    url: '/social-login',
    method: 'POST',
    data
  });
}

export function FEISHU_REGISTER(data: FeishuLoginReq & LoginReq) {
  return request<ResData<LoginRes>>({
    url: '/auth/social/login',
    method: 'post',
    data
  });
}

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
    method: 'post'
  });
};

export default {
  USER_LOGIN,
  FEISHU_LOGIN,
  FEISHU_REGISTER,
  CALLBACK_LOGIN,
  GET_USER_INFO,
  LOGOUT
};
