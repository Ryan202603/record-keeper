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
    name: 'work-management',
    path: 'work-management',
    component: () => import('@/views/work-management/index.vue'),
    meta: {
      title: '工作管理',
      id: 2
    },
    children: [
      {
        name: 'approval',
        path: 'approval',
        component: () => import('@/views/work-management/approval/index.vue'),
        meta: {
          title: '审批管理',
          id: 22
        }
      }
    ]
  }
]
