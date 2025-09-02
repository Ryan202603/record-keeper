<template>
  <div class="operation-bar">
    <div class="button-area">
      <template v-for="button in buttons" :key="button.label">
        <el-button :type="button.type" :icon="button.icon" @click="button.onClick()">
          {{ button.label }}
        </el-button>
      </template>
    </div>

    <div class="search-area">
      <el-form :model="formData" :inline="true" class="search-form" v-if="formItems && formItems.length">
        <template v-for="item in formItems" :key="item.prop">
          <el-form-item v-if="item.type === 'input'">
            <el-input v-model="formData[item.prop]" :placeholder="item.placeholder" clearable />
          </el-form-item>

          <el-form-item v-else-if="item.type === 'select'">
            <el-select v-model="formData[item.prop]" :placeholder="item.placeholder" clearable>
              <el-option v-for="(option, i) in item.options" :key="i" :label="option.label" :value="option.value" />
            </el-select>
          </el-form-item>

          <el-form-item v-else-if="item.type === 'date'">
            <el-date-picker
              v-model="formData[item.prop]"
              :type="item.dateType || 'date'"
              :placeholder="item.placeholder"
              clearable
            />
          </el-form-item>

          <el-form-item v-else-if="item.type === 'daterange'">
            <el-date-picker
              v-model="formData[item.prop]"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              clearable
            />
          </el-form-item>
        </template>

        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'

const props = defineProps<{
  buttons: OperationButton[]
  formItems?: OperationForm[]
}>()

const emits = defineEmits<{
  search: [formData: Record<string, any>]
}>()

// 创建表单数据对象
const formData = reactive(
  (props.formItems ?? []).reduce((acc: Record<string, any>, item) => {
    acc[item.prop] = ''
    return acc
  }, {} as Record<string, any>)
)

const handleSearch = () => {
  emits('search', formData)
}
</script>

<style lang="scss" scoped>
.operation-bar {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .button-area {
    display: flex;
    align-items: center;
  }

  .search-area {
    flex: 1;

    .search-form {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;

      .el-form-item {
        margin-right: 10px;
        margin-bottom: 0;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .operation-bar {
    flex-direction: column;

    .button-area,
    .search-area {
      width: 100%;
    }
  }
}
</style>
