import http from '@/utils/request';
import { Resp } from '@/utils/http/types.d';
import { PaginationProps } from '@/types/list';
import { WorkFeedback, Work, WorkQuery } from '@/types/_media/task';

// 查询工作督办列表
export function listWorkMain(query: WorkQuery, page?: PaginationProps): Promise<Resp<Work[]>> {
  return http.request('get', `/work/workMain/list`, {
    params: { ...page, ...query }
  });
}

// 查询工作督办详细
export function getWorkMain(id: string): Promise<Resp<Work>> {
  return http.request('get', `/work/workMain/` + id);
}

// 新增工作督办
export function addWorkMain(data: Work): Promise<Resp<void>> {
  return http.request('post', `/work/workMain`, { data: data });
}

// 修改工作督办
export function updateWorkMain(data: Work): Promise<Resp<void>> {
  return http.request('put', `/work/workMain`, { data: data });
}

// 下达任务
export function distributeWork(id: number): Promise<Resp<void>> {
  return http.request('put', `/work/workMain/distribute/${id}`);
}

// 撤回任务
export function withdrawWork(id: number): Promise<Resp<void>> {
  return http.request('put', `/work/workMain/withdraw/${id}`);
}

// 督查任务
export function supervisionWork(data: WorkFeedback[]): Promise<Resp<void>> {
  return http.request('put', `/work/workMain/supervision`, { data: data });
}

// 退回任务
export function recallWork(data: WorkFeedback[]): Promise<Resp<void>> {
  return http.request('put', `/work/workMain/recall`, { data: data });
}

// 催办任务
export function urgingWork(data: WorkFeedback[]): Promise<Resp<void>> {
  return http.request('put', `/work/workMain/urging`, { data: data });
}

// 删除工作督办
export function delWorkMain(id: number | number[]): Promise<Resp<void>> {
  return http.request('delete', `/work/workMain/` + id);
}

//桌面
export function getDesktopMap(date: string): Promise<Resp<Map<string, WorkFeedback[]>>> {
  return http.request('get', `/work/workMain/getDesktopMap/` + date);
}
export function getDesktopMapLeader(date: string): Promise<Resp<Map<string, Work[]>>> {
  return http.request('get', `/work/workMain/getDesktopMapLeader/` + date);
}
export function getDesktopListAll(): Promise<Resp<WorkFeedback[]>> {
  return http.request('get', `/work/workMain/getDesktopListAll`);
}
// 把任务强制办结,未完成的任务将不可再执行
export function completionWork(data: WorkFeedback[]): Promise<Resp<void>> {
  return http.request('post', `/work/workMain/completion`, { data: data });
}
