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
      component: () => import('@/views/mine/index.vue'),
      meta: {
        title: '我的',
        keepAlive: true,
        visible: false
      }
      // children: [

      // ]
    },
    {
      path: '/setting',
      name: 'Setting',
      component: () => import('@/views/mine/setting.vue'),
      meta: {
        title: '设置',
        keepAlive: true,
        visible: false
      }
    },
    {
      path: '/organization',
      name: 'organization',
      component: () => import('@/views/mine/organization.vue'),
      meta: {
        title: '我的组织',
        keepAlive: true,
        visible: false
      }
    },
    {
      path: '/promise',
      name: 'promise',
      component: () => import('@/views/mine/promise.vue'),
      meta: {
        title: '我的承诺',
        keepAlive: true,
        visible: false
      }
    }
  ]
};
