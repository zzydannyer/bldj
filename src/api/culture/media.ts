import request from '@/utils/request';

export class CultureMediaParams {
  mediaTitleLike = '';
  authorLike = '';
  orgNameLike = '';
  resourceType = '';
}

export interface MediaMain {
  author: string;
  isExce: '0' | '1';
  isRecom: '0' | '1';
  materialBrief: string;
  mediaStatus: '0' | '1' | '2' | '3'; //0:编辑 1：提交 2：审核通过 3：审核退回"
  mediaTitle: string;
  mediaType: '1' | '2'; // 1:图片 2：视频
  orgId: string;
  orgName: string;
  resourceType: string;
  submitTime: string;
  uid: string;
}

// 查询【媒体资料库】主列表
function listMediaMain(params: CultureMediaParams) {
  return request<ResData<MediaMain[]>>({
    url: '/media/mediaMain/list',
    method: 'GET',
    params
  });
}

// 查询【媒体资料库】主详细
function getMediaMain(uid: Numeric) {
  return request({
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
