<template>
  <el-dialog v-model="dialogVisible" :title="type === 'add' ? '新增费用申请' : '编辑费用申请'" width="600px">
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="申请标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入申请标题" />
      </el-form-item>
      <el-form-item label="金额(元)" prop="amount">
        <el-input-number v-model="formData.amount" :min="0" :precision="2" style="width: 100%" />
      </el-form-item>
      <el-form-item label="申请原因" prop="reason">
        <el-input v-model="formData.reason" type="textarea" :rows="3" placeholder="请输入申请原因" />
      </el-form-item>
      <el-form-item label="审批层级" prop="totalLevels">
        <el-input-number v-model="formData.totalLevels" :min="1" :max="5" />
        <span class="ml-2 text-gray-500">（设置需要几级审批）</span>
      </el-form-item>
      <el-form-item v-for="level in formData.totalLevels" :key="level" :label="`第${level}级审批人`">
        <el-select v-model="formData.approvers[level - 1]" placeholder="请选择审批人" style="width: 100%">
          <el-option v-for="user in userList" :key="user.id" :label="user.nickName" :value="user.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { addApplication, updateApplication, getUserList, ApplicationType } from '@/api'

const props = defineProps<{
  dialog: boolean
  form: any
  type: string
}>()

const emit = defineEmits(['update:dialog', 'refresh'])

const formRef = ref()
const userList = ref<any[]>([])

const dialogVisible = computed({
  get: () => props.dialog,
  set: val => emit('update:dialog', val)
})

const formData = reactive({
  title: '',
  amount: null as number | null,
  reason: '',
  totalLevels: 1,
  approvers: [] as number[]
})

const rules = {
  title: [{ required: true, message: '请输入申请标题', trigger: 'blur' }],
  amount: [{ required: true, message: '请输入金额', trigger: 'blur' }]
}

// 获取用户列表作为审批人选项
const fetchUserList = async () => {
  try {
    const res = await getUserList({ pageSize: 100 })
    userList.value = res.list || []
  } catch (error) {
    console.error('获取用户列表失败', error)
  }
}

const handleSubmit = async () => {
  await formRef.value?.validate()

  // 构建审批人配置
  const approvers = formData.approvers
    .map((approverId, index) => ({
      level: index + 1,
      approverId
    }))
    .filter(item => item.approverId)

  const submitData = {
    ...formData,
    type: ApplicationType.EXPENSE,
    approvers
  }

  if (props.type === 'add') {
    await addApplication(submitData)
    ElMessage.success('添加成功')
  } else {
    await updateApplication({ id: props.form.id, ...submitData })
    ElMessage.success('修改成功')
  }

  dialogVisible.value = false
  emit('refresh')
}

watch(
  () => props.dialog,
  val => {
    if (val) {
      fetchUserList()
      if (props.type === 'edit') {
        Object.assign(formData, props.form)
      }
    }
  },
  { immediate: true }
)
</script>
