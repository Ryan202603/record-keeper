export const columns: TableColumn[] = [
  {
    prop: 'nickName',
    label: '用户昵称',
    minWidth: 180
  },
  {
    prop: 'phone',
    label: '手机号码',
    minWidth: 180
  },
  {
    prop: 'email',
    label: '邮箱',
    minWidth: 180
  },
  {
    prop: 'sex',
    label: '性别',
    minWidth: 120,
    formatter: (value: string) => (value === '1' ? '男' : '女')
  }
]

export const searchFormItems: OperationForm[] = [
  {
    type: 'input',
    placeholder: '请输入用户名称',
    prop: 'userName'
  }
]
