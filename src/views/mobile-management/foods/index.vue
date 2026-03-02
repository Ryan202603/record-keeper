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
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Delete, Plus, Edit as EditIcon } from '@element-plus/icons-vue'
import Edit from './edit.vue'
import { columns, searchFormItems } from './index.ts'
import { useTableData } from '@/hooks'
import { getFoodList, deleteFood } from '@/api'

// 类型定义
interface FoodRow {
  id: number
  name: string
  cover: string
  bgImage: string
  desc: string
  season: string
  category: string
  nutrition: string
  tips: string
  pairings: string
  createdAt: string
}

const { tableData, total, pageNum, pageSize, handleSearch, handleSizeChange, handleCurrentChange, refreshTableData } =
  useTableData(getFoodList)

const form = ref<Partial<FoodRow>>({})
const type = ref<'add' | 'edit'>('add')
const dialog = ref(false)
const selectedRows = ref<FoodRow[]>([])

const operationButtons: any[] = [
  {
    label: '添加',
    type: 'primary',
    icon: Plus,
    onClick: () => {
      form.value = {
        name: undefined,
        category: undefined,
        season: undefined,
        cover: undefined,
        bgImage: undefined,
        desc: undefined,
        nutrition: undefined,
        tips: undefined,
        pairings: undefined
      }
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

      const ids = selectedRows.value.map(item => item.id).join(',')

      ElMessageBox.confirm(`是否确认删除选中的${selectedRows.value.length}条数据?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return deleteFood(ids)
        })
        .then(() => {
          ElMessage.success('删除成功')
          refreshTableData()
        })
    }
  }
]

const tableButtons: any[] = [
  {
    label: '编辑',
    type: 'primary',
    icon: EditIcon,
    link: true,
    onClick: (row: FoodRow) => {
      form.value = { ...row }
      type.value = 'edit'
      dialog.value = true
    }
  },
  {
    label: '删除',
    type: 'danger',
    icon: Delete,
    link: true,
    onClick: (row: FoodRow) => {
      ElMessageBox.confirm(`是否确认删除食物 "${row.name}" ？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return deleteFood(row.id)
        })
        .then(() => {
          ElMessage.success('删除成功')
          refreshTableData()
        })
    }
  }
]
</script>
