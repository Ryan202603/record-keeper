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
  />

  <Edit v-if="dialog" v-model:dialog="dialog" :form="form" :type="type" @refresh="refreshTableData" />
</template>

<script setup lang="ts">
import Edit from './edit.vue'
import { columns, searchFormItems } from './index.ts'
import { Delete, Plus } from '@element-plus/icons-vue'
import { useTableData } from '@/hooks'
import { getUserList, delUser } from '@/api'

type UserRow = {
  userId: string | number
}

const { tableData, total, pageNum, pageSize, handleSearch, handleSizeChange, handleCurrentChange, refreshTableData } =
  useTableData(getUserList)
const form: any = {}
const type = ref('add') // 用于区分是添加还是编辑
const dialog = ref(false)
const selectedRows = ref<UserRow[]>([])

const operationButtons: OperationButton[] = [
  {
    label: '添加',
    type: 'primary',
    icon: Plus,
    onClick: () => {
      Object.keys(form).map(key => (form[key] = ''))
      form.sex = '1'
      type.value = 'add'
      dialog.value = true
    }
  },
  {
    label: '删除',
    type: 'danger',
    icon: Delete,
    onClick: () => {
      if (selectedRows.value.length === 0) {
        ElMessage.warning('请至少选择一条数据')
        return
      }

      const userIds = selectedRows.value.map(item => item.userId).join(',')
      ElMessageBox.confirm(`是否确认删除选中的${selectedRows.value.length}条数据?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return delUser(userIds)
        })
        .then(() => {
          ElMessage.success('删除成功')
          refreshTableData()
        })
    }
  }
]

const tableButtons: TableButton[] = [
  {
    label: '编辑',
    type: 'primary',
    onClick: row => {
      Object.assign(form, row)
      type.value = 'edit'
      dialog.value = true
    }
  },
  {
    label: '删除',
    type: 'danger',
    onClick: row => {
      ElMessageBox.confirm('是否确认删除用户 "' + row.nickName + '" 的数据项？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return delUser(row.id)
        })
        .then(() => {
          ElMessage.success('删除成功')
          refreshTableData() // 重新获取列表数据
        })
    }
  }
]
</script>

<style lang="scss" scoped></style>
