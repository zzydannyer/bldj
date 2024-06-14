export default [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home',
    meta: { visible: false },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '登录',
      visible: false,
    },
  },
] as Array<RouteConfigsTable>
