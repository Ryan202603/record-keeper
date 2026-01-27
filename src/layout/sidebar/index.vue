<template>
  <el-scrollbar :style="{ minWidth: isCollapse ? '64px' : '200px' }">
    <el-menu
      :collapse="isCollapse"
      text-color="#999"
      active-text-color="#3a93ef"
      background-color="#2d2a2e"
      :default-active="$route.path"
      router
    >
      <template v-for="item in filteredRouter" :key="item.meta.title">
        <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>{{ item.meta.title }}</span>
          </template>
          <el-menu-item v-for="itemz of item.children" :key="itemz.meta.title" :index="`/${item.path}/${itemz.path}`">
            {{ itemz.meta.title }}
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item v-else :index="`/${item.path}`">
          <el-icon><Setting /></el-icon>
          <template #title>
            <span>{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script setup>
import { computed } from 'vue'
import { Setting } from '@element-plus/icons-vue'
import { useUserInfo } from '@/hooks'

const { isCollapse, menus } = useUserInfo()

const filteredRouter = computed(() => {
  return menus.value
})
</script>

<style scoped lang="scss">
.el-menu {
  border: none;
}

.el-scrollbar {
  min-width: 64px;
  height: 100vh;
  background-color: #2d2a2e;
  transition: all 0.3s ease-in-out;
}
</style>
