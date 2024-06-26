import { RouteRecordRaw } from 'vue-router';

/** 自动导入全部静态路由，无需再手动引入！匹配 src/router/modules 目录（任何嵌套级别）中具有 .ts 扩展名的所有文件，除了 remaining.ts 文件
 * 如何匹配所有文件请看：https://github.com/mrmlnc/fast-glob#basic-syntax
 * 如何排除文件请看：https://cn.vitejs.dev/guide/features.html#negative-patterns
 */
const modules: Record<string, any> = import.meta.glob('./modules/*.ts', {
  eager: true
});

/**
 * @description 多维数组转一维数组
 * @param routes
 */
const flattenRoutes = (routes: any[]): RouteRecordRaw[] => {
  return routes.reduce((resultList, cur) => {
    if (Array.isArray(cur)) {
      resultList = resultList.concat(cur);
    } else {
      resultList.push(cur);
    }
    return resultList;
  }, []);
};

const routes: Array<RouteRecordRaw> = flattenRoutes(
  Object.values(modules).map((module) => module.default)
);

export default routes;
