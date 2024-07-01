export const SessionKey = 'user-info';
export const TokenKey = 'Admin-Token';
export const WhiteList = [, '/login'];

export enum TextColor {
  success = '#67c23a',
  info = '#909399',
  danger = '#f56c6c',
  warning = '#e6a23c',
  primary = '#409eff',
  default = '#606266'
}

export enum BgColor {
  success = '#f0f9eb',
  info = '#f4f4f5',
  danger = '#fef0f0',
  warning = '#fdf6ec',
  primary = '#ecf5ff',
  default = '#ffffff'
}

export enum BorderColor {
  success = '#b3e19d',
  info = '#c8c9cc',
  danger = '#fab6b6',
  warning = '#f3d19e',
  primary = '#a0cfff',
  default = '#dcdfe6'
}

export enum ResCode {
  Ok = 200,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
  BadGateway = 502
}

export enum UserType {
  Group = '集团',
  Grassroots = '基层',
  Unknown = '未知'
}
export enum ChannelId {
  '党建事务' = '25d22599ea7d489fa2b63520e71b239f',
  '通知公告' = 'eb17fd4dab2045db992b3beb369fc9a5',
  '党纪宣贯' = '8f42ecf773714fa09348d2c2361aff26',
  '监督检查' = '6994f47316514ab499ed6051d716fb24',
  '八项' = 'f718872f70714afdb760c6b8c6905db2',
  '深化' = '421b87801b284a17a8d60d77d1a5ae9a',
  '廉政' = '4a676556ab504f7c9eb104b4a988a075',
  '青年思想引领' = '6dd396b2e4f24b51a0cb80e9c8211e14',
  '全面从严治团' = 'af05402ba8c44f5cb46290a4a7747958',
  '青年岗位建功' = 'febb6ed9a5c24c6986b9db4bf5cc93cf',
  '服务青年成才' = '26648d4b4f6c4ca7a48a4f60db8b97c9',
  '社会责任工作动态' = 'fa64c453a9914f76bf6c5974000df495'
}

const PrivateUrlPrefix = 'blgroup-dj.obs.cn-east-3.myhuaweicloud.com';

export default {
  SessionKey,
  TokenKey,
  WhiteList,
  TextColor,
  BgColor,
  BorderColor,
  ResCode,
  ChannelId,
  PrivateUrlPrefix
};
