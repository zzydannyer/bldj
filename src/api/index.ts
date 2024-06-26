import request from '@/utils/request';

//第一议题制度统计
export function getSummaryByMonth(year: string, month: string) {
  return request({
    url: `/mobile/topicSystem/summary/${year}/${month ?? new Date().getMonth() + 1}`,
    method: 'GET'
  });
}
//第一议题制度列表
export function listSummary(params: any) {
  return request({
    url: '/mobile/topicSystem/list',
    method: 'GET',
    params
  });
}
//第一议题制度详情
export function getTopicSystem(uid: Numeric) {
  return request({
    url: '/mobile/topicSystem/' + uid,
    method: 'GET'
  });
}

//组织列表
export function getOrganisationInfo(params: any) {
  return request({
    url: '/mobile/dmInformation/orgList',
    method: 'GET',
    params
  });
}

//会议议题对象
export function getMeetTopicInfo(params: any) {
  return request({
    url: '/mobile/dmInformation/meetTopicList',
    method: 'GET',
    params
  });
}

//制度对象
export function getInstitutionInfo(params: any) {
  return request({
    url: '/mobile/dmInformation/insList',
    method: 'GET',
    params
  });
}
//制度列表
export function listDmInstitutionByPartyOrgId(params: any) {
  return request({
    url: '/mobile/dmInstitution/list',
    method: 'GET',
    params
  });
}
//制度详情
export function getDmInstitution(uid: Numeric) {
  return request({
    url: '/mobile/dmInstitution/' + uid,
    method: 'GET'
  });
}
//党组织
export function getOrgDetail() {
  return request({
    url: `/mobile/getOrgDetail`,
    method: 'GET'
  });
}

//todo 0091 党建入章
export function getDjrz() {
  return request({
    url: `/mobile/getDjrz`,
    method: 'GET'
  });
}
//换届选举
export function getHjxj() {
  return request({
    url: `/mobile/getHjxj`,
    method: 'GET'
  });
}
//劳模
export function getLm() {
  return request<ResData<any>>({
    url: `/mobile/getLm`,
    method: 'GET'
  });
}
//员工关爱
export function getYgga() {
  return request({
    url: `/mobile/getYgga`,
    method: 'GET'
  });
}
//重点工作督办集团列表
export function listWorkSupervise(type: string, params: any) {
  return request({
    url: '/mobile/workSupervise/list/' + type,
    method: 'GET',
    params
  });
}
//重点工作督办基层列表
export function jcListWorkSupervise(type: string, params: any) {
  return request({
    url: '/mobile/workSupervise/jc/list/' + type,
    method: 'GET',
    params
  });
}
//重点工作督办集团详情
export function getWorkSupervise(workSupId: Numeric) {
  return request({
    url: '/mobile/workSupervise/detail',
    method: 'GET',
    params: {
      workSupId
    }
  });
}
//重点工作督办基层详情
export function getWorkSuperviseJc(workSupId: Numeric) {
  return request({
    url: '/mobile/workSupervise/jc/detail',
    method: 'GET',
    params: {
      workSupId
    }
  });
}
//学习记录
export function studyrecordList(params: any) {
  return request({
    url: '/mobile/studyrecord/list',
    method: 'GET',
    params
  });
}
//学习记录详情
export function studyrecordGet(uid: Numeric) {
  return request({
    url: '/mobile/studyrecord/get/' + uid,
    method: 'GET'
  });
}

//特殊树
//学习相关：study_org
export function dynamicCentralTree(type: string) {
  return request({
    url: `mobile/dynamicCentral/${type}`,
    method: 'GET'
  });
}
//学习记录统计
export function studyrecordListCounts(params: any) {
  return request({
    url: '/mobile/studyrecord/listCounts',
    method: 'GET',
    params
  });
}

//三会一课列表
export function meetingrecordList(params: any) {
  return request({
    url: '/mobile/meetingrecord/list',
    method: 'GET',
    params
  });
}
//三会一课新增
export function meetingrecordSave(params: any) {
  return request({
    url: '/mobile/meetingrecord/save',
    method: 'POST',
    data: params
  });
}
//三会一课详情
export function meetingrecordGet(uid: Numeric) {
  return request({
    url: '/mobile/meetingrecord/get/' + uid,
    method: 'GET'
  });
}
//党建帮扶
export function getSocietyDjHelpList(dateArray: any[]) {
  return request({
    url: '/mobile/societyDjHelp/getSummaryList',
    method: 'GET',
    params: {
      dateArray
    }
  });
}
//消费帮扶
export function getSocietyConsumeHelpList(dateArray: any[]) {
  return request({
    url: '/mobile/societyConsumeHelp/getSummaryList',
    method: 'GET',
    params: {
      dateArray: dateArray
    }
  });
}
// 查询【社会责任】消费帮扶详细
export function getSocietyConsumeHelp(uid: Numeric) {
  return request({
    url: '/mobile/societyConsumeHelp/' + uid,
    method: 'GET'
  });
}
// 查询【社会责任】党建帮扶详细
export function getSocietyDjHelp(uid: Numeric) {
  return request({
    url: '/culture/societyDjHelp/' + uid,
    method: 'GET'
  });
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'GET'
  });
}
