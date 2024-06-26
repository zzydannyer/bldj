import request from '@/utils/request';
import { ChannelId } from '@/constants';

//todo 0081 文章通用
function LIST_BY_CHANNEL_ID(id: ChannelId, params: any) {
  return request({
    url: `/mobile/content/channel/${id}/list`,
    method: 'GET',
    params
  });
}

export default {
  LIST_BY_CHANNEL_ID
};
