import { BaseEntity } from '@/types'
import { SysOrg } from './sysOrg'

export class SysUser extends BaseEntity {
  // * 用户ID
  userId?: number

  // * 机构ID
  orgId?: number

  // * 公司code
  orgCode?: string

  // * 用户账号
  userName?: string

  // * 用户昵称
  nickName?: string

  // * 用户类型（sys_user系统用户）
  userType?: string

  // * 用户邮箱
  email?: string

  // * 手机号码
  mobile?: string

  // * 用户性别
  sex?: string

  // * 用户头像
  avatar?: string

  // * 用户密码
  password?: string

  // 盐加密
  salt?: string

  // * 帐号状态（0正常 1停用）
  status: string

  // * 删除标志（1代表存在 0代表删除）
  isActive?: string

  // * 最后登录IP
  loginIp?: string

  // * 最后登录时间
  loginDate?: string

  // * 备注
  remark?: string

  // * 机构对象
  org?: SysOrg

  // * 角色组
  roleIds: number[]

  // * 数据权限 当前角色ID
  roleId?: number[]

  constructor() {
    super()
    this.status = '0'
    this.roleIds = []
  }
}

export class SysUserQuery {
  // * 用户名称
  userName?: string

  // * 电话
  mobile?: string

  // * 状态
  status?: string

  // * 机构编号
  orgId?: string

  dateRange?: any

  // * 组织机构代码
  orgCode?: string

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

// * 用户导入
export class CrccUserImport {
  // * 机构编号
  targetOrgId?: string

  roleIds?: number[]

  selectIds?: number[]

  remark?: string

  importOrg?: boolean

  get importType(): 'org' | 'user' {
    return this.importOrg ? 'org' : 'user'
  }
}
