import http from '@/utils/request';
import { Resp } from '@/utils/http/types.d';
import { PaginationProps } from '@/types/list';
import { PublicResourceFileQuery, PublicResourceFile } from '@/types/media/publicResource';

// 查询【公共】公共资源附件列表
export function listPublicResourceFile(query: PublicResourceFileQuery, page?: PaginationProps): Promise<Resp<PublicResourceFile[]>> {
  return http.request('get', `/publicresource/publicResourceFile/list`, {
    params: { ...page, ...query }
  });
}

// 查询【公共】公共资源附件详细
export function getPublicResourceFile(id: Numeric): Promise<Resp<PublicResourceFile>> {
  return http.request('get', `/publicresource/publicResourceFile/` + id);
}

// 新增【公共】公共资源附件
export function addPublicResourceFile(data: PublicResourceFile): Promise<Resp<void>> {
  return http.request('post', `/publicresource/publicResourceFile`, {
    data: data
  });
}

// 删除【公共】公共资源附件
export function delPublicResourceFile(id: number | number[]): Promise<Resp<void>> {
  return http.request('delete', `/publicresource/publicResourceFile/` + id);
}

// 删除【公共】公共资源附件
export function listPublicResourceLatest(): Promise<Resp<PublicResourceFile[]>> {
  return http.request('get', `/publicresource/publicResourceFile/latest`);
}
// 切换是否在主页显示开关
export function updataIsHomeShow(query: PublicResourceFileQuery): Promise<Resp<PublicResourceFile[]>> {
  return http.request('post', `/publicresource/publicResourceFile/isHomeShow`, {
    data: query
  });
}
