<template>
  <el-dialog
    :model-value="dialog"
    @update:model-value="val => emit('update:dialog', val)"
    :title="type === 'add' ? '新增' : '编辑'"
    width="600"
    draggable
  >
    <el-form :inline="true" :model="localForm" label-width="80px" :rules="rules">
      <el-form-item label="用户昵称" prop="nickName">
        <el-input v-model="localForm.nickName" />
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="localForm.phone" maxlength="11" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="localForm.email" />
      </el-form-item>
      <el-form-item label="用户性别">
        <el-select v-model="localForm.sex" placeholder="请选择性别">
          <el-option label="男" value="1" />
          <el-option label="女" value="0" />
        </el-select>
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
import { addUser, updateUser } from '@/api'

const props = defineProps(['dialog', 'form', 'type'])
const emit = defineEmits(['update:dialog', 'refresh'])

const rules = {
  nickName: [{ required: true, message: '请输入用户昵称', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  email: [{ type: 'email' as const, message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]
}

const localForm = ref({ ...props.form })

const handleCancel = () => {
  emit('update:dialog', false)
}

const handleConfirm = async () => {
  const params = { ...localForm.value }
  if (props.type === 'edit') {
    await updateUser(params)
  } else {
    await addUser(params)
  }
  emit('refresh')
  emit('update:dialog', false)
}
</script>
