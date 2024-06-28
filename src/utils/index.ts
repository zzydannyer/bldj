import { Dict } from '@/api/dict';
import { isArray, isObject, isNull, isUndefined, isString } from 'lodash';
import { stringify } from 'qs';

/**
 * @description 检测是否为 undefined null [] {} ''
 * @param value
 */
export const isEmpty = (value: any) => {
  // 判断 null 或 undefined
  if (isNull(value) === null || isUndefined(value)) return true;

  // 判断空数组
  if (isArray(value) && value.length === 0) return true;

  // 判断空对象
  if (isObject(value) && Object.keys(value).length === 0) return true;

  // 判断空字符串
  if (isString(value) && value.trim() === '') return true;

  return false;
};

export const isNotEmpty = (value: any) => !isEmpty(value);

/**
 * @description 参数处理
 * @param {*} params  参数
 */
export const transParams = (params: any) => stringify(params, { encode: true });

// 回显数据字典
export function parseDict(dicts: Dict[], value?: Numeric) {
  console.log('🚀 ~ parseDict ~ dicts: Dict[], value?: Numeric:', dicts, value);
  return dicts.find((dict) => dict.value === value)?.text;
}

// 获取实例中全局property
export function useGlobal<T>() {
  const {
    appContext: {
      config: { globalProperties }
    }
  } = getCurrentInstance()!;
  return globalProperties as T;
}
