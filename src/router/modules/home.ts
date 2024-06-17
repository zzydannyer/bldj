const Layout = () => import('@/layout/index.vue');

export default {
  path: '/',
  name: '/',
  redirect: '/home',
  component: Layout,
  meta: {
    icon: 'ant-design:home-filled',
    title: '首页',
    visible: true
  },
  children: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/home.vue'),
      meta: {
        title: '首页',
        keepAlive: true,
        visible: false
      }
    },
    {
      path: '/mine',
      name: 'Mine',
      component: () => import('@/views/mine.vue'),
      meta: {
        title: '我的',
        keepAlive: true,
        visible: false
      }
    }
  ]
};
