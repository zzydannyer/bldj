import type { HomeResData } from '@/types/home';
import request from '@/utils/request';
//首页
export function homeContentList() {
  return request<ResData<HomeResData>>({
    url: '/mobile/homeContent',
    method: 'GET'
  });
}
