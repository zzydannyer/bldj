import { defineStore } from 'pinia'
import { DictData } from '@/plugins/dict'

const useDictStore = defineStore({
  id: 'dict',
  state: () => ({
    dict: [] as any,
  }),
  actions: {
    // 获取字典
    get_dict(key: string) {
      if (!key) return null

      for (const dict of this.dict) {
        if (dict.key === key) {
          return dict.value
        }
      }

      return null
    },
    // 设置字典
    set_dict(key: string, value: DictData[]) {
      if (!key) return
      this.dict.push({ key, value })
    },
    // 删除字典
    rm_dict(key: string) {
      for (const index in this.dict) {
        if (this.dict[index].key === key) {
          this.dict.splice(index as unknown as number, 1)
          return true
        }
      }
      return false
    },
    // 清空字典
    clear_dict() {
      this.dict = []
    },
  },
})

export default useDictStore
