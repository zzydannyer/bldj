import { BaseEntity } from '@/types';

// 角色信息
export class SysRole extends BaseEntity {
  // * 角色ID
  roleId = 0;

  // * 角色名称
  roleName?: string;

  // * 角色权限
  roleKey?: string;

  // * 角色排序
  roleSort?: number;

  // * 数据范围（1：所有数据权限；2：自定义数据权限；3：本机构数据权限；4：本机构及以下数据权限；5：仅本人数据权限）
  dataScope?: number;

  // * 菜单树选择项是否关联显示（ 0：父子不互相关联显示 1：父子互相关联显示）
  menuCheckStrictly?: boolean;

  // * 机构树选择项是否关联显示（0：父子不互相关联显示 1：父子互相关联显示 ）
  orgCheckStrictly?: boolean;

  // * 角色状态（0正常 1停用）
  status?: string;

  // * 删除标志（1代表存在 0代表删除）
  isActive?: string;

  // * 备注
  remark?: string;

  // * 用户是否存在此角色标识 默认不存在
  flag?: boolean;

  //** 菜单组
  menuIds: string[] = [];

  // * 机构组（数据权限）
  orgIds: string[] = [];

  constructor() {
    super();
  }
}

export class SysRoleQuery {
  // * 角色名称
  roleName?: string;

  // * 角色描述
  roleDesc?: string;

  // * 角色权限
  roleKey?: string;

  // * 角色状态（0正常
  status?: string;

  // * 时间范围
  dateRange?: any;

  // * 额外参数
  get params(): any {
    return this.dateRange
      ? {
          beginTime: this.dateRange[0],
          endTime: this.dateRange[1]
        }
      : undefined;
  }
}

export class SysRoleUserQuery {
  roleId?: number;

  userName?: string;

  mobile?: string;
}
