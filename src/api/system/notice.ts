import { SysNoticeQuery, SysNotice } from '@/types/_system/sysNotice';
import http from '@/utils/request';
import { Resp } from '@/utils/http/types.d';
import { PaginationProps } from '@/types/list';

// 查询公告列表
export function listNotice(query?: SysNoticeQuery, page?: PaginationProps): Promise<Resp<SysNotice[]>> {
  return http.request('get', '/system/notice/list', {
    params: { ...query, ...page }
  });
}

// 查询公告详细
export function getNotice(noticeId: Numeric): Promise<Resp<SysNotice>> {
  return http.request('get', '/system/notice/' + noticeId);
}

// 新增公告
export function addNotice(data: SysNotice): Promise<Resp<void>> {
  return http.request('post', '/system/notice', { data });
}

// 修改公告
export function updateNotice(data: SysNotice): Promise<Resp<void>> {
  return http.request('put', '/system/notice', { data });
}

// 删除公告
export function delNotice(noticeId: number | number[]): Promise<Resp<void>> {
  return http.request('delete', '/system/notice/' + noticeId);
}
