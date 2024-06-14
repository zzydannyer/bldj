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
  // 整体路由配置表（包括完整子路由）
  interface RouteConfigsTable {
    // 路由地址 `必填`
    path: string;
    // 路由名字（保持唯一）`可选`
    name?: string;
    // `Layout`组件 `可选`
    component?: RouteComponent | string;
    // 路由重定向 `可选`
    redirect?: string;
    meta?: {
      // 菜单名称（兼容国际化、非国际化，如何用国际化的写法就必须在根目录的`locales`文件夹下对应添加）`必填`
      title: string;
      // 菜单图标 `可选`
      icon?: string | FunctionalComponent | IconifyIcon;
      // 是否在菜单中显示（默认`true`）`可选`
      visible?: boolean;
      // 菜单升序排序，值越高排的越后（只针对顶级路由）`可选`
      rank?: number;
    };
    // 子路由配置项
    children?: Array<RouteChildrenConfigsTable>;
  }

  //  完整子路由配置表
  interface RouteChildrenConfigsTable {
    // 子路由地址 `必填`
    path: string;
    // 路由名字（对应不要重复，和当前组件的`name`保持一致）`必填`
    name?: string;
    // 路由重定向 `可选`
    redirect?: string;
    // 按需加载组件 `可选`
    component?: RouteComponent | string;
    meta?: {
      // 菜单名称（兼容国际化、非国际化，如何用国际化的写法就必须在根目录的`locales`文件夹下对应添加） `必填`
      title: string;
      // 菜单图标 `可选`
      icon?: string | FunctionalComponent | IconifyIcon;
      // 菜单名称右侧的额外图标
      extraIcon?: string | FunctionalComponent | IconifyIcon;
      // 是否在菜单中显示（默认`true`）`可选`
      visible?: boolean;
      // 是否显示父级菜单 `可选`
      showParent?: boolean;
      // 页面级别权限设置 `可选`
      roles?: string[];
      // 按钮级别权限设置 `可选`
      auths?: string[];
      // 路由组件缓存（开启 `true`、关闭 `false`）`可选`
      keepAlive?: boolean;
      // 内嵌的`iframe`链接 `可选`
      frameSrc?: string;
      // `iframe`页是否开启首次加载动画（默认`true`）`可选`
      frameLoading?: boolean;
      // 路由排序字段
      rank?: number;
      // 页面加载动画（有两种形式，一种直接采用vue内置的`transitions`动画，另一种是使用`animate.css`写进、离场动画）`可选`
      transition?: {
        /**
         * @description 当前路由动画效果
         * @see {@link https://next.router.vuejs.org/guide/advanced/transitions.html#transitions}
         * @see animate.css {@link https://animate.style}
         */
        name?: string;
        // 进场动画
        enterTransition?: string;
        // 离场动画
        leaveTransition?: string;
      };
      // 是否不添加信息到标签页，（默认`false`）
      hiddenTag?: boolean;
      // 动态路由可打开的最大数量 `可选`
      dynamicLevel?: number;
    };
    // 子路由配置项
    children?: Array<RouteChildrenConfigsTable>;
  }

  export type Resp<T> = RespWithData<T> | RespWithRows<T>;

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
