export interface SysOrg {
  // * 主键
  id?: string;

  // * 组织名称
  name?: string;

  // * 编号
  code?: string;

  // * 祖先列表
  ancestors?: string;

  // * 层级
  level?: number;

  isActive?: string;

  // * 优先级
  orgSort?: number;

  // * 党组织地址
  address?: string;

  // * 党组织电话
  tel?: string;

  // * 组织类型: 集团党委，基础党组织
  orgType?: string;

  // * 简称
  abbreviation?: string;

  // * 组织类型: 1、公司,2、XXX ,3、角色
  type?: number;

  // * 子节点
  children?: SysOrg[];
}
