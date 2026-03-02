<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <div class="card-header" style="display: flex; justify-content: space-between; align-items: center">
          <span>角色管理</span>
          <el-button type="primary" @click="handleAdd">新增角色</el-button>
        </div>
      </template>

      <el-table :data="roleList" border v-loading="loading">
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="description" label="描述" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button link type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button link type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :title="dialogTitle" v-model="dialogVisible" width="600px" @close="resetForm">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="form.description" type="textarea" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item label="菜单权限">
          <el-tree
            ref="treeRef"
            :data="routerData"
            :props="defaultProps"
            show-checkbox
            node-key="name"
            default-expand-all
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { getRoleList, addRole, updateRole, deleteRole } from '@/api/system-management/role'
import userRouters from '@/router/userRouters'

// 类型定义
interface Role {
  id?: string
  name: string
  description?: string
  permissions: string[] // 存储路由的 name
}

const loading = ref(false)
const dialogVisible = ref(false)
const dialogTitle = ref('')
const formRef = ref<FormInstance>()
const treeRef = ref()

// 角色列表数据（Mock数据，实际应从API获取）
const roleList = ref<Role[]>([])

// 路由数据作为权限树的数据源
const routerData = userRouters
const defaultProps = {
  children: 'children',
  label: (data: any) => data.meta?.title || data.name
}

const form = reactive<Role>({
  name: '',
  description: '',
  permissions: []
})

const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
})

const getList = async () => {
  loading.value = true
  const res: any = await getRoleList()
  // 假设后端返回的数据就是Role数组
  roleList.value = res
  loading.value = false
}

const handleAdd = () => {
  dialogTitle.value = '新增角色'
  dialogVisible.value = true
  // 重置表单在 @close 中处理
}

const handleEdit = (row: Role) => {
  dialogTitle.value = '编辑角色'
  dialogVisible.value = true
  const checkedKeys = row.permissions.filter(key => isLeafNode(key, userRouters))

  nextTick(() => {
    Object.assign(form, row)
    // 设置树的选中状态
    treeRef.value?.setCheckedKeys(checkedKeys)
  })
}

// 辅助函数：判断是否为叶子节点
const isLeafNode = (key: string, routers: any[]): boolean => {
  for (const router of routers) {
    if (router.name === key) {
      // 找到了节点，检查是否有 children
      return !router.children || router.children.length === 0
    }
    if (router.children && router.children.length > 0) {
      // 递归查找，如果找到并且是叶子节点，返回 true
      if (isLeafNode(key, router.children)) {
        return true
      }
    }
  }
  return false
}

const handleDelete = (row: Role) => {
  ElMessageBox.confirm('确认删除该角色吗?', '提示', {
    type: 'warning'
  }).then(async () => {
    if (row.id) {
      await deleteRole(row.id)
      ElMessage.success('删除成功')
      getList()
    }
  })
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async valid => {
    if (valid) {
      // 获取选中的节点和半选中的节点
      const checkedKeys = treeRef.value?.getCheckedKeys() || []
      const halfCheckedKeys = treeRef.value?.getHalfCheckedKeys() || []
      const allPermissions = [...checkedKeys, ...halfCheckedKeys]

      form.permissions = allPermissions

      try {
        if (form.id) {
          await updateRole(form.id, form)
          ElMessage.success('修改成功')
        } else {
          await addRole(form)
          ElMessage.success('新增成功')
        }
        dialogVisible.value = false
        getList()
      } catch (error) {
        // Error info is handled by request interceptor usually
      }
    }
  })
}

const resetForm = () => {
  if (formRef.value) formRef.value.resetFields()
  form.id = undefined
  form.name = ''
  form.description = ''
  form.permissions = []
  if (treeRef.value) treeRef.value.setCheckedKeys([])
}

onMounted(() => {
  getList()
})
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
