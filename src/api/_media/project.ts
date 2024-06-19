import request from '@/utils/request';

import { PaginationProps } from '@/types/list';
import { ProjectQuery, Project } from '@/types/_media/project';

// 查询【项目】项目清单列表
export function listProject(
  query: ProjectQuery,
  page?: PaginationProps
): Promise<Res<Project[]>> {
  return request('get', `/project/projectManage/list`, {
    params: { ...page, ...query }
  });
}
export function syncProject(): Promise<Res<void>> {
  return request('post', `/project/projectManage/sync`);
}

// 查询【项目】项目清单详细
export function getProject(id: number): Promise<Res<Project>> {
  return request('get', `/project/projectManage/` + id);
}

// 新增【项目】项目清单
export function addProject(data: Project): Promise<Res<void>> {
  return request('post', `/project/projectManage`, { data: data });
}

// 修改【项目】项目清单
export function updateProject(data: Project): Promise<Res<void>> {
  return request('put', `/project/projectManage`, { data: data });
}

// 设置重点项目
export function keyProject(id: number): Promise<Res<void>> {
  return request('put', `/project/projectManage/key/` + id);
}

// 删除【项目】项目清单
export function delProject(id: number | number[]): Promise<Res<void>> {
  return request('delete', `/project/projectManage/` + id);
}

export function listProjectCompany(id: number): Promise<Res<boolean>> {
  return request('get', `/project/projectManage/companyList/` + id);
}
// 修改【项目】关联公司项目清单
export function updateCompanyList(
  data: string[] | number[]
): Promise<Res<void>> {
  return request('put', `/project/projectManage/updateCompanyList`, {
    data: data
  });
}

export function getCompanyLinkList(id: number): Promise<Res<Project>> {
  return request('get', `/project/projectManage/getCompanyLinkList/` + id);
}

// 根据公司code获取已关联的项目
export function getProjectByOrgCode(params: {
  orgCode: Numeric;
}): Promise<Res<Project[]>> {
  return request('get', `/project/projectManage/getProjectByOrgCode`, {
    params
  });
}

export function listProjectSelectOptions(
  keyword?: string
): Promise<Res<{ id: number; name: string }[]>> {
  return request('get', '/project/projectManage/select', {
    params: { keyword }
  });
}
