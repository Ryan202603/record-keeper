export default [
  {
    name: 'system-management',
    path: 'system-management',
    component: () => import('@/views/system-management/index.vue'),
    meta: {
      title: '系统管理',
      id: 1
    },
    children: [
      {
        name: 'user',
        path: 'user',
        component: () => import('@/views/system-management/user/index.vue'),
        meta: {
          title: '用户管理',
          id: 11
        }
      }
    ]
  },
  {
    name: 'mobile-management',
    path: 'mobile-management',
    component: () => import('@/views/mobile-management/index.vue'),
    meta: {
      title: '手机管理',
      id: 2
    },
    children: [
      {
        name: 'software',
        path: 'software',
        component: () => import('@/views/mobile-management/software/index.vue'),
        meta: {
          title: '软件管理',
          id: 21
        }
      }
    ]
  }
]
