<template>
  <el-dialog v-model="dialogVisible" :title="type === 'add' ? '新增食物' : '编辑食物'" width="600" draggable>
    <el-form ref="formRef" :model="localForm" label-width="100px" :rules="rules">
      <el-form-item label="食物名称" prop="name">
        <el-input v-model="localForm.name" placeholder="请输入食物名称" />
      </el-form-item>
      <el-form-item label="类别" prop="category">
        <el-select v-model="localForm.category" placeholder="请选择类别" clearable>
          <el-option label="蔬菜" value="蔬菜" />
          <el-option label="水果" value="水果" />
          <el-option label="水产" value="水产" />
          <el-option label="肉类" value="肉类" />
          <el-option label="茶" value="茶" />
          <el-option label="坚果" value="坚果" />
          <el-option label="豆类" value="豆类" />
          <el-option label="蛋类" value="蛋类" />
          <el-option label="其他" value="其他" />
        </el-select>
      </el-form-item>
      <el-form-item label="季节" prop="season">
        <el-select v-model="localForm.season" placeholder="请选择季节" clearable>
          <el-option label="春季" value="春季" />
          <el-option label="夏季" value="夏季" />
          <el-option label="秋季" value="秋季" />
          <el-option label="冬季" value="冬季" />
          <el-option label="四季" value="四季" />
        </el-select>
      </el-form-item>
      <el-form-item label="封面图" prop="cover">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :http-request="uploadImage"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="localForm.cover" :src="localForm.cover" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="localForm.desc" type="textarea" placeholder="请输入描述" />
      </el-form-item>
      <el-form-item label="营养价值" prop="nutrition">
        <el-input v-model="localForm.nutrition" type="textarea" placeholder="请输入营养价值" />
      </el-form-item>
      <el-form-item label="挑选技巧" prop="tips">
        <el-input v-model="localForm.tips" type="textarea" placeholder="请输入挑选技巧" />
      </el-form-item>
      <el-form-item label="推荐搭配" prop="pairings">
        <el-input v-model="localForm.pairings" type="textarea" placeholder="请输入推荐搭配" />
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
import { createFood, updateFood, uploadFile } from '@/api'
import { Plus } from '@element-plus/icons-vue'
import type { FormInstance, FormRules, UploadProps } from 'element-plus'

interface FoodForm {
  id?: number
  name?: string
  cover?: string
  desc?: string
  season?: string
  category?: string
  nutrition?: string
  tips?: string
  pairings?: string
}

interface Props {
  form: FoodForm
  type: 'add' | 'edit'
}

const props = defineProps<Props>()

const emit = defineEmits<{
  refresh: []
}>()

const dialogVisible = defineModel<boolean>('dialog', { required: true })

const formRef = ref<FormInstance>()
const loading = ref(false)

const rules: FormRules<FoodForm> = {
  name: [{ required: true, message: '食物名称不能为空', trigger: 'blur' }],
  category: [{ required: true, message: '类别不能为空', trigger: 'change' }],
  season: [{ required: true, message: '季节不能为空', trigger: 'change' }]
}

const localForm = ref<FoodForm>({ ...props.form })

const beforeAvatarUpload: UploadProps['beforeUpload'] = rawFile => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('Avatar picture must be JPG/PNG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const uploadImage = async (options: any) => {
  const { file } = options
  const formData = new FormData()
  formData.append('file', file)
  const res = await uploadFile(formData)
  localForm.value.cover = res.data
}

watch(
  () => props.form,
  val => {
    localForm.value = { ...val }
  },
  { deep: true }
)

const handleConfirm = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async valid => {
    if (!valid) return

    loading.value = true
    try {
      if (props.type === 'add') {
        await createFood(localForm.value)
        ElMessage.success('新增成功')
      } else {
        if (!localForm.value.id) throw new Error('ID is missing for update')
        await updateFood(localForm.value.id, localForm.value)
        ElMessage.success('修改成功')
      }
      dialogVisible.value = false
      emit('refresh')
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  })
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar {
  width: 175px;
  height: 262px;
  display: block;
}
</style>
