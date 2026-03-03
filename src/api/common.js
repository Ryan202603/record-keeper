import request from '@/utils/request'

export const uploadFile = data => {
  return request({
    url: '/upload/image',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
