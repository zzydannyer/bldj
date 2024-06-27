import { defineStore } from 'pinia';
import { type DictData, type Dict } from '@/api/dict';
import { stringify, parse } from 'qs';

export default defineStore('dict', {
  persist: {
    key: 'dictData',
    storage: sessionStorage,
    paths: ['dictMap'],
    serializer: {
      deserialize: parse,
      serialize: stringify
    },
    debug: true
  },
  state: () => ({
    dictMap: new Map<string, Dict[]>()
  }),
  actions: {
    HAS(mapKey: string) {
      return this.dictMap.has(mapKey);
    },
    GET(mapKey: string) {
      return this.dictMap.get(mapKey);
    },
    SET(mapKey: string, data: Dict[]) {
      this.dictMap.set(mapKey, data);
    }
  }
});
