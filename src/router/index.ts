import { createWebHashHistory, createRouter } from 'vue-router'
import { useUserInfo } from '@/hooks'

const { menus, permissions, isRoutesGenerated, generateRoutes } = useUserInfo()

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: () => import('@/views/error/index.vue')
    }
  ]
})

const addRouter = () => {
  router.addRoute({
    name: 'layout',
    path: '/',
    component: () => import('@/layout/index.vue'),
    children: [...menus.value]
  })
}

router.beforeEach((to, _form, next) => {
  const token = localStorage.getItem('token')

  if (to.path !== '/login' && !token) {
    next('/login')
  } else {
    // 每次页面刷新时动态添加的路由会丢失，这里需要重新添加
    // 设置isRoutesGenerated防止重复添加，只有第一次需要添加
    if (permissions.value.length && !isRoutesGenerated.value) {
      generateRoutes()
      addRouter()
      next({ path: to.path })
      return
    } else {
      next()
    }
  }
})

export default router
