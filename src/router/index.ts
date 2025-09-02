import { createWebHashHistory, createRouter } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'layout',
      path: '/',
      component: () => import('@/layout/index.vue'),
      redirect: '/system-management/user',
      children: [
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
        }
      ]
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: () => import('@/views/error/index.vue')
    }
  ]
})

export default router
