import { SysNoticeQuery, SysNotice } from '@/types/_system/sysNotice';
import request from '@/utils/request';

import { PaginationProps } from '@/types/list';

// 查询公告列表
export function listNotice(
  query?: SysNoticeQuery,
  page?: PaginationProps
): Promise<Res<SysNotice[]>> {
  return request('get', '/system/notice/list', {
    params: { ...query, ...page }
  });
}

// 查询公告详细
export function getNotice(noticeId: Numeric): Promise<Res<SysNotice>> {
  return request('get', '/system/notice/' + noticeId);
}

// 新增公告
export function addNotice(data: SysNotice): Promise<Res<void>> {
  return request('post', '/system/notice', { data });
}

// 修改公告
export function updateNotice(data: SysNotice): Promise<Res<void>> {
  return request('put', '/system/notice', { data });
}

// 删除公告
export function delNotice(noticeId: number | number[]): Promise<Res<void>> {
  return request('delete', '/system/notice/' + noticeId);
}
