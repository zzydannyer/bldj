import { BaseEntity } from '@/types'
import { Numeric } from 'vant/lib/utils'

export class WorkFeedback extends BaseEntity {
  // * 主键
  id?: any
  // * 任务id
  workId?: Numeric
  // * 任务名称
  workName?: string
  // * 任务状态(0编辑  20下达 21反馈 22督查 23办结 -1撤回)
  workStatus?: string
  // * 类型( 字典表work_supervise_type);文件通知/一般工作/重点工作
  typeCode?: string
  // * 任务类型(1:一般任务、2:回填任务、3:重点)
  workType?: string
  // * 具体资源id;重点工作时关联上传资源id
  mediaDetailId?: number
  // * 反馈内容
  feedbackDesc?: string
  // 反馈组件
  feedbackFile?: any
  // * 任务回馈所属org_code
  orgCode?: string
  // * 回馈组织名
  orgName?: string
  // * 0-（初始）未查看，1-查看未办 ，2-（保存）已办，3-（提交）已报，-1-退回待办
  submitStatus?: string
  // * 是否完成 0：未完成 1：完成
  isDone?: string
  // * 角色id
  roleId?: number
  // * 1：有效 0：删除
  isActive?: string
  // * 附件
  workFiles?: WorkFile[]
  // * 问题(只在任务类型为回填时有)
  questions?: WorkMust[]
  roleName?: string
  belongToName?: string
  // * 退回信息
  workAuditDesc?: string
  constructor() {
    super()
    //  * 根据自身业务需要的初始化值修改
  }
}
export class Work extends BaseEntity {
  // * 主键
  id?: Numeric
  // * 任务名
  workTitle?: string
  // * 任务内容
  workDesc?: string
  // * 类型(字典表work_type_code);文件通知/一般工作/重点工作
  typeCode?: string
  // * 任务类型(1:通知、2:调查 、3:报送)
  workType?: string
  // * 文章所属org_code
  orgCode?: string
  // * 组织名称
  orgName?: string
  /**
   * 接收单位类型( 1:全部;2：分组;3：指定用户)
   */
  receiveType?: string
  // * 分组id
  recPackageId?: number
  // * 指定用户
  recUserIds?: number[]
  // * 指定用户名
  recUserNames?: string[]
  // * 任务状态(0编辑  20下达 21反馈 22督查 23办结 -1撤回)
  status?: string
  // * 发布日期
  publishDate?: string
  // * 截止时间
  deadline?: any
  // * 完成数量
  finishNum?: number
  // * 下达数量
  publishNum?: number
  // * 提交数量
  submitNum?: number
  // * 未完成数量
  unfinishNum?: number
  // * 1：有效 0：删除
  isActive?: string
  // * 附件
  workFiles?: WorkFile[]
  // 日期
  reportTime?: string
  // * 问题(只在任务类型为回填时有)
  questions?: WorkMust[]
  // 接收群组
  receivePackage?: PackageMain
  constructor() {
    super()
    this.questions = []
    //  * 根据自身业务需要的初始化值修改
  }
}
export class WorkFeedbackQuery {
  // * 类型( 字典表work_supervise_type);文件通知/一般工作/重点工作
  typeCode?: string
  // * 任务id
  workId?: Numeric
  // * 任务类型(1:一般任务、2:回填任务、3:重点)
  workType?: string
  // * 具体资源id;重点工作时关联上传资源id
  mediaDetailId?: number
  // * 反馈内容
  feedbackDesc?: string
  // * 任务回馈所属org_code
  orgCode?: string
  // * 回馈组织名
  orgName?: string
  // * 0-（初始）未查看，1-查看未办 ，2-（保存）已办，3-（提交）已报，-1-退回待办
  submitStatus?: string
  // * 是否完成 0：未完成 1：完成
  isDone?: string
}

export class WorkFeedbackAudit extends BaseEntity {
  // * 主键
  id?: number
  // * 1：有效 0：删除
  isActive?: string
  // * 反馈id
  feedbackId?: number
  // * 1:通过 2：退回
  auditResult?: string
  // * 审核意见
  auditDesc?: string
  constructor() {
    super()
    //  * 根据自身业务需要的初始化值修改
  }
}

export class WorkFeedbackAuditQuery {
  // * 反馈id
  feedbackId?: number
  // * 1:通过 2：退回
  auditResult?: string
  // * 审核意见
  auditDesc?: string
}

export class WorkFile extends BaseEntity {
  // * 主键
  id?: number
  // * 文件名称
  name?: string
  // * 附件oss_id
  ossId?: string
  // * 1: 任务附件 2：反馈任务附件
  fileType?: string
  // * 关联id(任务id或回馈feedbackId)
  linkId?: number
  // * 1：有效 0：删除
  isActive?: string
  constructor() {
    super()
    //  * 根据自身业务需要的初始化值修改
  }
}

export class WorkFileQuery {
  // * 文件名称
  name?: string
  // * 附件oss_id
  ossId?: string
  // * 1: 任务附件 2：反馈任务附件
  fileType?: number
  // * 关联id(任务id或回馈feedbackId)
  linkId?: number
}
export class WorkFeedbackList {
  // 任务类型
  workType?: string
  // 任务问题
  questions?: any
  // 反馈内容
  feedbackDesc?:string
}
export class PackageMain extends BaseEntity {
  // * 主键
  id?: number
  // * 1：有效 0：删除
  isActive?: string
  // * 群组名称
  packageName?: string

  // 机构名称
  orgNames?: string[]

  // 角色名称
  roleNames?: string[]
  constructor() {
    super()
    //  * 根据自身业务需要的初始化值修改
    this.isActive = '1'
  }
}

export class PackageMainQuery {
  // * 群组名称
  packageName?: string
}

export class WorkQuery {
  // * 任务名
  workTitle = ''
  // * 类型(字典表work_type_code);文件通知/一般工作/重点工作
  typeCode? = ''
  // * 任务类型(1:一般任务、2:回填任务 、3:重点)
  workType? = ''
  // * 文章所属org_code
  orgCode?: string
  // * 任务状态(0编辑  20下达 21反馈 22督查 23办结 -1撤回)
  status? = ''
  // * 发布日期
  publishDate?: string
  // * 截止时间
  deadline?: string
}

export class WorkMust extends BaseEntity {
  // * 主键
  id?: number
  // * 1：有效 0：删除
  isActive?: string
  // * 回填组织编号
  orgCode?: string
  // * 回填组织名称
  orgName?: string
  // * 任务id
  workId?: number
  // * 1:集团发布 2：基层反馈
  roleType?: string
  // * 集团发布问题；基层回答1对1
  mustDesc?: string
  // * 问题内容(用于回答时展示)
  question?: string
  // * 问题序号
  sort?: number
  // * 反馈id
  feedbackId?: number
  constructor() {
    super()
    //  * 根据自身业务需要的初始化值修改
  }
}

export class WorkMustQuery {
  // * 回填组织编号
  orgCode?: string
  // * 回填组织名称
  orgName?: string
  // * 任务id
  workId?: number
  // * 1:集团发布 2：基层反馈
  roleType?: string
  // * 集团发布问题；基层回答1对1
  mustDesc?: string
  // * 问题序号
  sort?: number
  // * 反馈id
  feedbackId?: number
}
export class WorkOrg extends BaseEntity {
  // * 主键
  id?: number
  // * 任务ID
  workId?: number
  // * 分组id
  packageId?: number
  // *
  orgCode?: string
  // *
  orgName?: string
  // * 1：有效 0：删除
  isActive?: string
  constructor() {
    super()
    //  * 根据自身业务需要的初始化值修改
  }
}

export class WorkOrgQuery {
  // * 任务ID
  workId?: number
  // * 分组id
  packageId?: number
  // *
  orgCode?: string
  // *
  orgName?: string
}
export class WorkRole extends BaseEntity {
  // * 主键
  id?: number
  // * 任务ID
  workId?: number
  // * 分组id
  packageId?: number
  // * 角色编号
  roleId?: number
  // * 1：有效 0：删除
  isActive?: string
  constructor() {
    super()
    //  * 根据自身业务需要的初始化值修改
  }
}

export class WorkRoleQuery {
  // * 任务ID
  workId?: number
  // * 分组id
  packageId?: number
  // * 角色编号
  roleId?: number
}
