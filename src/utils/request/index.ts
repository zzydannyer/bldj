import axios, {
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosInstance,
  CustomParamsSerializer
} from 'axios';
import { stringify } from 'qs';
import useUserInfoStore from '@/store/modules/user';
import { getToken, formatToken } from '@/utils/auth';
import { ResCode, ErrorCode } from '@/constants';
// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
// 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
const defaultConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  paramsSerializer: {
    serialize: stringify as CustomParamsSerializer
  }
};

const instance: AxiosInstance = axios.create(defaultConfig);

function getErrorMessage(arg: number | string): string {
  if (typeof arg === 'number') {
    return ErrorCode[arg] || ErrorCode[-1];
  } else {
    if (arg == 'Network Error') {
      return '后端接口连接异常';
    } else if (arg.includes('timeout')) {
      return '系统接口请求超时';
    } else if (arg.includes('Request failed with status code')) {
      return '系统接口' + arg.substring(arg.length - 3) + '异常';
    } else {
      return arg;
    }
  }
}

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const whiteList = ['/login'];
    if (whiteList.some((url) => config.url === url)) {
      return config;
    }
    const token = getToken();
    if (token) {
      config.headers!['Authorization'] = formatToken(token);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const code = response.data.code;
    const msg: string = response.data.msg || getErrorMessage(code);
    if (code in ResCode && code !== ResCode.Ok) {
      code === ResCode.Unauthorized && useUserInfoStore().LOGOUT();
      return Promise.reject(msg);
    } else {
      return Promise.resolve(response.data);
    }
  },
  (error: AxiosError) => {
    const msg: string = getErrorMessage(error.message);
    return Promise.reject(msg);
  }
);

function request<D>(config: AxiosRequestConfig): Promise<D>;
function request<D = any>(config: AxiosRequestConfig): Promise<D> {
  return instance.request(config);
}

export default request;
