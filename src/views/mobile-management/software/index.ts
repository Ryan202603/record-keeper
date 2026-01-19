export const columns: TableColumn[] = [
  {
    prop: 'name',
    label: '软件名称',
    minWidth: 150
  },
  {
    prop: 'version',
    label: '版本',
    minWidth: 100
  },
  {
    prop: 'features',
    label: '特点',
    minWidth: 200
  },
  {
    prop: 'testDevice',
    label: '测试手机',
    minWidth: 150
  },
  {
    prop: 'testSystem',
    label: '测试系统',
    minWidth: 150
  }
]

export const searchFormItems: OperationForm[] = [
  {
    type: 'input',
    placeholder: '请输入软件名称',
    prop: 'name'
  }
]
