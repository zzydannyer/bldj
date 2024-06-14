export class SysNotice {
  // * 公告ID
  noticeId?: number

  // * 公告标题
  noticeTitle?: string

  // * 公告类型（1通知 2公告）
  noticeType?: '1' | '2'

  // * 公告内容
  noticeContent?: string

  // * 公告状态（0正常 1关闭）
  status?: string

  createTime?: string

  // * 备注
  remark?: string
}

export class SysNoticeQuery {
  // * 公告标题
  noticeTitle?: string

  // * 公告类型（1通知 2公告）
  noticeType?: '1' | '2'

  // * 公告状态（0正常 1关闭）
  status?: string
}
