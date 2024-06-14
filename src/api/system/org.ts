import http from '@/utils/request';
import { Resp } from '@/utils/http/types.d';
import { SysOrg } from '@/types/system/sys-org';
import { SearchUser, SysUser } from '@/types/system/sys-user';
import { SysUserTreeVo } from '@/components/VTreeSelect/type';

// 查询组织列表
export function listOrg(params?: any): Promise<Resp<SysOrg[]>> {
  return http.request('get', '/system/org/list', { params });
}

export function listOrgChildren(parentId: number): Promise<Resp<SysOrg[]>> {
  return http.request('get', `/system/org/${parentId}/children`);
}
// 查询组织列表
export function treeselectOrg(): Promise<Resp<SysOrg[]>> {
  return http.request('get', '/system/org/treeselect');
}

// 查询组织列表（排除节点）
export function listOrgExcludeChild(orgId: string): Promise<Resp<SysOrg[]>> {
  return http.request('get', `/system/org/list/exclude/${orgId}`);
}

// 查询组织详细
export function getOrg(orgId: string): Promise<Resp<SysOrg>> {
  return http.request('get', `/system/org/${orgId}`);
}

export function listUserByPosition(orgId: number): Promise<Resp<SysUser[]>> {
  return http.request('get', `/system/org/${orgId}/users`);
}

export function searchUser(orgId: number, username: string): Promise<Resp<SearchUser[]>> {
  return http.request('get', `/system/org/${orgId}/searchUser/${username}`);
}

// 根据用户id获取信息
export function getUserInfo(linkId: number[]): Promise<Resp<SysUserTreeVo[]>> {
  return http.request('get', `/system/user/getUserInfo/${linkId}`);
}

export function searchOrg(name: string): Promise<Resp<{ code: string; name: string }[]>> {
  return http.request('get', `/system/org/search/${name}`);
}

// 获取14家子分公司
export function listCompanyOrg(): Promise<Resp<any[]>> {
  return http.request('get', `/system/org/listOrg`);
}
