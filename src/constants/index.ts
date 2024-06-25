export const sessionKey = 'user-info';
export const TokenKey = 'Admin-Token';
export const whiteList = ['/refreshToken', '/login'];

export const text_color: Record<string, string> = {
  success: '#67c23a',
  info: '#909399',
  danger: '#f56c6c',
  warning: '#e6a23c',
  primary: '#409eff',
  default: '#606266'
};

export const bg_color: Record<string, string> = {
  success: '#f0f9eb',
  info: '#f4f4f5',
  danger: '#fef0f0',
  warning: '#fdf6ec',
  primary: '#ecf5ff',
  default: '#ffffff'
};

export const border_color: Record<string, string> = {
  success: '#b3e19d',
  info: '#c8c9cc',
  danger: '#fab6b6',
  warning: '#f3d19e',
  primary: '#a0cfff',
  default: '#dcdfe6'
};

export const fileType: Record<
  string,
  { type: 'file' | 'image' | 'video'; name: string }
> = {
  1: { type: 'file', name: '文件' },
  2: { type: 'image', name: '图片' },
  3: { type: 'video', name: '视频' }
};

export enum RouteLinks {
  Politics = '政治建设'
}

export enum ResCode {
  Ok = 200,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
  BadGateway = 502
}

export const ErrorCode: { [key: number]: string } = {
  [ResCode.Unauthorized]: '认证失败，无法访问系统资源',
  [ResCode.Forbidden]: '当前操作没有权限',
  [ResCode.NotFound]: '访问资源不存在',
  [ResCode.InternalServerError]: '系统未知错误，请反馈给管理员',
  [ResCode.BadGateway]: '系统未知错误，请反馈给管理员',
  [-1]: '系统未知错误，请反馈给管理员'
};

export enum UserType {
  Group = '集团',
  Grassroots = '基层',
  Unknown = '未知'
}
