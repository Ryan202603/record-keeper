import request from '@/utils/request'

// 获取角色列表
export const getRoleList = params => {
  return request({
    url: '/roles',
    method: 'get',
    params
  })
}

// 获取所有菜单列表（用于权限分配，其实可以是前端的userRouters，甚至可以是后端返回的）
// 这里预留一个接口，如果前端直接用本地userRouters，则不需要这个接口
export const getPermissionList = () => {
  return request({
    url: '/permissions',
    method: 'get'
  })
}

// 新增角色
export const addRole = data => {
  return request({
    url: '/roles',
    method: 'post',
    data
  })
}

// 修改角色
export const updateRole = (id, data) => {
  return request({
    url: `/roles/${id}`,
    method: 'patch',
    data
  })
}

// 删除角色
export const deleteRole = id => {
  return request({
    url: `/roles/${id}`,
    method: 'delete'
  })
}
