<template>
  <el-dialog v-model="dialogVisible" :title="type === 'add' ? '新增请假申请' : '编辑请假申请'" width="600px">
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="申请标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入申请标题" />
      </el-form-item>
      <el-form-item label="开始时间" prop="startTime">
        <el-date-picker
          v-model="formData.startTime"
          type="datetime"
          placeholder="选择开始时间"
          style="width: 100%"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker
          v-model="formData.endTime"
          type="datetime"
          placeholder="选择结束时间"
          style="width: 100%"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="时长(小时)">
        <el-input-number v-model="formData.duration" :min="0" :precision="1" disabled style="width: 100%" />
      </el-form-item>
      <el-form-item label="请假原因" prop="reason">
        <el-input v-model="formData.reason" type="textarea" :rows="3" placeholder="请输入请假原因" />
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
  startTime: '' as string | Date,
  endTime: '' as string | Date,
  duration: null as number | null,
  reason: '',
  totalLevels: 1,
  approvers: [] as number[]
})

const rules = {
  title: [{ required: true, message: '请输入申请标题', trigger: 'blur' }],
  startTime: [{ required: true, message: '请选择开始时间', trigger: 'change' }],
  endTime: [{ required: true, message: '请选择结束时间', trigger: 'change' }],
  reason: [{ required: true, message: '请输入请假原因', trigger: 'blur' }]
}

// 监听时间变化自动计算时长
watch(
  () => [formData.startTime, formData.endTime],
  ([startTime, endTime]) => {
    if (startTime && endTime) {
      const start = new Date(startTime).getTime()
      const end = new Date(endTime).getTime()
      if (end > start) {
        formData.duration = Number(((end - start) / (1000 * 60 * 60)).toFixed(1))
      }
    }
  }
)

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
    type: ApplicationType.LEAVE,
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

<style scoped>
.ml-2 {
  margin-left: 8px;
}
.text-gray-500 {
  color: #6b7280;
}
</style>
