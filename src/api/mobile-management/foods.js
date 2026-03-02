import request from '@/utils/request'

const apiPrefix = 'foods'

// 获取所有食物列表
export const getFoodList = params => {
  return request({
    url: apiPrefix,
    params
  })
}

// 获取食物详情
export const getFoodDetail = id => {
  return request({
    url: `${apiPrefix}/${id}`
  })
}

// 创建食物
export const createFood = data => {
  return request({
    url: apiPrefix,
    method: 'post',
    data
  })
}

// 更新食物
export const updateFood = (id, data) => {
  return request({
    url: `${apiPrefix}/${id}`,
    method: 'patch',
    data
  })
}

// 删除食物
export const deleteFood = id => {
  return request({
    url: `${apiPrefix}/${id}`,
    method: 'delete'
  })
}
