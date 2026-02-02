<template>
  <div class="approval-center">
    <el-tabs v-model="activeTab" @tab-change="handleTabChange">
      <el-tab-pane label="全部待审批" name="all" />
      <el-tab-pane label="费用申请" name="expense" />
      <el-tab-pane label="请假申请" name="leave" />
      <el-tab-pane label="加班申请" name="overtime" />
    </el-tabs>

    <CustomTable
      :tableData="tableData"
      :columns="columns"
      :total="total"
      :table-buttons="tableButtons"
      v-model:current-page="pageNum"
      v-model:page-size="pageSize"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
      <template #type="{ row }">
        <el-tag :type="typeMap[row.type]?.type">{{ typeMap[row.type]?.label }}</el-tag>
      </template>
      <template #status="{ row }">
        <el-tag :type="statusMap[row.status]?.type">{{ statusMap[row.status]?.label }}</el-tag>
      </template>
      <template #level="{ row }">
        <span>{{ row.currentLevel }}/{{ row.totalLevels }}</span>
      </template>
    </CustomTable>

    <ApprovalDialog
      v-if="approvalDialog"
      v-model:dialog="approvalDialog"
      :application="currentApplication"
      @refresh="handleRefresh"
    />
  </div>
</template>

<script setup lang="ts">
import ApprovalDialog from '../components/approval-dialog.vue'
import { columns, typeMap, statusMap } from './index.ts'
import { View, Check, Close } from '@element-plus/icons-vue'
import { useTableData } from '@/hooks'
import { getPendingList, getExpenseList, getLeaveList, getOvertimeList } from '@/api'

const activeTab = ref<string>('all')
const approvalDialog = ref(false)
const currentApplication = ref<any>(null)

// 获取待审批数据
const fetchPendingList = (params: any) => {
  return getPendingList(params)
}

// 获取费用待审批
const fetchExpensePending = (params: any) => {
  return getExpenseList({ ...params, status: 'pending' })
}

// 获取请假待审批
const fetchLeavePending = (params: any) => {
  return getLeaveList({ ...params, status: 'pending' })
}

// 获取加班待审批
const fetchOvertimePending = (params: any) => {
  return getOvertimeList({ ...params, status: 'pending' })
}

const apiMap: Record<string, (params: any) => Promise<any>> = {
  all: fetchPendingList,
  expense: fetchExpensePending,
  leave: fetchLeavePending,
  overtime: fetchOvertimePending
}

const { tableData, total, pageNum, pageSize, handleSizeChange, handleCurrentChange } = useTableData(fetchPendingList)

// 当前使用的API函数
const currentApi = ref(fetchPendingList)

const handleTabChange = (tab: string | number) => {
  const tabKey = String(tab)
  currentApi.value = apiMap[tabKey]
  // 重新获取数据
  handleRefresh()
}

const handleRefresh = async () => {
  const params = {
    pageNum: pageNum.value,
    pageSize: pageSize.value
  }
  try {
    const res = await currentApi.value(params)
    tableData.value = res.list || []
    total.value = res.total || 0
  } catch (error) {
    console.error('获取数据失败', error)
  }
}

const tableButtons: TableButton[] = [
  {
    label: '查看详情',
    type: 'primary',
    icon: View,
    onClick: (row: any) => {
      currentApplication.value = row
      approvalDialog.value = true
    }
  },
  {
    label: '通过',
    type: 'success',
    icon: Check,
    onClick: (row: any) => {
      currentApplication.value = row
      approvalDialog.value = true
    }
  },
  {
    label: '驳回',
    type: 'danger',
    icon: Close,
    onClick: (row: any) => {
      currentApplication.value = row
      approvalDialog.value = true
    }
  }
]
</script>

<style scoped>
.approval-center {
  padding: 0;
}
</style>
