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
      <el-form-item label="归属公司" prop="ndid">
        <el-select v-model="localForm.ndid" placeholder="请选择公司" @change="handleChange">
          <el-option v-for="dept in companys" :key="dept.ndid" :label="dept.stName" :value="dept.ndid" />
        </el-select>
      </el-form-item>
      <el-form-item label="手机号码" prop="phonenumber">
        <el-input v-model="localForm.phonenumber" />
      </el-form-item>
      <el-form-item label="考勤地点" prop="wiid">
        <el-select v-model="localForm.wiid" placeholder="请选择考勤地点">
          <el-option v-for="dept in positions" :key="dept.wiid" :label="dept.alName" :value="dept.wiid" />
        </el-select>
      </el-form-item>
      <el-form-item label="用户名称" prop="userName">
        <el-input v-model="localForm.userName" :disabled="type === 'edit'" />
      </el-form-item>
      <el-form-item label="用户密码" prop="password">
        <el-input v-model="localForm.password" show-password :disabled="type === 'edit'" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="localForm.email" />
      </el-form-item>
      <el-form-item label="用户性别">
        <el-select v-model="localForm.sex" placeholder="请选择性别">
          <el-option label="男" value="1" />
          <el-option label="女" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="岗位">
        <el-select v-model="localForm.postIds" placeholder="请选择岗位" multiple>
          <el-option v-for="job in jobs" :key="job.postId" :label="job.postName" :value="job.postId" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="localForm.status">
          <el-radio value="0">启用</el-radio>
          <el-radio value="1">停用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="角色" prop="roleId">
        <el-select v-model="localForm.roleId" placeholder="请选择角色">
          <el-option v-for="role in roles" :key="role.roleId" :label="role.roleName" :value="role.roleId" />
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="localForm.remark" placeholder="请输入备注信息" />
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
// import { getSystemUsers, addUser, updateUser, getPositioningByCompany } from '@/api'

interface Role {
  roleId: number | string
  roleName: string
}

interface Job {
  postId: number | string
  postName: string
}

interface Company {
  ndid: number | string
  stName: string
}

interface Position {
  wiid: number | string
  alName: string
}

const props = defineProps(['dialog', 'form', 'type'])
const emit = defineEmits(['update:dialog', 'refresh'])

const roles: Ref<Role[]> = ref([])
const jobs: Ref<Job[]> = ref([])
const companys: Ref<Company[]> = ref([])
const positions: Ref<Position[]> = ref([])

const rules = {
  nickName: [{ required: true, message: '请输入用户昵称', trigger: 'blur' }],
  ndid: [{ required: true, message: '请选择归属公司', trigger: 'change' }],
  wiid: [{ required: true, message: '请选择考勤地点', trigger: 'change' }],
  phonenumber: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  email: [{ type: 'email' as const, message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
  userName: [
    { required: true, message: '请输入用户名称', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名称长度必须介于 2 和 20 之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入用户密码', trigger: 'blur' },
    { min: 5, max: 20, message: '用户密码长度必须介于 5 和 20 之间', trigger: 'blur' },
    { pattern: /^[^<>"'|\\]+$/, message: '不能包含非法字符：< > " \' \\\ |', trigger: 'blur' }
  ],
  roleId: [{ required: true, message: '请选择角色', trigger: 'change' }]
}

const localForm = ref({ ...props.form })

onMounted(() => {
  getSystemUsers().then(res => {
    roles.value = res.roles
    jobs.value = res.posts
    companys.value = res.companys
  })
  // 编辑时考勤地点的列表需要通过归属公司的选择获取
  if (props.type === 'edit') {
    handleChange(localForm.value.ndid)
  }
})

const handleChange = id => {
  getPositioningByCompany(id).then(res => {
    positions.value = res.data
  })
}

const handleCancel = () => {
  emit('update:dialog', false)
}

const handleConfirm = async () => {
  const params = { ...localForm.value }
  if (props.type === 'edit') {
    params.userId = localForm.value.userId
    await updateUser(params)
  } else {
    await addUser(params)
  }
  emit('refresh')
  emit('update:dialog', false)
}
</script>
