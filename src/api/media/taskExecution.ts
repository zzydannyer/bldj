import http from '@/utils/request';
import { PaginationProps } from '@/types/list';
import { Resp } from '@/utils/http/types.d';
import { WorkFeedback, Work, WorkQuery, WorkFeedbackQuery } from '@/types/media/task';
// 查询日常任务执行列表
export function listworkFeedback(query: WorkQuery, page?: PaginationProps): Promise<Resp<Work[]>> {
  return http.request('get', `/work/workFeedback/list`, {
    params: { ...page, ...query }
  });
}
// 查询工作督办基层反馈详细
export function getWorkFeedback(id: string): Promise<Resp<WorkFeedback>> {
  return http.request('get', `/work/workFeedback/` + id);
}
// 查询工作督办基层反馈(督查页内嵌列表)
export function listWorkFeedbackByWorkId(query: WorkFeedbackQuery, page?: PaginationProps): Promise<Resp<WorkFeedback[]>> {
  return http.request('get', `/work/workFeedback/listByWork`, {
    params: { ...page, ...query }
  });
}
// 保存工作督办
export function keepWorkFeedback(data: WorkFeedback): Promise<Resp<void>> {
  return http.request('put', `/work/workFeedback/keep`, { data: data });
}
// 提交(上报)工作督办
export function submitWorkFeedback(data: WorkFeedback): Promise<Resp<void>> {
  return http.request('put', `/work/workFeedback/submit`, { data: data });
}
// 撤回工作督办基层反馈
export function recallWorkFeedback(id: number): Promise<Resp<WorkFeedback>> {
  return http.request('post', `/work/workFeedback/recall/` + id);
}
// 查看工作督办
export function viewWorkFeedback(id: string): Promise<Resp<void>> {
  return http.request('put', `/work/workFeedback/view/${id}`);
}
