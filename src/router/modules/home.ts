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
      component: () => import('@/views/home/index.vue'),
      meta: {
        title: '首页',
        keepAlive: true,
        visible: false
      }
    },
    {
      path: '/notice/list',
      name: 'NoticeList',
      component: () => import('@/views/home/noticeList.vue'),
      meta: {
        keepAlive: false,
        visible: false
      }
    },
    {
      path: '/news/list',
      name: 'NewsList',
      component: () => import('@/views/home/newsList.vue'),
      meta: {
        keepAlive: false,
        visible: false
      }
    },
    {
      path: '/detail/:section/:detailId',
      name: 'Detail',
      component: () => import('@/views/details/index.vue'),
      meta: {
        keepAlive: false,
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
        visible: false,
        hideTopNav: true
      }
      // children: [

      // ]
    },
    {
      path: '/setting',
      name: 'Setting',
      component: () => import('@/views/mine/pages/setting.vue'),
      meta: {
        title: '设置',
        keepAlive: true,
        showLeftArrow: true,
        visible: false
      }
    },
    {
      path: '/organization',
      name: 'Organization',
      component: () => import('@/views/mine/pages/organization.vue'),
      meta: {
        title: '我的组织',
        keepAlive: true,
        showLeftArrow: true,
        visible: false
      }
    },
    {
      path: '/active',
      name: 'active',
      component: () => import('@/views/mine/pages/active.vue'),
      meta: {
        title: '我的活跃度',
        keepAlive: true,
        showLeftArrow: true,
        visible: false
      }
    },
    {
      path: '/promise',
      name: 'Promise',
      component: () => import('@/views/mine/pages/promise.vue'),
      meta: {
        title: '我的承诺',
        keepAlive: true,
        showLeftArrow: true,
        visible: false
      }
    },
    {
      path: '/materials',
      name: 'Materials',
      component: () => import('@/views/mine/pages/materials.vue'),
      meta: {
        title: '我的素材',
        keepAlive: true,
        showLeftArrow: true,
        visible: false
      }
    },
    {
      path: '/reminder',
      name: 'Reminder',
      component: () => import('@/views/mine/pages/reminder.vue'),
      meta: {
        title: '工作提醒',
        keepAlive: true,
        visible: false
      }
    }
  ]
};
