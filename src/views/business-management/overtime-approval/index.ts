// 状态映射
export const statusMap: Record<string, { label: string; type: 'warning' | 'info' | 'success' | 'danger' }> = {
  pending: { label: '待审批', type: 'warning' },
  in_progress: { label: '审批中', type: 'info' },
  approved: { label: '已通过', type: 'success' },
  rejected: { label: '已驳回', type: 'danger' }
}

// 加班审核列配置
export const columns: TableColumn[] = [
  { type: 'selection' },
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'title', label: '申请标题', minWidth: 150 },
  { prop: 'startTime', label: '开始时间', width: 180 },
  { prop: 'endTime', label: '结束时间', width: 180 },
  { prop: 'duration', label: '时长(小时)', width: 100 },
  { prop: 'applicantName', label: '申请人', width: 100 },
  { prop: 'status', label: '状态', width: 100, slot: 'status' },
  { prop: 'currentLevel', label: '当前层级', width: 100, slot: 'level' },
  { prop: 'createTime', label: '申请时间', width: 180 },
  { type: 'operation', label: '操作', width: 200 }
]

// 搜索表单配置
export const searchFormItems: OperationForm[] = [
  { label: '申请标题', prop: 'title', type: 'input' },
  {
    label: '状态',
    prop: 'status',
    type: 'select',
    options: [
      { label: '待审批', value: 'pending' },
      { label: '审批中', value: 'in_progress' },
      { label: '已通过', value: 'approved' },
      { label: '已驳回', value: 'rejected' }
    ]
  }
]
