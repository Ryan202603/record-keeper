<template>
  <Operation :buttons="operationButtons" :form-items="searchFormItems" @search="handleSearch" />

  <CustomTable
    :tableData="tableData"
    :columns="columns"
    :total="total"
    :table-buttons="tableButtons"
    v-model:current-page="pageNum"
    v-model:page-size="pageSize"
    v-model:selected-rows="selectedRows"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  >
    <template #status="{ row }">
      <el-tag :type="statusMap[row.status]?.type">{{ statusMap[row.status]?.label }}</el-tag>
    </template>
    <template #level="{ row }">
      <span>{{ row.currentLevel }}/{{ row.totalLevels }}</span>
    </template>
  </CustomTable>

  <Edit v-if="editDialog" v-model:dialog="editDialog" :form="form" :type="editType" @refresh="refreshTableData" />
  <ApprovalDialog
    v-if="approvalDialog"
    v-model:dialog="approvalDialog"
    :application="currentApplication"
    @refresh="refreshTableData"
  />
</template>

<script setup lang="ts">
import Edit from './edit.vue'
import ApprovalDialog from '../components/approval-dialog.vue'
import { columns, searchFormItems, statusMap } from './index.ts'
import { Plus, View, Check, Close } from '@element-plus/icons-vue'
import { useTableData } from '@/hooks'
import { getExpenseList } from '@/api'

type ApplicationRow = {
  id: string | number
  status: string
  title: string
}

const { tableData, total, pageNum, pageSize, handleSearch, handleSizeChange, handleCurrentChange, refreshTableData } =
  useTableData(getExpenseList)

const form = reactive({
  title: '',
  amount: null,
  reason: '',
  totalLevels: 1,
  approvers: []
})
const editType = ref('add')
const editDialog = ref(false)
const approvalDialog = ref(false)
const currentApplication = ref<any>(null)
const selectedRows = ref<ApplicationRow[]>([])

const operationButtons: OperationButton[] = [
  {
    label: '新增费用申请',
    type: 'primary',
    icon: Plus,
    onClick: () => {
      Object.keys(form).forEach(key => {
        if (key === 'totalLevels') {
          form[key] = 1
        } else if (key === 'approvers') {
          form[key] = []
        } else {
          form[key] = ''
        }
      })
      editType.value = 'add'
      editDialog.value = true
    }
  }
]

const tableButtons: TableButton[] = [
  {
    label: '查看',
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
    show: (row: any) => row.status === 'pending' || row.status === 'in_progress',
    onClick: (row: any) => {
      currentApplication.value = row
      approvalDialog.value = true
    }
  },
  {
    label: '驳回',
    type: 'danger',
    icon: Close,
    show: (row: any) => row.status === 'pending' || row.status === 'in_progress',
    onClick: (row: any) => {
      currentApplication.value = row
      approvalDialog.value = true
    }
  }
]
</script>
