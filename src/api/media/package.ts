import http from '@/utils/request';
import { Resp } from '@/utils/http/types.d';
import { PaginationProps } from '@/types/list';
import { PackageMainQuery, PackageMain } from '@/types/media/task';

// 查询【系统】打包分组列表
export function listPackageMain(query: PackageMainQuery, page?: PaginationProps): Promise<Resp<PackageMain[]>> {
  return http.request('get', `/packageGroup/packageMain/list`, {
    params: { ...page, ...query }
  });
}
