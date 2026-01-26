<template>
  <el-dialog
    :model-value="dialog"
    @update:model-value="val => emit('update:dialog', val)"
    :title="type === 'add' ? '新增' : '编辑'"
    width="600"
    draggable
  >
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
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { addSoftware, updateSoftware } from '@/api'
import type { FormInstance } from 'element-plus'

const props = defineProps(['dialog', 'form', 'type'])
const emit = defineEmits(['update:dialog', 'refresh'])
const formRef = ref<FormInstance>()

const rules = {
  name: [{ required: true, message: '请输入软件名称', trigger: 'blur' }],
  version: [{ required: true, message: '请输入版本号', trigger: 'blur' }]
}

const localForm = ref({ ...props.form })

if (props.type === 'add') {
  localForm.value.testDevice = 'iPhone17'
  localForm.value.testSystem = 'iOS26.2'
}

watch(
  () => props.form,
  val => {
    localForm.value = { ...val }
  },
  { deep: true }
)

const handleCancel = () => {
  emit('update:dialog', false)
}

const handleConfirm = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async valid => {
    if (valid) {
      if (props.type === 'add') {
        await addSoftware(localForm.value)
        ElMessage.success('添加成功')
      } else {
        await updateSoftware(localForm.value)
        ElMessage.success('修改成功')
      }
      emit('update:dialog', false)
      emit('refresh')
    }
  })
}
</script>
