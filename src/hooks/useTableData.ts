import { type Ref, ref, onMounted } from 'vue'

interface TableResponse<T> {
  data: T[]
  items: number
}

export function useTableData<T>(
  requestApi: (params: any) => Promise<TableResponse<T>>,
  initialQuery: Record<string, any> = {}
) {
  // 分页相关状态
  const tableData = ref<T[]>([]) as Ref<T[]>
  const total = ref(0)
  const pageNum = ref(1)
  const pageSize = ref(10)

  // 查询参数 - 使用初始值
  const queryParams = ref<Record<string, any>>({ ...initialQuery })

  // 加载数据函数
  const loadData = async () => {
    const params = {
      _page: pageNum.value,
      _per_page: pageSize.value,
      ...queryParams.value
    }

    const res = await requestApi(params)

    tableData.value = res.data
    total.value = res.items
  }

  // 处理页码变化
  const handleCurrentChange = (val: number) => {
    pageNum.value = val
    loadData()
  }

  // 处理每页条数变化
  const handleSizeChange = (val: number) => {
    pageSize.value = val
    pageNum.value = 1 // 重置到第一页
    loadData()
  }

  // 处理搜索
  const handleSearch = (params: Record<string, any>) => {
    queryParams.value = params
    pageNum.value = 1 // 搜索时重置到第一页
    loadData()
  }

  const refreshTableData = () => {
    // 使用当前查询参数刷新数据
    loadData()
  }

  // 组件挂载时加载数据
  onMounted(() => {
    loadData()
  })

  return {
    tableData,
    total,
    pageNum,
    pageSize,
    handleCurrentChange,
    handleSizeChange,
    handleSearch,
    loadData,
    refreshTableData
  }
}
