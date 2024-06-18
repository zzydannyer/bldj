export interface TreeNode {
  id: string | number;
  label: string;
  children?: TreeNode[] | null | undefined;
  code?: string;
  parentId?: number;
  type?: number;
}
export class User {
  userId: number;
  userName: string;
}

export class IUser {
  id: number;
  label: string;
}
export type LoadOptions = {
  action: string;
  parentNode: any;
  callback: (error?: Error, options?: any[]) => void;
  searchQuery?: string;
};

export interface SysUserTreeVo {
  /**
   * 用户id
   */
  userId: number;
  /**
   * 用户name
   */
  userName: string;
  orgId: number;
  orgName: string;
  /**
   * 岗位
   */
  position: string;
}
