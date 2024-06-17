import { BaseEntity } from '@/types'

export class Project extends BaseEntity {
  // *
  id?: number
  // * 项目名称全称
  projectFullName?: string
  // * 项目简称
  projectSubName?: string
  // * 项目编号
  projectCode?: string
  // * 合同金额（万元）
  contractAmount?: number
  // * 工程类别（字典项）
  projectCategory?: string
  // * 工程类别（字典项NAME）
  projectCategoryName?: string
  // * 工程所在地（省市）
  projectLocation?: string
  // * 项目状态1：已中标 2：已开工 3：已停工
  projectStatus?: string
  projectStatusName?: string
  // * 开工时间
  startDate?: string
  // * 计划完工时间
  planFinishDate?: string
  // * 是否有效 1：有效 0：删除
  isActive?: string
  // * 1:新增 2：项目部导入 3：工程部导入
  addType?: string
  // * 是否重点项目 1：重点 0：非重点
  isKey?: string
  projectLinkOrgName?: string
  // 素材介绍
  companyList: any
  constructor() {
    super()
    //  * 根据自身业务需要的初始化值修改
  }
}

export class ProjectQuery {
  // * 项目名称全称
  projectFullName?: string
  // * 项目简称
  projectSubName?: string
  // * 项目编号
  projectCode?: string
  // * 合同金额（万元）
  contractAmount?: number
  // * 工程类别（字典项）
  projectCategory?: string
  // * 工程类别（字典项NAME）
  projectCategoryName?: string
  projectLinkOrgName?: string
  // * 工程所在地（省市）
  projectLocation?: string
  // * 项目状态1：已中标 2：已开工 3：已停工
  projectStatus?: string
  projectStatusName?: string
  // * 开工时间
  startDate?: string
  // * 计划完工时间
  planFinishDate?: string
  // * 1:新增 2：项目部导入 3：工程部导入
  addType?: string
  // * 是否重点项目 1：重点 0：非重点
  isKey?: string
}
