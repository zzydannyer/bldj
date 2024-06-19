// 用户信息
export interface UserInfo {
  permissions: string[];
  roles: string[];
  user: {
    uid: string;
    loginName: string;
    loginPwd: string;
    salt: string;
    realName: string;
    orgId: string;
    orgName: string;
    mobile: string;
    email: string;
    birthday: string;
    sex: string;
    partyMemberId: string;
    ghMemberId: string;
    twMemberId: string;
    partyOrgId: string;
    partyOrgName: string;
    ghOrgId: string;
    twOrgId: string;
    avatar: string;
    isNeedUpdate: string;
    upTime: string;
    createTime: string;
    creatorUid: string;
    creatorRealName: string;
    isActive: string;
    partyScopeOrgId: string;
    orgLevel: number;
    updatePasswordDate: string;
    permissionMap: string;
    roleList: string;
    roleUids: string;
    roleNameList: string;
    isOrgDirect: boolean;
  };
  party: {
    partyScopeName: string;
    partyScopeId: string;
    partyName: string;
    partyId: string;
  };
}

// 登录请求参数
export interface LoginReq {
  username: string;
  password: string;
  captcha: string;
}

// 登录返回信息
export interface LoginRes {
  token: string;
}
