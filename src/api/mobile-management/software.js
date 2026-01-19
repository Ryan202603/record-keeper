import request from '@/utils/request'

const apiPrefix = 'softwares'

// 获取软件列表
export const getSoftwareList = params => {
  return request({
    url: apiPrefix,
    params
  })
}

// 新增软件
export const addSoftware = data => {
  return request({
    url: apiPrefix,
    method: 'post',
    data
  })
}

// 编辑软件
export const updateSoftware = data => {
  return request({
    url: `${apiPrefix}/${data.id}`,
    method: 'put',
    data
  })
}

// 删除软件
export const delSoftware = id => {
  return request({
    url: `${apiPrefix}/${id}`,
    method: 'delete'
  })
}
