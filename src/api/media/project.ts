import http from '@/utils/request';
import { Resp } from '@/utils/http/types.d';
import { PaginationProps } from '@/types/list';
import { ProjectQuery, Project } from '@/types/_media/project';

// 查询【项目】项目清单列表
export function listProject(query: ProjectQuery, page?: PaginationProps): Promise<Resp<Project[]>> {
  return http.request('get', `/project/projectManage/list`, {
    params: { ...page, ...query }
  });
}
export function syncProject(): Promise<Resp<void>> {
  return http.request('post', `/project/projectManage/sync`);
}

// 查询【项目】项目清单详细
export function getProject(id: number): Promise<Resp<Project>> {
  return http.request('get', `/project/projectManage/` + id);
}

// 新增【项目】项目清单
export function addProject(data: Project): Promise<Resp<void>> {
  return http.request('post', `/project/projectManage`, { data: data });
}

// 修改【项目】项目清单
export function updateProject(data: Project): Promise<Resp<void>> {
  return http.request('put', `/project/projectManage`, { data: data });
}

// 设置重点项目
export function keyProject(id: number): Promise<Resp<void>> {
  return http.request('put', `/project/projectManage/key/` + id);
}

// 删除【项目】项目清单
export function delProject(id: number | number[]): Promise<Resp<void>> {
  return http.request('delete', `/project/projectManage/` + id);
}

export function listProjectCompany(id: number): Promise<Resp<boolean>> {
  return http.request('get', `/project/projectManage/companyList/` + id);
}
// 修改【项目】关联公司项目清单
export function updateCompanyList(data: string[] | number[]): Promise<Resp<void>> {
  return http.request('put', `/project/projectManage/updateCompanyList`, {
    data: data
  });
}

export function getCompanyLinkList(id: number): Promise<Resp<Project>> {
  return http.request('get', `/project/projectManage/getCompanyLinkList/` + id);
}

// 根据公司code获取已关联的项目
export function getProjectByOrgCode(params: { orgCode: Numeric }): Promise<Resp<Project[]>> {
  return http.request('get', `/project/projectManage/getProjectByOrgCode`, {
    params
  });
}

export function listProjectSelectOptions(keyword?: string): Promise<Resp<{ id: number; name: string }[]>> {
  return http.request('get', '/project/projectManage/select', {
    params: { keyword }
  });
}
