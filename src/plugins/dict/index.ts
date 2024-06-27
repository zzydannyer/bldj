import listDict, { type DictData, type Dict } from '@/api/dict';
import { useStore } from '@/store';
import { isEmpty } from '@/utils';

function loadDict(pCode: string, flag = '1') {
  const store = useStore();

  return new Promise(async (resolve, reject) => {
    const mapKey = pCode + flag;
    if (store.dict.HAS(mapKey)) {
      resolve(store.dict.GET(mapKey));
    } else {
      const { data } = await listDict(pCode, flag);
      const res = data.map((dict: DictData) => ({
        text: dict.name,
        value: dict.code
      }));

      if (!isEmpty(res)) {
        store.dict.SET(mapKey, res);
      }
      resolve(res);
    }
  });
}

export default async function ([...dictNames]: string[]) {
  try {
    const promised = [];
    for (const dictName of dictNames) {
      promised.push(loadDict(dictName));
    }
    return Promise.all(promised);
  } catch (e) {
    console.error(e);
  }
}
