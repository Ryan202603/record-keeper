import { createWebHashHistory, createRouter } from 'vue-router'
import routers from './userRouters'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'layout',
      path: '/',
      component: () => import('@/layout/index.vue'),
      redirect: '/system-management/user',
      children: routers
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: () => import('@/views/error/index.vue')
    }
  ]
})

export default router
