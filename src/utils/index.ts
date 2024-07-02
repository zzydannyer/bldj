import { Dict, DictData } from '@/api/dict';
import { isArray, isObject, isNull, isUndefined, isString } from 'lodash';
import { stringify } from 'qs';
import Constants, { ResCode } from '@/constants';
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
export function parseDict(
  dicts: any[],
  dictValue?: Numeric,
  columnsFieldNames = {
    value: 'value',
    text: 'text'
  }
) {
  if (!dicts || !dicts.length || !dictValue) return dictValue;
  const text = columnsFieldNames?.text ?? 'text';
  const value = columnsFieldNames?.value ?? 'value';
  for (const dict of dicts) {
    if (dict[value] == dictValue) {
      return dict[text];
    }
  }
  return dictValue;
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

function isLink(str: string) {
  const linkRegex =
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;
  return linkRegex.test(str);
}

function isPrivateUrl(src: string) {
  return isLink(src) && src.includes(Constants.PrivateUrlPrefix);
}

export default {
  isLink,
  isPrivateUrl
};
