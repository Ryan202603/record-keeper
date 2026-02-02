export default [
  {
    name: 'dashboard',
    path: 'dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    name: 'business-management',
    path: 'business-management',
    component: () => import('@/views/business-management/index.vue'),
    meta: {
      title: '业务管理'
    },
    children: [
      {
        name: 'expense-approval',
        path: 'expense-approval',
        component: () => import('@/views/business-management/expense-approval/index.vue'),
        meta: {
          title: '费用审核'
        }
      },
      {
        name: 'leave-approval',
        path: 'leave-approval',
        component: () => import('@/views/business-management/leave-approval/index.vue'),
        meta: {
          title: '请假审核'
        }
      },
      {
        name: 'overtime-approval',
        path: 'overtime-approval',
        component: () => import('@/views/business-management/overtime-approval/index.vue'),
        meta: {
          title: '加班审核'
        }
      },
      {
        name: 'approval-center',
        path: 'approval-center',
        component: () => import('@/views/business-management/approval-center/index.vue'),
        meta: {
          title: '审批中心'
        }
      }
    ]
  },
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
