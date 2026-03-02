import dateFormat from '@/utils/formatData'

export const columns: TableColumn[] = [
  {
    prop: 'name',
    label: '名称',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'cover',
    label: '封面',
    width: 120,
    align: 'center',
    type: 'image'
  },
  {
    prop: 'category',
    label: '类别',
    width: 100,
    align: 'center'
  },
  {
    prop: 'season',
    label: '季节',
    width: 100,
    align: 'center'
  },
  {
    prop: 'desc',
    label: '描述',
    minWidth: 200
  },
  {
    prop: 'createdAt',
    label: '创建时间',
    minWidth: 180,
    align: 'center',
    formatter: dateFormat
  }
]

export const searchFormItems: OperationForm[] = [
  {
    type: 'input',
    placeholder: '请输入食物名称',
    prop: 'name'
  }
]
