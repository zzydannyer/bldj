import request from '@/utils/request';

export class CultureMediaParams {
  mediaTitleLike = '';
  authorLike = '';
  orgNameLike = '';
  resourceType = '';
}

type MediaType = '1' | '2';

interface MediaFile {
  author: string;
  fileName: string;
  fileSize: number;
  mediaMainId: string;
  mediaType: MediaType; // 1:图片 2：视频
  orgId: string;
  orgName: string;
  uid: string;
  url: string;
}

interface MediaAudits {
  uid: string;
  mainId: string;
  auditLevel: 1 | 2; // 1:公司层级 2：集团层级
  auditStatus: 0 | 1; // 0:创建 1：完成
  auditResult: 1 | 2; // 1:通过 2：退回
  auditDesc: string;
  auditUserId: string;
  isRecom: '0' | '1';
  isExce: '0' | '1';
  // isReject: null;
}

export class MediaMain {
  author = '';
  isExce?: '0' | '1';
  isRecom?: '0' | '1';
  materialBrief = '';
  mediaStatus?: '0' | '1' | '2' | '3'; //0:编辑 1：提交 2：审核通过 3：审核退回"
  mediaTitle = '';
  mediaType?: MediaType;
  orgId = '';
  orgName = '';
  resourceType = '';
  submitTime = '';
  uid = '';
  fileList?: MediaFile[];
  audits?: MediaAudits[];
}

export interface CategoryOption {
  id: string;
  label: string;
  parentId: string;
  weight: number;
  children?: CategoryOption[];
}

// 查询【媒体资料库】主列表
function listMediaMain(params: QueryParams<CultureMediaParams>) {
  return request<ResRows<MediaMain>>({
    url: '/media/mediaMain/list',
    method: 'GET',
    params
  });
}

// 查询【媒体资料库】主详细
function getMediaMain(uid: string) {
  return request<ResData<MediaMain>>({
    url: '/media/mediaMain/' + uid,
    method: 'GET'
  });
}

// 资源类型
export function getCategory() {
  return request<ResData<any>>({
    url: '/media/mediaMain/category/tree',
    method: 'GET'
  });
}

export default {
  LIST_MEDIA_MAIN: listMediaMain,
  GET_MEDIA_MAIN: getMediaMain,
  GET_CATEGORY: getCategory
};
