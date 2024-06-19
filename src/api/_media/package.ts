import request from '@/utils/request';

import { PaginationProps } from '@/types/list';
import { PackageMainQuery, PackageMain } from '@/types/_media/task';

// 查询【系统】打包分组列表
export function listPackageMain(
  query: PackageMainQuery,
  page?: PaginationProps
): Promise<Resp<PackageMain[]>> {
  return request('get', `/packageGroup/packageMain/list`, {
    params: { ...page, ...query }
  });
}
