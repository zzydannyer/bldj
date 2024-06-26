import request from '@/utils/request';

// 查询【媒体资料库】主列表
function listMediaMain(params: any) {
  return request({
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

export default {
  LIST_MEDIA_MAIN: listMediaMain,
  GET_MEDIA_MAIN: getMediaMain
};
