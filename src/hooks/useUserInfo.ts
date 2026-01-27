import { reactive, toRefs } from 'vue'
import userRouters from '@/router/userRouters'

interface UserState {
  isCollapse: boolean
  permissions: string[]
  userInfo: any
  menus: any[] // 侧边栏菜单展示用
  isRoutesGenerated: boolean // 标记是否已生成动态路由
}

const state = reactive<UserState>({
  isCollapse: false,
  permissions: JSON.parse(localStorage.getItem('permissions') || '[]'),
  userInfo: null,
  menus: [],
  isRoutesGenerated: false
})

export function useUserInfo() {
  // 切换侧边栏折叠状态
  const toggleCollapse = () => {
    state.isCollapse = !state.isCollapse
  }

  const setPermissions = (perms: string[]) => {
    state.permissions = perms
  }

  const setUserInfo = (info: any) => {
    state.userInfo = info
    if (info.permissions) {
      if (!info.permissions.includes('dashboard')) {
        info.permissions.push('dashboard')
      }
      state.permissions = info.permissions
      localStorage.setItem('permissions', JSON.stringify(info.permissions))
    }
  }

  // 递归过滤路由
  const filterAsyncRoutes = (routes: any[], perms: string[]) => {
    const res: any[] = []
    routes.forEach(route => {
      const tmp = { ...route }
      // 只要本身在权限里，或者子节点在权限里
      const hasPermission = perms.includes(tmp.name)
      const hasChildPermission = tmp.children && tmp.children.some((child: any) => perms.includes(child.name))

      if (hasPermission || hasChildPermission) {
        if (tmp.children) {
          tmp.children = filterAsyncRoutes(tmp.children, perms)
        }
        res.push(tmp)
      }
    })
    return res
  }

  // 生成路由
  const generateRoutes = () => {
    // 过滤出有权限的路由
    const accessibleRoutes = filterAsyncRoutes(userRouters, state.permissions)
    state.menus = accessibleRoutes

    state.isRoutesGenerated = true
    return accessibleRoutes
  }

  const resetState = () => {
    state.isRoutesGenerated = false
    state.menus = []
    state.permissions = []
    state.userInfo = null
  }

  return {
    ...toRefs(state),
    toggleCollapse,
    setPermissions,
    setUserInfo,
    generateRoutes,
    resetState
  }
}
