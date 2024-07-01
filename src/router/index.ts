import type { App } from 'vue';
import { createRouter, createWebHistory, Router } from 'vue-router';
import routes from './routes';
import { getToken } from '@/utils/auth';
import Constants from '@/constants';

const router: Router = createRouter({
  history: createWebHistory(), // history 模式则使用 createWebHistory()
  routes,
  strict: true
});

router.beforeEach(async (to, from, next) => {
  const { path } = to;
  //判断 用户是否登录
  const token = getToken();
  // 如果已经登录并存在登录信息后不能跳转到路由白名单，而是继续保持在当前页面
  if (token) {
    next();
  } else {
    Constants.WhiteList.includes(path) ? next() : next('/login');
  }
});

router.afterEach((to, from) => {
  // NProgress.done();
});

export default function setupRouter(app: App) {
  app.use(router);
}
