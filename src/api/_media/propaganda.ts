import request from '@/utils/request';

import { PaginationProps } from '@/types/list';
import {
  PropagandaMainQuery,
  PropagandaMain,
  PropagandaAuditBo,
  PropagandaSubmitToGroupVo,
  PropagandaAuditVo
} from '@/types/_media/propaganda';

// 查询【宣传考核】主列表 新增页面
export function listPropaganda(
  query: PropagandaMainQuery,
  page?: PaginationProps
): Promise<Resp<PropagandaMain[]>> {
  return request('get', `/multimedia/propaganda/list`, {
    params: { ...page, ...query }
  });
}
// 公司提交【宣传考核】主至集团待审
export function submitToGroupNew(
  data: PropagandaSubmitToGroupVo
): Promise<Resp<void>> {
  return request('post', `/multimedia/propaganda/submitToGroup`, {
    data: data
  });
}
// 查询【宣传考核】主列表 子分公司/总部总部审核页面
export function listAuditPropaganda(
  query: PropagandaMainQuery,
  page?: PaginationProps
): Promise<Resp<PropagandaMain[]>> {
  return request('get', `/multimedia/propaganda/auditList`, {
    params: { ...page, ...query }
  });
}

// 新增宣传考核审核
export function addPropagandaAudit(
  data: PropagandaAuditBo
): Promise<Resp<void>> {
  return request('post', `/multimedia/propagandaAudit/saveAudit`, {
    data: data
  });
}

// 获取审核记录
export function listAuditRecord(params: {
  mainId: string;
}): Promise<Resp<PropagandaAuditVo[]>> {
  return request('get', `/multimedia/propagandaAudit/listAuditRecord`, {
    params
  });
}

// 媒体报送申诉
export function appealPropaganda(data: any): Promise<Resp<boolean>> {
  return request('post', `/multimedia/propaganda/appealPropaganda`, {
    data: data
  });
}
// 提交宣传考核
export function submitPropaganda(
  id: number,
  roleType: string
): Promise<Resp<void>> {
  return request('put', `/multimedia/propaganda/submit/` + id + `/` + roleType);
}
// 查询【宣传考核】主详细
// type  view/edit/audit
export function getPropaganda(
  id: string,
  type: string
): Promise<Resp<PropagandaMain>> {
  return request('get', `/multimedia/propaganda/` + id + `/` + type);
}
// 新增【宣传考核】主
export function addPropaganda(data: PropagandaMain): Promise<Resp<void>> {
  return request('post', `/multimedia/propaganda`, { data: data });
}

// 修改【宣传考核】主
export function updatePropaganda(data: PropagandaMain): Promise<Resp<void>> {
  return request('put', `/multimedia/propaganda`, { data: data });
}

// 删除【宣传考核】主
export function delPropaganda(id: number | number[]): Promise<Resp<void>> {
  return request('delete', `/multimedia/propaganda/` + id);
}

// 判断当前人员是否有集团文化部角色
export function checkRole(): Promise<Resp<boolean>> {
  return request('get', `/multimedia/propaganda/checkRole`);
}

// 公司提交【宣传考核】主至集团待审
export function submitToGroup(id: number | number[]): Promise<Resp<void>> {
  return request('put', `/multimedia/propaganda/submitToGroup/` + id);
}

// 首页分数统计
export function listScoreSum(): Promise<Resp<void>> {
  return request('get', `/multimedia/propaganda/listScoreSum`);
}

// 首页优秀报道
export function listExcellentSum(): Promise<Resp<void>> {
  return request('get', `/multimedia/propaganda/listTableSum`);
}
// 查询【宣传考核】主列表 子分公司/总部总部审核页面
export function listAuditPropagandaMedia(
  query: PropagandaMainQuery,
  page?: PaginationProps
): Promise<Resp<PropagandaMain[]>> {
  return request('get', `/multimedia/propaganda/mediaAuditList`, {
    params: { ...page, ...query }
  });
}
