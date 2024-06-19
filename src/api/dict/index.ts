import { SysDictData } from '@/types/_system/sysDictData';
import request from '@/utils/request';

// 查询字典数据列表
export function listData(params: any): Promise<Resp<SysDictData[]>> {
  return request('get', '/system/dict/data/list', { params });
}

// 查询字典数据详细
export function getData(dictCode: number): Promise<Resp<SysDictData>> {
  return request('get', '/system/dict/data/' + dictCode);
}

// 根据字典类型查询字典数据信息
export function getDicts(dictType: string): Promise<Resp<SysDictData[]>> {
  return request('get', '/system/dict/data/type/' + dictType);
}

// 新增字典数据
export function addData(data: SysDictData): Promise<Resp<void>> {
  return request('post', '/system/dict/data', { data });
}

// 修改字典数据
export function updateData(data: SysDictData): Promise<Resp<void>> {
  return request('put', '/system/dict/data', { data });
}

// 删除字典数据
export function delData(dictCode: number | number[]): Promise<Resp<void>> {
  return request('delete', '/system/dict/data/' + dictCode);
}
