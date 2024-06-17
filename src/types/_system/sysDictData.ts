import { BaseEntity } from '@/types'

export class SysDictData extends BaseEntity {
  // * 字典编码
  dictCode?: number

  // * 字典排序
  dictSort?: number

  // * 字典标签
  dictLabel: string

  // * 字典键值
  dictValue: string

  // * 字典类型
  dictType: string

  // * 样式属性（其他样式扩展）
  cssClass: string

  // * 表格字典样式
  listClass: string

  // * 是否默认（Y是 N否）
  isDefault: string

  // * 状态（0正常 1停用）
  status: string

  // * 备注
  remark: string

  constructor() {
    super()
    this.dictLabel = ''
    this.dictValue = ''
    this.dictType = ''
    this.cssClass = ''
    this.listClass = ''
    this.isDefault = 'N'
    this.status = '0'
    this.remark = ''
  }
}

export class SysDictDataQuery {
  // * 字典类型
  dictType?: string

  // * 字典标签
  dictLabel?: string

  // * 字典键值
  dictValue?: string

  // * 状态（0正常 1停用）
  status?: string
}
