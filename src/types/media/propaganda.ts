import { BaseEntity } from '@/types'
import { PropagandaFile } from '@/types/media/propagandaFile'

export class PropagandaMain extends BaseEntity {
  self?: string
  // * 主键id
  id?: Numeric
  // * 1：有效 0：删除
  isActive?: string
  // * 项目id
  projectId?: string
  // * 项目名称
  projectName?: string
  // * 报道标题
  reportTitle?: string
  // * 报道时间
  reportTime?: string
  // * 报道摘要
  reportBrief?: string
  // * 外部链接
  outLink?: string
  // * 赋分依据主表id
  scoreMainId?: string
  // * 赋分依据明细表id
  scoreDetailId?: any
  // 额外赋分1
  otherScore1Id?: string
  //额外赋分2
  otherScore2Id?: string
  // * 公司分值
  score?: number
  // * 打分项的数量
  scoreCount = 1
  // * 集团-赋分依据主表id
  groupScoreMainId?: number
  // * 集团-赋分依据明细表id
  groupScoreDetailId?: any
  // * 集团分值
  groupScore?: number
  // * 集团打分项的数量
  groupScoreCount?: number
  // * 集团认定归类 1：工程类 2：企业类 3：人物类 4：新媒体
  groupConfirmKind?: string
  // * 集团认定归类的算分系数
  groupRatio?: number
  // * 集团认定归类后系数的最终分
  groupConfirmScore?: number
  // * 0:编辑 1：提交 2：基层审核通过 3：基层审核退回  5：提交集团待审 6：集团审核通过 7：集团审核退回
  reportStatus?: string
  // 多选个数 0单个 1多个
  optionMultiFlag?: string
  // 分数
  scoreExtra2Count?: number
  // 资源类型名称
  fileTypename?: string
  // 资源类型
  fileType?: string
  // 该条记录最后一个经办人
  lastAuditorId?: string
  // 图片附件
  imageList?: Array<PropagandaFile>
  // 视频附件
  videoList?: Array<PropagandaFile>
  // 普通附件
  commonList?: Array<PropagandaFile>
  // 公司id
  orgCode?: string
  // 公司名称
  orgName?: string
  // 媒体级别
  mediaLevelName?: string
  // 媒体名称
  mediaName?: string
  // 赋分依据
  scoreDesc?: string
  // 集团赋分依据
  groupScoreDesc?: string
  // 公司赋分公式
  companyFormula?: string
  // 集团赋分公式
  groupFormula?: string
  // 申诉内容
  appealBrief?: string
  // 集团赋分1
  groupScoreOther1?: string
  // 集团赋分2
  groupScoreOther2?: string
  constructor() {
    super()
  }
}

type QueryParams = {
  auditStatus?: 'auditing' | 'audited'
}
// 公司在提交时要选择集团的赋分依据
export class PropagandaSubmitToGroupVo {
  // 主键
  id?: string
  // 集团评分标准主表id
  groupScoreMainId?: string
  // 集团评分标准子表id串
  groupScoreDetailId?: string
  groupScoreOther1?: string
  groupScoreOther2?: string
  // 选择的集团赋分依据是否为每条、每幅
  optionMultiFlag?: string
  // 集团评分标准数量
  groupScoreCount?: string
}
export class PropagandaMainQuery {
  // * 项目名称
  projectName = ''
  // * 报道标题
  reportTitle?: string
  // * 报道时间
  reportTime?: string
  // * 报道摘要
  reportBrief?: string
  // * 集团认定归类 1：工程类 2：企业类 3：人物类 4：新媒体
  groupConfirmKind?: string

  // * 0:编辑 1：提交 2：基层审核通过 3：基层审核退回  5：提交集团待审 6：集团审核通过 7：集团审核退回
  reportStatus?: string
  params: QueryParams = { auditStatus: 'auditing' }
}

// 新增审核对象
export class PropagandaAuditBo extends BaseEntity {
  id?: string
  /**
   * 主表id - 审核的对象id
   */
  mainId?: string

  /**
   * 1:公司层级 2：集团层级
   */
  auditLevel?: string

  /**
   * 1:通过 2：退回
   */
  auditResult?: string

  /**
   * 审核意见
   */
  auditDesc?: string

  /**
   * 赋分依据主表id
   */
  auditMainId?: string

  /**
   * 赋分依据明细id
   */
  auditDetailId?: string

  // 额外赋分1
  otherScore1Id?: string
  //额外赋分2
  otherScore2Id?: string
  // 认定附加分2的数量
  scoreExtra2Count?: number
  // 选择的所有id
  scoreDetailId?: string
  // 资源类型
  fileTypename?: string
  // 赋分依据确定id
  groupConfirmKind?: string
  //赋分依据状态
  optionMultiFlag?: string
  /**
   * 认定附加分2的数量
   */
  scoreMainId?: string | number
  otherScoreNum?: number

  /**
   * 集团认定归类 1：工程类 2：企业类 3：人物类 4：新媒体
   */
  groupKind?: number|string

  /**
   * 集团认定算分系数
   */
  groupRatio?: number
  /* 
   报道标题
  */
  reportTitle?:string
}

export class PropagandaAuditAlertVo {
  // 新媒体数量
  media?: number
  // 非新媒体
  other?: number
}

// 审核记录对象
export class PropagandaAuditVo {
  // 1:通过 2：退回
  auditResult?: string;
  // 审核意见
  auditDesc?: string;
  auditRoleName?: string;
  // 审核人/提交人姓名
  auditName?: string;
  // 创建时间
  createTime?: string;
}

