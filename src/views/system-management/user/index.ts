export const columns: TableColumn[] = [
  {
    prop: 'userName',
    label: '用户名称',
    minWidth: 180
  },
  {
    prop: 'nickName',
    label: '用户昵称',
    minWidth: 180
  },
  {
    prop: 'deptName',
    label: '部门',
    minWidth: 180
  },
  {
    prop: 'rolesName',
    label: '角色',
    minWidth: 180
  },
  {
    prop: 'phonenumber',
    label: '手机号码',
    minWidth: 180
  },
  {
    prop: 'status',
    label: '状态',
    type: 'switch',
    minWidth: 120
  },
  {
    prop: 'createTime',
    label: '创建时间',
    minWidth: 180
  }
]

export const searchFormItems: OperationForm[] = [
  {
    type: 'input',
    placeholder: '请输入用户名称',
    prop: 'userName'
  }
]
