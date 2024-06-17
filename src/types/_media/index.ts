import { BaseQuery,BaseEntity } from '@/types'

/**
 * @id 主键id
 * @projectId 项目id
 * @projectName 项目名称
 */
export class MediaMain extends BaseEntity {
  /**
   * 主键id
   */
  id?: Numeric
  // * 项目id
  projectId?: string
  // * 项目名称
  projectName?: string
  /**
   * @description 批次类型
   * @enum 1:图片 2：视频
   */
  mediaType?: '1' | '2'
  // * 作者
  author?: string
  /**
   * 资源类别
   */
  resourceType?: number
  /**
   * 拍摄时间
   */
  shootingTime: any
  /**
   * 拍摄地点
   */
  shootingArea?: string
  // * 素材简介
  materialBrief?: string
  // * 0:编辑 1：提交 2：基层审核通过 3：基层审核退回 6：集团审核通过 7：集团审核退回
  mediaStatus?: string
  // * 1：有效 0：删除
  isActive?: string
  // * 提交时间
  submitTime?: string

  mediaList?: any[]
  scoreDetailId?: string
  /**
   * 资源类别名称
   */
  resourceTypeName?: string

  // * 重点待办任务id
  workFeedbackId?: Numeric
  // 是否关联项目
  project?: boolean
  // 媒体类型
  mediaTitle?:string
  orgName?: string
  // 征集活动
  activitiesIdList?: any[]
  // 征集活动id
  activitiesId?:Numeric
  // 评分依据
  score?:number
  constructor() {
    super()
    //  * 根据自身业务需要的初始化值修改
  }
}
export class MediaActivitiesQuery extends BaseQuery {
  // * 活动名称
  activitiesName?: string;
  // * 活动开始时间
  startTime?: string;
  // * 活动结束时间
  endTime?: string;

  // * 阶段
  stage?: string;

  // 额外参数
  params?: { [key: string]: any } = {};
}
export class MediaActivities extends BaseEntity {
  // * 主键
  id?: number;
  // * 活动名称
  activitiesName: string;
  // * 活动开始时间
  startTime: string;
  // * 活动结束时间
  endTime: string;

  // * 活动状态
  status: "0" | "1";
  // * 阶段
  stage: string;
  constructor() {
    super();
    //  * 根据自身业务需要的初始化值修改
    this.status = "0";
    this.activitiesName = "";
    this.startTime = "";
    this.endTime = "";
    this.stage = "0";
  }
}

export class MediaMainQuery {
  // * 项目名称
  projectName?: string
  // * 资源类别
  resourceType?: number
  // * 拍摄时间
  shootingTime?: any
  // * 0:编辑 1：提交 2：基层审核通过 3：基层审核退回 6：集团审核通过 7：集团审核退回
  mediaStatus?: string
  // 媒体类型
  mediaType?: string
  // 活动资源
  activitiesName?:string
  // 资源名称
  resourceName?: string
}

export interface File {
  id: number
  name: string
  originalName: string
  ossId: string
  thumbnail?: string
  url: string
  fileSize: string
  shootingTime?: any
  feature?: string
  md5?: string
}

export class MediaPublic {
  id?: Numeric
  // * 项目名称
  projectName?: string

  // * 资源类型
  resourceType?: number
  resourceTypeName?: string

  //  * 拍摄时间
  shootingTime?: string
  resourceName?:string
  // * 媒体地点
  shootingArea?: string

  //  * 媒体类型
  mediaType?: string

  // * 公司名称
  orgName?: string

  // * 缩略图
  thumbnailUrl?: string

  // * 路径
  url?: string

  materialBrief?: string

  // * 作者
  author?: string

  // * 是否收藏
  collect?: boolean
  //分数
  score?:string
}
export class MediaList {
  workTitle?: string
  // 任务类型
  workType?: string
  // 截止时间
  publishDate?: number | any
  // 任务内容
  workDesc?: string
  // 任务附件
  workFiles?: string | any
  // 接收类型
  receiveType?: string
  // 接收群组
  receivePackage?: any
}
export class MediaAudit {
  /**
   * 主键
   */
  id?: number

  /**
   * 主表id
   */
  mainId?: number

  /**
   * 1:公司层级 2：集团层级
   */
  auditLevel?: string

  /**
   * 0:创建 1：完成
   */
  auditStatus?: string

  /**
   * 1:通过 2：退回
   */
  auditResult?: string

  /**
   * 审核意见
   */
  auditDesc?: string

  /**
   * 审核时间
   */
  auditTime?: string

  /**
   *
   * 审核人
   */
  auditUser?: string
}

/**
 * @description 角色权限
 * @params roleId 角色ID
 */
export class SysRole {
  /**
   * @description 角色ID
   */
  roleId?: number

  // * 角色名称
  roleName?: string

  // * 角色权限
  roleKey?: string

  // * 角色排序
  roleSort?: number

  // * 数据范围（1：所有数据权限；2：自定义数据权限；3：本机构数据权限；4：本机构及以下数据权限；5：仅本人数据权限）
  dataScope?: number

  // * 菜单树选择项是否关联显示（ 0：父子不互相关联显示 1：父子互相关联显示）
  menuCheckStrictly?: boolean

  // * 机构树选择项是否关联显示（0：父子不互相关联显示 1：父子互相关联显示 ）
  orgCheckStrictly?: boolean

  // * 角色状态（0正常 1停用）
  status?: string

  // * 删除标志（1代表存在 0代表删除）
  isActive?: string

  // * 备注
  remark?: string

  // * 用户是否存在此角色标识 默认不存在
  flag?: boolean

  //** 菜单组
  menuIds?: string[]

  // * 机构组（数据权限）
  orgIds?: string[]
  // 组织名字
  orgName?: string
  /**
   * @description 提交状态
   * @enum 3.已提交
   * @enum -1.未提交
   */
  submitStatus?: string
  // 提交人
  belongToName?: string
  // 提交时间
  updateTime?: any
  // 反馈内容
  feedbackDesc?: string
  /**
   * 完成状态
   * 1.已完成
   * 2.未完成
   */
  isDone?: string
  // 更新时间
  receivePackage?: any
  // 接收类型
  receiveType?: string
}
export class DetailList {
  // 任务名称
  workTitle?: string
  // 截止时间
  publishDate?: any
  // 工作类型
  workType?: any
  // 任务内容
  workDesc?: string
  // 任务附件
  workFiles?: any
  // 接收类型
  receiveType?: string
  // 接收群组
  receivePackage?: any
}

export type CropVideoParams = {
  /**
   * 视频裁剪开始时间
   * 00:02:30
   */
  startTime: string

  /**
   * 视频裁剪结束时间
   * 00:05:00
   */
  endTime: string

  /**
   * 视频裁剪时长
   * 00:02:30
   */

  duration: string
}
export class MediaActivitiesScoreQuery {
  resourceName?: string;

  activitiesName?: string;

  // * 分数
  score?: number;
  // * 活动编号
  activitiesId?: number;

  orderByColumn?: string;

  isAsc?: string;
}
export class MediaActivitiesScore extends BaseEntity {
  // * 主键
  id?: number;
  // * 媒体详细编号
  mediaDetailId?: string;
  // * 被审人机构代码
  targetOrgCode?: string;
  // * 审核人编号
  reviewerUserId?: number;
  // * 被审人目标用户编号
  targetUserId?: number;
  // * 分数
  score?: number;
  // * 活动编号
  activitiesId?: string;

  // 媒体主要id
  mediaMainId?: string;

  // 目标用户名
  targetUserName?: string;

  // 活动id
  activitiesName?: string;
  
  // 资源名称
  mediaType?: string;

  // 项目名称
  shootingTime?: string;

  constructor() {
    super();
    //  * 根据自身业务需要的初始化值修改
  }
}
export class MediaActivitiesScoreDetail extends MediaPublic {
  scoreList?: MediaActivitiesScore[];
}
export class Activitiesscore{
  // 媒体id
  id?:string
  // 媒体类型
  mediaType?:string
  // 地址
  url?:string
  // 项目名称
  projectName?:string
  // 时间
  shootingTime?:string
  // 资源类型
  resourceTypeName?:string
  // 媒体标题
  resTitle?:string
  // 评分
  score?:string
}
export class MediaActivitiesRankings {
  // 活动编号
  activitiesId?: number;

  // 活动名称
  activitiesName?: string;

  scoreList?: any[];
}
// 活动排名
export class activitiesLists {
  // 活动名称
  activitiesName?:string
}