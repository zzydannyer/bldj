import http from '@/utils/request';
import { Resp } from '@/utils/http/types.d';
import { ScoreStandard, ScoreStandardMainBo, ScoreStandardDetail } from '@/types/media/scoreStandard';

// 查询【评分依据】标准列表
export function listScoreStandard(): Promise<Resp<any>> {
  return http.request('get', `/score/scoreStandard/list`, {});
}

// 改变开关状态
export function changeSwitch(params: { id: number; isSwitch: number }): Promise<Resp<boolean>> {
  return http.request('post', '/score/scoreStandardDetail/changeSwitch', {
    params
  });
}

// 改变单个对象内容
export function changeContent(data: ScoreStandardDetail): Promise<Resp<void>> {
  return http.request('post', `/score/scoreStandardDetail/changeContent`, {
    data: data
  });
}

// 新增/更新子表
export function addScoreStandard(data: ScoreStandardMainBo): Promise<Resp<any>> {
  return http.request('post', `/score/scoreStandardDetail/save`, {
    data: data
  });
}

// 获取评分表下拉选项
export function listOption(params: { mainId: string; parentId: string }): Promise<Resp<any>> {
  return http.request('get', `/score/scoreStandardDetail/listOption`, {
    params
  });
}

// 获取评分依据级联下拉框数据
export function listStandCascadeList(params: { type: string; operaType: String }): Promise<Resp<any>> {
  return http.request('get', `/score/scoreStandard/getCascadeList`, {
    params
  });
}
// 根据id删除评分标准
export function deleteById(params: { id: number; mainId: number; parentId: number; type: string }): Promise<Resp<any>> {
  return http.request('put', `/score/scoreStandardDetail/deleteById`, {
    params
  });
}
// 根据赋分依据返回集团认定归类 若为新媒体赋分依据 返回新媒体归类key 若非新媒体 返回空串
export function getNewMediaConfirm(params: { scoreId: string }): Promise<Resp<string>> {
  return http.request('get', `/score/scoreStandardDetail/getNewMediaConfirm`, {
    params
  });
}
// 校验赋分依据和归类是否匹配 返回true/false
export function checkScoreDetail(params: { scoreId: string; kind: string }): Promise<Resp<boolean>> {
  return http.request('get', `/score/scoreStandardDetail/checkScoreDetail`, {
    params
  });
}

// * 获取可选的报道时间范围
export function getDateRange(): Promise<Resp<{ startDate: Date; endDate: Date }>> {
  return http.request('get', `/multimedia/propaganda/dateRange`);
}

// 公司提交宣传考核时 若所选赋分为 外宣-省级媒体-广播 该公司从上年12月26日至今日总分大于等于10分时提示不再计分 原有逻辑不变
export function validatorAchieveScoreEnough(data: any): Promise<Resp<any>> {
  return http.request('get', `/multimedia/propaganda/validatorAchieveScoreEnough`, {
    params: data
  });
}
