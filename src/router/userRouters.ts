export default [
  {
    name: 'system-management',
    path: 'system-management',
    component: () => import('@/views/system-management/index.vue'),
    meta: {
      title: '系统管理'
    },
    children: [
      {
        name: 'user',
        path: 'user',
        component: () => import('@/views/system-management/user/index.vue'),
        meta: {
          title: '用户管理'
        }
      },
      {
        name: 'role',
        path: 'role',
        component: () => import('@/views/system-management/role/index.vue'),
        meta: {
          title: '角色管理'
        }
      }
    ]
  },
  {
    name: 'mobile-management',
    path: 'mobile-management',
    component: () => import('@/views/mobile-management/index.vue'),
    meta: {
      title: '手机管理'
    },
    children: [
      {
        name: 'software',
        path: 'software',
        component: () => import('@/views/mobile-management/software/index.vue'),
        meta: {
          title: '软件管理'
        }
      }
    ]
  }
]
