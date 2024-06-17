import http from '@/utils/request';
import { Resp } from '@/utils/http/types.d';
import { CrccUserImport, SysUser, SysUserQuery } from '@/types/_system/sysUser';
import { SysRole } from '@/types/_system/sysRole';

export type UserDetailed = {
  roles: SysRole[];
  user: SysUser;
  roleIds: number[];
};
// 查询用户列表
export function listUser(params: any): Promise<Resp<SysUser[]>> {
  return http.request('get', '/system/user/list', { params });
}

//用户下拉选择
export function selectUser(params?: SysUserQuery): Promise<Resp<SysUser[]>> {
  return http.request('get', '/system/user/selectList', { params });
}

// 新增用户
export function addUser(data: SysUser): Promise<Resp<void>> {
  return http.request('post', '/system/user', { data });
}

// 修改用户
export function updateUser(data: SysUser): Promise<Resp<void>> {
  return http.request('put', '/system/user', { data });
}

// 删除用户
export function delUser(userId: number | number[]): Promise<Resp<void>> {
  return http.request('delete', `/system/user/${userId}`);
}

// 用户密码重置
export function resetUserPwd(userId: number, password: string): Promise<Resp<void>> {
  const data = {
    userId,
    password
  };
  return http.request('put', '/system/user/resetPwd', { data });
}

// 用户状态修改
export function changeUserStatus(userId: string, status: string): Promise<Resp<void>> {
  const data = {
    userId,
    status
  };
  return http.request('put', '/system/user/changeStatus', { data });
}

// 查询用户个人信息
export function getUserProfile(): Promise<Resp<SysUser>> {
  return http.request('get', '/system/user/profile');
}

// 修改用户个人信息
export function updateUserProfile(data: SysUser): Promise<Resp<void>> {
  return http.request('put', '/system/user/profile', { data });
}

// 用户密码重置
export function updateUserPwd(oldPassword: string, newPassword: string): Promise<Resp<void>> {
  const params = {
    oldPassword,
    newPassword
  };
  return http.request('put', '/system/user/profile/updatePwd', { params });
}

// 查询授权角色
export function getAuthRole(userId: string): Promise<Resp<UserDetailed>> {
  return http.request('get', `/system/user/authRole/${userId}`);
}

// 保存授权角色
export function updateAuthRole(params: { userId: string; roleIds: number[] }): Promise<Resp<void>> {
  return http.request('put', '/system/user/authRole', { params });
}

// 查询机构下拉树结构
export function orgTreeSelect(): Promise<Resp<{ id: number; label: string }[]>> {
  return http.request('get', '/system/user/orgTree');
}

export function importCrccUser(data: CrccUserImport): Promise<Resp<void>> {
  return http.request('post', '/system/user/importCrccUser', {
    data: data
  });
}
