import useDictStore from '@/store/modules/dict';
import { getDicts } from '@/api/dict';

/**
 * 获取字典数据
 */
export function useDict(...args: DictType[]): any {
  const dictStore = useDictStore();
  const dictMap = reactive<DictMapper>({});

  args.forEach(async (dictType: string) => {
    dictMap[dictType] = [];
    const dicts = dictStore.get_dict(dictType);
    if (dicts) {
      dictMap[dictType] = dicts as DictData[];
    } else {
      const { data } = await getDicts(dictType);
      dictMap[dictType] = data!.map((p: any) => ({
        label: p.dictLabel,
        value: p.dictValue,
        elTagType: p.listClass,
        elTagClass: p.cssClass
      }));
      dictStore.set_dict(dictType, dictMap[dictType]);
    }
  });
  return toRefs(dictMap);
}

export type DictData = {
  label: string;
  value: string;
  elTagType?: any;
  elTagClass?: string;
};

type DictMapper = DictType extends never
  ? { [x: string]: DictData[] }
  : { [key in DictType]: DictData[] };

type DictType =
  | 'sys_user_sex'
  | 'sys_show_hide'
  | 'sys_normal_disable'
  | 'sys_yes_no'
  | 'sys_notice_type'
  | 'sys_notice_status'
  | 'sys_oper_type'
  | 'sys_common_status'
  | 'media_resource_type'
  | 'work_type_code'
  | 'work_release_type'
  | 'work_status'
  | 'feedback_status'
  | string;
