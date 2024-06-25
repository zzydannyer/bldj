import request from '@/utils/request';

//消息通知详情
export function GET_CONTENT_VIEW(uid: string, type = 'view') {
  //（checkView审核查阅-无需判断权限）
  return request<ResData<any>>({
    url:
      type === 'checkView' ? '/mobile/viewDetailCheck' : '/mobile/viewDetail',
    method: 'GET',
    params: {
      uid,
      type
    }
  });
}

export default {
  GET_CONTENT_VIEW
};
