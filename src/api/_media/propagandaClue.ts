import request from '@/utils/request';

import {
  PropagandaClueQuery,
  PropagandaClue,
  PropagandaMainAndClue,
  PropagandaMainAndClueBo,
  PropagandaMainAndClueVo
} from '@/types/_media/propagandaClue';
import { PaginationProps } from '@/types/list';

// 查询宣传考核申报-新闻线索列表
export function listPropagandaClue(
  query: PropagandaClueQuery,
  page?: PaginationProps
): Promise<Resp<PropagandaClue[]>> {
  return request('get', `/multimedia/propagandaClue/list`, {
    params: { ...page, ...query }
  });
}

// 查询宣传考核审核-新闻线索列表
export function listAuditPropagandaClue(
  query: PropagandaClueQuery,
  page?: PaginationProps
): Promise<Resp<PropagandaClue[]>> {
  return request('get', `/multimedia/propagandaClue/listAudit`, {
    params: { ...page, ...query }
  });
}

// 查询宣传考核-新闻线索详细
export function getPropagandaClue(id: string): Promise<Resp<PropagandaClue>> {
  return request('get', `/multimedia/propagandaClue/` + id);
}

// 新增宣传考核-新闻线索
export function addPropagandaClue(data: PropagandaClue): Promise<Resp<void>> {
  return request('post', `/multimedia/propagandaClue`, { data: data });
}

// 修改宣传考核-新闻线索
export function updatePropagandaClue(
  data: PropagandaClue
): Promise<Resp<void>> {
  return request('put', `/multimedia/propagandaClue`, { data: data });
}

// 提交宣传考核-新闻线索
export function submitPropagandaClue(id: number): Promise<Resp<boolean>> {
  return request('put', `/multimedia/propagandaClue/submit/` + id);
}

// 通过宣传考核-新闻线索
export function passPropagandaClue(id: number): Promise<Resp<boolean>> {
  return request('put', `/multimedia/propagandaClue/pass/` + id);
}

// 删除宣传考核-新闻线索
export function delPropagandaClue(id: number | number[]): Promise<Resp<void>> {
  return request('delete', `/multimedia/propagandaClue/` + id);
}

// 判断当前用户所选项目是否为重要新闻线索 需要额外加上时间范围判断
export function validateImportantClue(
  data: PropagandaMainAndClueBo
): Promise<Resp<PropagandaMainAndClueVo>> {
  return request('post', `/multimedia/propagandaClue/validateImportantClue`, {
    data: data
  });
}

// 查询宣传考核-新闻线索详细
export function checkChooseDetail(
  data: PropagandaMainAndClueBo
): Promise<Resp<String>> {
  return request('post', `/multimedia/propagandaClue/checkChooseDetail`, {
    data: data
  });
}
