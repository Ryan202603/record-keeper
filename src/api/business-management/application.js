import request from '@/utils/request'

const apiPrefix = 'applications'

// 申请类型枚举
export const ApplicationType = {
  EXPENSE: 'expense',
  LEAVE: 'leave',
  OVERTIME: 'overtime'
}

// 审批状态枚举
export const ApplicationStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  APPROVED: 'approved',
  REJECTED: 'rejected'
}

// 获取所有申请列表
export const getApplicationList = params => {
  return request({
    url: apiPrefix,
    params
  })
}

// 获取费用申请列表
export const getExpenseList = params => {
  return request({
    url: `${apiPrefix}/expense`,
    params
  })
}

// 获取请假申请列表
export const getLeaveList = params => {
  return request({
    url: `${apiPrefix}/leave`,
    params
  })
}

// 获取加班申请列表
export const getOvertimeList = params => {
  return request({
    url: `${apiPrefix}/overtime`,
    params
  })
}

// 获取待审批列表
export const getPendingList = params => {
  return request({
    url: `${apiPrefix}/pending`,
    params
  })
}

// 获取申请详情
export const getApplicationDetail = id => {
  return request({
    url: `${apiPrefix}/${id}`
  })
}

// 新增申请
export const addApplication = data => {
  return request({
    url: apiPrefix,
    method: 'post',
    data
  })
}

// 更新申请
export const updateApplication = data => {
  return request({
    url: `${apiPrefix}/${data.id}`,
    method: 'put',
    data
  })
}

// 审批申请
export const approveApplication = (id, data) => {
  return request({
    url: `${apiPrefix}/${id}/approve`,
    method: 'put',
    data
  })
}

// 撤回申请
export const withdrawApplication = id => {
  return request({
    url: `${apiPrefix}/${id}/withdraw`,
    method: 'put'
  })
}

// 删除申请
export const delApplication = id => {
  return request({
    url: `${apiPrefix}/${id}`,
    method: 'delete'
  })
}
