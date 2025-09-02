import request from '@/utils/request'

const apiPrefix = 'users'

// 获取用户列表
export const getUserList = params => {
  return request({
    url: apiPrefix,
    params
  })
}

// 查询用户详细
export function getUser(userId) {
  return request({
    url: '/system/user/' + userId,
    method: 'get'
  })
}

// 新增用户
export const addUser = data => {
  return request({
    url: apiPrefix,
    method: 'post',
    data
  })
}

// 修改用户
export const updateUser = data => {
  return request({
    url: '/system/user',
    method: 'put',
    data
  })
}

// 删除用户
export const delUser = userId => {
  return request({
    url: apiPrefix + '/' + userId,
    method: 'delete'
  })
}

// 用户密码重置
export const resetUserPwd = data => {
  return request({
    url: '/system/user/resetPwd',
    method: 'put',
    data
  })
}

// 用户状态修改
export const changeUserStatus = data => {
  return request({
    url: '/system/user/changeStatus',
    method: 'put',
    data
  })
}
