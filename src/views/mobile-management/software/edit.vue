<template>
  <el-dialog v-model="dialogVisible" :title="type === 'add' ? '新增' : '编辑'" width="600" draggable>
    <el-form ref="formRef" :model="localForm" label-width="100px" :rules="rules">
      <el-form-item label="软件名称" prop="name">
        <el-input v-model="localForm.name" placeholder="请输入软件名称" />
      </el-form-item>
      <el-form-item label="版本" prop="version">
        <el-input v-model="localForm.version" placeholder="请输入版本号" />
      </el-form-item>
      <el-form-item label="测试手机" prop="testDevice">
        <el-input v-model="localForm.testDevice" placeholder="请输入测试手机型号" />
      </el-form-item>
      <el-form-item label="测试系统" prop="testSystem">
        <el-input v-model="localForm.testSystem" placeholder="请输入测试系统版本" />
      </el-form-item>
      <el-form-item label="特点" prop="features">
        <el-input v-model="localForm.features" type="textarea" :rows="3" placeholder="请输入软件特点" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="loading" @click="handleConfirm">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { addSoftware, updateSoftware } from '@/api'
import type { FormInstance, FormRules } from 'element-plus'

// 表单数据接口定义
interface SoftwareForm {
  id?: number
  name: string
  version: string
  testDevice: string
  testSystem: string
  features: string
}

// Props 类型定义 (Vue 3.5+ 响应式解构)
interface Props {
  form: SoftwareForm
  type: 'add' | 'edit'
}

const { form, type } = defineProps<Props>()

// Emits 类型定义 (Named tuple syntax 3.3+)
const emit = defineEmits<{
  refresh: []
}>()

// 使用 defineModel 简化 v-model 双向绑定 (3.4+)
const dialogVisible = defineModel<boolean>('dialog', { required: true })

const formRef = ref<FormInstance>()
const loading = ref(false)

// 表单验证规则
const rules: FormRules<SoftwareForm> = {
  name: [{ required: true, message: '请输入软件名称', trigger: 'blur' }],
  version: [{ required: true, message: '请输入版本号', trigger: 'blur' }]
}

// 本地表单数据
const localForm = ref<SoftwareForm>({ ...form })

// 新增时设置默认值
if (type === 'add') {
  localForm.value.testDevice = 'iPhone17'
  localForm.value.testSystem = 'iOS26.2'
}

// 监听表单数据变化 (使用 getter 包装解构的 props)
watch(
  () => form,
  val => {
    localForm.value = { ...val }
  },
  { deep: true }
)

// 提交表单
const handleConfirm = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async valid => {
    if (!valid) return

    loading.value = true
    try {
      if (type === 'add') {
        await addSoftware(localForm.value)
        ElMessage.success('添加成功')
      } else {
        await updateSoftware(localForm.value)
        ElMessage.success('修改成功')
      }
      dialogVisible.value = false
      emit('refresh')
    } finally {
      loading.value = false
    }
  })
}
</script>
