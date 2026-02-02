<template>
  <el-dialog v-model="dialogVisible" title="审批详情" width="700px">
    <div v-if="application">
      <!-- 申请信息 -->
      <el-descriptions title="申请信息" :column="2" border>
        <el-descriptions-item label="申请标题">{{ application.title }}</el-descriptions-item>
        <el-descriptions-item label="申请类型">
          <el-tag>{{ typeMap[application.type]?.label }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="申请人">{{ application.applicantName }}</el-descriptions-item>
        <el-descriptions-item label="申请时间">{{ application.createTime }}</el-descriptions-item>
        <el-descriptions-item label="当前状态">
          <el-tag :type="statusMap[application.status]?.type">
            {{ statusMap[application.status]?.label }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="审批进度">
          {{ application.currentLevel }}/{{ application.totalLevels }}
        </el-descriptions-item>
        <!-- 费用申请特有 -->
        <el-descriptions-item v-if="application.amount" label="金额(元)">
          {{ application.amount }}
        </el-descriptions-item>
        <!-- 请假/加班特有 -->
        <el-descriptions-item v-if="application.startTime" label="开始时间">
          {{ application.startTime }}
        </el-descriptions-item>
        <el-descriptions-item v-if="application.endTime" label="结束时间">
          {{ application.endTime }}
        </el-descriptions-item>
        <el-descriptions-item v-if="application.duration" label="时长(小时)">
          {{ application.duration }}
        </el-descriptions-item>
        <el-descriptions-item label="申请原因" :span="2">
          {{ application.reason || '无' }}
        </el-descriptions-item>
      </el-descriptions>

      <!-- 审批流程 -->
      <div class="mt-4">
        <h4 class="mb-2">审批流程</h4>
        <el-timeline>
          <el-timeline-item
            v-for="record in application.approvalRecords"
            :key="record.id"
            :type="getTimelineType(record.status)"
            :hollow="record.status === 'pending'"
          >
            <div class="flex justify-between items-center">
              <div>
                <span class="font-bold">第{{ record.level }}级审批</span>
                <span v-if="record.approverName" class="ml-2 text-gray-500">审批人: {{ record.approverName }}</span>
              </div>
              <el-tag :type="statusMap[record.status]?.type" size="small">
                {{ statusMap[record.status]?.label }}
              </el-tag>
            </div>
            <div v-if="record.remark" class="mt-1 text-gray-500">审批意见: {{ record.remark }}</div>
            <div v-if="record.approvalTime" class="mt-1 text-gray-400 text-sm">
              {{ record.approvalTime }}
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>

      <!-- 审批操作（仅当状态为待审批或审批中时显示） -->
      <div v-if="canApprove" class="mt-4">
        <el-divider />
        <el-form ref="formRef" :model="approvalForm" label-width="80px">
          <el-form-item label="审批意见">
            <el-input v-model="approvalForm.remark" type="textarea" :rows="3" placeholder="请输入审批意见（可选）" />
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="handleApprove('approved')">
              <el-icon><Check /></el-icon>
              通过
            </el-button>
            <el-button type="danger" @click="handleApprove('rejected')">
              <el-icon><Close /></el-icon>
              驳回
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <template #footer>
      <el-button @click="dialogVisible = false">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { Check, Close } from '@element-plus/icons-vue'
import { approveApplication } from '@/api'

const props = defineProps<{
  dialog: boolean
  application: any
}>()

const emit = defineEmits(['update:dialog', 'refresh'])

const dialogVisible = computed({
  get: () => props.dialog,
  set: val => emit('update:dialog', val)
})

const typeMap: Record<string, { label: string; color: 'primary' | 'success' | 'warning' }> = {
  expense: { label: '费用申请', color: 'primary' },
  leave: { label: '请假申请', color: 'success' },
  overtime: { label: '加班申请', color: 'warning' }
}

const statusMap: Record<string, { label: string; type: 'warning' | 'info' | 'success' | 'danger' }> = {
  pending: { label: '待审批', type: 'warning' },
  in_progress: { label: '审批中', type: 'info' },
  approved: { label: '已通过', type: 'success' },
  rejected: { label: '已驳回', type: 'danger' }
}

const approvalForm = reactive({
  remark: ''
})

// 是否可以审批
const canApprove = computed(() => {
  return props.application?.status === 'pending' || props.application?.status === 'in_progress'
})

const getTimelineType = (status: string): 'primary' | 'success' | 'warning' | 'danger' | 'info' => {
  const map: Record<string, 'primary' | 'success' | 'warning' | 'danger' | 'info'> = {
    pending: 'info',
    in_progress: 'warning',
    approved: 'success',
    rejected: 'danger'
  }
  return map[status] || 'info'
}

const handleApprove = async (status: 'approved' | 'rejected') => {
  const actionText = status === 'approved' ? '通过' : '驳回'

  try {
    await ElMessageBox.confirm(`确认${actionText}该申请？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })

    await approveApplication(props.application.id, {
      status,
      remark: approvalForm.remark
    })

    ElMessage.success(`${actionText}成功`)
    dialogVisible.value = false
    emit('refresh')
  } catch (error) {
    // 用户取消操作
  }
}
</script>

<style scoped>
.mt-4 {
  margin-top: 16px;
}
.mt-2 {
  margin-top: 8px;
}
.mt-1 {
  margin-top: 4px;
}
.mb-2 {
  margin-bottom: 8px;
}
.ml-2 {
  margin-left: 8px;
}
.flex {
  display: flex;
}
.justify-between {
  justify-content: space-between;
}
.items-center {
  align-items: center;
}
.font-bold {
  font-weight: bold;
}
.text-gray-400 {
  color: #9ca3af;
}
.text-gray-500 {
  color: #6b7280;
}
.text-sm {
  font-size: 0.875rem;
}
</style>
