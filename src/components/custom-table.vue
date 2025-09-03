<template>
  <el-table
    border
    ref="tableRef"
    v-bind="$attrs"
    :data="tableData"
    @selection-change="handleSelectionChange"
    v-loading="loading"
    height="calc(100vh - 222px)"
    style="width: 100%"
  >
    <el-table-column v-if="showSelection" type="selection" width="55" />
    <template v-for="column in columns" :key="column.prop">
      <el-table-column
        :prop="column.prop"
        :label="column.label"
        :min-width="column.minWidth"
        :sortable="column.sortable"
        :align="column.align || 'center'"
      >
        <template #default="scope">
          <template v-if="column.type === 'tag'">
            <el-tag :type="getTagType(scope.row, column)">
              {{ scope.row[column.prop] }}
            </el-tag>
          </template>

          <template v-else-if="column.type === 'switch'">
            <el-switch
              v-model="scope.row[column.prop]"
              active-value="0"
              inactive-value="1"
              inline-prompt
              active-text="启用"
              inactive-text="停用"
            />
          </template>

          <template v-else-if="column.type === 'image'">
            <el-image :src="scope.row[column.prop]" :preview-src-list="[scope.row[column.prop]]" fit="cover" />
          </template>

          <template v-else>
            {{ column.formatter ? column.formatter(scope.row[column.prop]) : scope.row[column.prop] }}
          </template>
        </template>
      </el-table-column>
    </template>

    <!-- 操作列 -->
    <el-table-column
      v-if="tableButtons?.length"
      label="操作"
      :width="tableButtons.length * 75"
      fixed="right"
      align="center"
    >
      <template #default="scope">
        <template v-for="operation in tableButtons" :key="operation.label">
          <el-button
            size="small"
            :type="operation.type"
            @click="operation.onClick(toRaw(scope.row), toRaw(scope.$index))"
          >
            {{ operation.label }}
          </el-button>
        </template>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    v-if="showPagination"
    :current-page="currentPage"
    :page-size="pageSize"
    :page-sizes="pageSizes"
    :total="total"
    :layout="paginationLayout"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts" setup>
import { toRaw } from 'vue'
import type { ElTable } from 'element-plus'

interface TableProps {
  // 表格数据
  tableData: any[]
  // 列配置
  columns: TableColumn[]
  // 选中列
  selectedRows?: any[]
  // 是否显示加载状态
  loading?: boolean
  // 是否显示选择列
  showSelection?: boolean
  // 操作按钮配置
  tableButtons?: TableButton[]
  // 分页相关配置
  showPagination?: boolean
  // 总条数
  total?: number
  // 当前页码
  currentPage?: number
  // 每页条数
  pageSize?: number
  // 可选的每页条数
  pageSizes?: number[]
  // 分页器布局
  paginationLayout?: string
}

withDefaults(defineProps<TableProps>(), {
  tableData: () => [],
  columns: () => [],
  selectedRows: () => [],
  loading: false,
  showSelection: true,
  tableButtons: () => [],
  showPagination: true,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  pageSizes: () => [10, 20, 50, 100],
  paginationLayout: 'prev, pager, next,total, sizes'
})

// 定义事件
const emit = defineEmits([
  'update:currentPage',
  'update:pageSize',
  'size-change',
  'current-change',
  'selection-change',
  'update:selectedRows'
])
const tableRef = ref<InstanceType<typeof ElTable> | null>(null)

// 处理分页事件
const handleSizeChange = (val: number) => {
  emit('update:pageSize', val)
  emit('size-change', val)
}

const handleCurrentChange = (val: number) => {
  emit('update:currentPage', val)
  emit('current-change', val)
}

const handleSelectionChange = (rows: any) => {
  emit('update:selectedRows', rows)
}

// 获取标签类型方法
const getTagType = (row: any, column: any) => {
  if (typeof column.tagType === 'function') {
    return column.tagType(row)
  }
  return column.tagType || ''
}
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
