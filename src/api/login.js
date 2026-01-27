import request from '@/utils/request'

export const loginApi = data => {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export const getUserInfoApi = () => {
  return request({
    url: '/auth/profile',
    method: 'get'
  })
}
