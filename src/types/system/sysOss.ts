import { BaseEntity } from '@/types'

export class SysOss extends BaseEntity {
  // * 主键
  id?: string

  // * 文件名
  fileName?: string

  // * 原名
  originalName?: string

  // * 文件后缀名
  fileSuffix?: string

  // * URL地址
  url?: string

  // * service服务商
  service?: string
}

export class SysOssQuery {
  // 文件名
  fileName?: string

  // 原名
  originalName?: string

  // 文件后缀
  fileSuffix?: string

  // 服务商
  service?: string

  // * 时间范围
  dateRange?: any

  // * 额外参数
  get params(): any {
    return this.dateRange
      ? {
          beginTime: this.dateRange[0],
          endTime: this.dateRange[1],
        }
      : undefined
  }
}

export class FileUploadResult {
  // * URL地址
  url?: string

  // * 文件路径 oss中的key
  name?: string

  // * 原名
  originalName?: string

  // * oss id
  ossId?: string

  // * 文件大小
  fileSize?: number

  // * md5
  md5?: string
}
