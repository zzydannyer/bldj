import request from '@/utils/request';

export interface DictData {
  code: string; // 字典项编码
  name: string; // 字典名称
}
export interface Dict {
  text: string; // 字典名称
  value: string; // 字典项编码
}
// 获取子字典/常量列表 flag: 1. 字典项   2. 常量
export default function (pCode: string, flag: string) {
  return request<ResData<DictData[]>>({
    url: `/manage/dict/dictList`,
    method: 'get',
    params: {
      pCode,
      flag
    }
  });
}
