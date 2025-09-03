import request from '@/utils/request'

const apiPrefix = 'users'

// 获取用户列表
export const getUserList = params => {
  return request({
    url: apiPrefix,
    params
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
    url: apiPrefix + '/' + data.id,
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
