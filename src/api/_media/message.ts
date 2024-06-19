import request from '@/utils/request';

import { MessageViewVo } from '@/types/_message';

export function getActionMap(): Promise<Resp<Record<string, boolean>>> {
  return request('get', `/messageConfig/wap/actions`);
}

// 获取消息详细信息，用于动态渲染
export function getMessageVo(id: number): Promise<Resp<MessageViewVo>> {
  return request('get', `/message/view/wap/` + id);
}

export function pullMessageList(): Promise<Resp<void>> {
  return request('get', `/message/pullMessageList`);
}
