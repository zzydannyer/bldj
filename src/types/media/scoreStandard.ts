import { BaseEntity } from '@/types'

export class ScoreStandard extends BaseEntity {
  // * 1：有效 0：删除
  isActive?: string
  // *
  orgCode?: string
  // * 1：集团 2：子分公司
  scoreType?: string
  // * 主键id
  id?: number
  constructor() {
    super()
    //  * 根据自身业务需要的初始化值修改
  }
}

export class IOptionForm {
  mediaLevelId?: string
  mediaLevelText?: string
  mediaName1Id?: string
  mediaName1Text?: string
  mediaName2Id?: string
  mediaName2Text?: string
  scoreStandId?: string
  scoreStandText?: string
  scoreStandValue?: number
  otherScore1Id?: string
  otherScore1Text?: string
  otherScore1Value?: number
  otherScore2Id?: string
  otherScore2Text?: string
  otherScore2Value?: number
  otherScore3Id?: string
  otherScore3Text?: string
  otherScore3Value?: number
}

// 保存时映射对象
export class ScoreStandardMainBo extends BaseEntity {
  // 主表id
  mainId: string
  parentScore: Array<any>
  otherScore: Array<any>

  constructor(mainId: string, parentScore: any[], otherScore: any[]) {
    super()
    this.mainId = mainId
    this.parentScore = parentScore
    this.otherScore = otherScore
  }
}

export class ScoreStandardQuery {
  // *
  orgCode?: string
  // * 1：集团 2：子分公司
  scoreType?: string
}

export class ScoreStandardDetail extends BaseEntity {
  // * 1：有效 0：删除
  isActive?: string
  // * 主记录id
  scoreMainId?: number
  // * 父节点id，1层的为空
  parentId?: number
  // * 评分项顺序号
  optionOrder?: number
  // * 名称描述
  optionName?: string
  // * 1：父节点 2：打分项
  optionType?: string
  // * 1：打分项 2：加分项 3：第二加分项
  optionStandard?: string
  // * 该项分值
  optionScore?: number
  // 该项开关 0关1开
  optionSwitch?: number
  constructor() {
    super()
    //  * 根据自身业务需要的初始化值修改
  }
}

export class ScoreStandardDetailQuery {
  // * 主记录id
  scoreMainId?: number
  // * 父节点id，1层的为空
  parentId?: number
  // * 评分项顺序号
  optionOrder?: number
  // * 名称描述
  optionName?: string
  // * 1：父节点 2：打分项
  optionType?: string
  // * 1：打分项 2：加分项 3：第二加分项
  optionStandard?: string
  // * 该项分值
  optionScore?: number
}
