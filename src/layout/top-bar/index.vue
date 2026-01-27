<template>
  <div class="wrapper">
    <div class="top">
      <div class="left">
        <el-icon @click="toggleCollapse" size="20">
          <Expand v-if="isCollapse" />
          <Fold v-else />
        </el-icon>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index">
            {{ item.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="right">
        <el-button @click="logout">退出登录</el-button>
      </div>
    </div>
    <div class="bottom">
      <Tabs
        :list="historyMenus"
        :active="item => item.path === route.path"
        @handleClick="handleClickTag"
        @close="removeHistoryTag"
      />
    </div>
  </div>
</template>

<script setup>
import Tabs from 'v3-tabs'
import { useUserInfo } from '@/hooks'
import { logoutApi } from '@/api/login'
import { Expand, Fold, Close, ArrowDown } from '@element-plus/icons-vue'

const { toggleCollapse, isCollapse, userInfo, clearUserInfo } = useUserInfo()
const route = useRoute()
const router = useRouter()
const historyMenus = ref([])

const logout = () => {
  ElMessageBox.confirm('确定要退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    logoutApi()
    clearUserInfo()
    router.push('/login')
    ElMessage.success('退出登录成功')
  })
}

const breadcrumbs = computed(() => {
  return route.matched
    .filter(item => item.meta && item.meta.title)
    .map(item => ({
      title: item.meta.title,
      path: item.path
    }))
})

const handleClickTag = item => {
  if (route.path !== item.path) {
    router.push(item.path)
  }
}

const removeHistoryTag = index => {
  const isActiveTag = route.path === historyMenus.value[index].path

  // 删除标签
  historyMenus.value.splice(index, 1)

  // 更新本地存储
  localStorage.setItem('historyMenus', JSON.stringify(historyMenus.value))

  // 如果删除的是当前活动标签，则跳转到前一个标签或第一个标签
  if (isActiveTag && historyMenus.value.length > 0) {
    const targetIndex = index > 0 ? index - 1 : 0
    router.push(historyMenus.value[targetIndex].path)
  }
}

watch(
  () => route.path,
  () => {
    // 只处理有标题的路由
    if (route.meta && route.meta.title) {
      // 检查是否已存在于历史记录中
      const exists = historyMenus.value.some(item => item.path === route.path)

      if (!exists) {
        // 添加到历史记录
        historyMenus.value.push({
          name: route.meta.title,
          title: route.meta.title,
          path: route.path
        })

        // 保存到本地存储
        localStorage.setItem('historyMenus', JSON.stringify(historyMenus.value))
      }
    }
  },
  { immediate: true }
)

onMounted(() => {
  const savedHistory = localStorage.getItem('historyMenus')
  if (savedHistory) {
    historyMenus.value = JSON.parse(savedHistory)
  }
})
</script>

<style scoped lang="scss">
.wrapper {
  height: 80px;
  border-bottom: 1px solid #e4e7ed;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.top {
  display: flex;
  align-items: center;
  padding: 5px 20px;
  height: 42px;
  justify-content: space-between;
  box-sizing: border-box;
  .left {
    display: flex;
    align-items: center;
    .el-breadcrumb {
      margin-left: 20px;
    }
  }

  .right {
    .avatar-wrapper {
      /* 保留现有样式 */
      &:focus {
        outline: none;
      }
    }
  }
  .avatar-wrapper {
    position: relative;

    .user-avatar {
      cursor: pointer;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid #dcdfe6;
    }

    .user-nickname {
      position: relative;
      bottom: 10px;
      font-size: 14px;
      margin-left: 10px;
      font-weight: bold;
    }
  }
}
.bottom {
  border-top: 1px solid #e4e7ed;
  padding: 0 20px;
  flex: 1;
}
</style>
