// 类型映射
export const typeMap: Record<string, { label: string; type: 'primary' | 'success' | 'warning' }> = {
  expense: { label: '费用申请', type: 'primary' },
  leave: { label: '请假申请', type: 'success' },
  overtime: { label: '加班申请', type: 'warning' }
}

// 状态映射
export const statusMap: Record<string, { label: string; type: 'warning' | 'info' | 'success' | 'danger' }> = {
  pending: { label: '待审批', type: 'warning' },
  in_progress: { label: '审批中', type: 'info' },
  approved: { label: '已通过', type: 'success' },
  rejected: { label: '已驳回', type: 'danger' }
}

// 审批中心列配置
export const columns: TableColumn[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'type', label: '类型', width: 100, slot: 'type' },
  { prop: 'title', label: '申请标题', minWidth: 150 },
  { prop: 'applicantName', label: '申请人', width: 100 },
  { prop: 'status', label: '状态', width: 100, slot: 'status' },
  { prop: 'currentLevel', label: '审批进度', width: 100, slot: 'level' },
  { prop: 'createTime', label: '申请时间', width: 180 },
  { type: 'operation', label: '操作', width: 200 }
]
