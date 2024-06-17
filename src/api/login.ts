import request from '@/utils/request';
import { LoginReq, LoginRes, UserInfo } from '@/types/user';

// 登录
export function USER_LOGIN(data?: LoginReq) {
  return request<LoginReq, LoginRes>({
    url: '/login',
    method: 'post',
    data
  });
}

// 获取用户信息
export function GET_USER_INFO() {
  return request<null, UserInfo>({
    url: '/getInfo',
    method: 'get'
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
  GET_USER_INFO,
  LOGOUT
};
