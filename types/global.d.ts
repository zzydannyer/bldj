import type { FunctionalComponent } from 'vue';
import type { ECharts } from 'echarts';
import type { IconifyIcon } from '@iconify/vue';
import { toLabel } from '@/utils';
import { parse } from '@/utils/date';
import { type download } from '@/plugins/download';
import type { IconifyIcon } from '@iconify/vue';
import type { RouteComponent, RouteLocationNormalized } from 'vue-router';
import type { useDict } from '@/plugins/dict';
import { Method, AxiosError, AxiosRequestConfig } from 'axios';

// 全局类型声明，无需引入直接在 `.vue` 、`.ts` 、`.tsx` 文件使用即可获得类型提示
declare global {
  interface Window {
    h5sdk: any;
    tt: any;
  }

  type Resp<T> = RespWithData<T> | RespWithRows<T>;

  interface RespWithData<T> {
    code: RespCode;
    data: T;
    msg: string;
  }

  interface RespWithRows<T> {
    code: RespCode;
    rows: T[];
    msg: string;
    total: number;
  }

  // 平台里所有组件实例都能访问到的全局属性对象的类型声明
  interface GlobalPropertiesApi {
    $echarts: ECharts;
    $storage: ResponsiveStorage;
    $config: ServerConfigs;
    $download: typeof download;
    // 查询字典
    $useDict: typeof useDict;
    $parse: typeof parse;
    $value_to_label: typeof value_to_label;
    $value_to_dict: typeof value_to_dict;
  }
}
