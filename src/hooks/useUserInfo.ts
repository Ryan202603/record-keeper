import { reactive, toRefs } from 'vue'

const state = reactive({
  isCollapse: false
})

export function useUserInfo() {
  // 切换侧边栏折叠状态
  const toggleCollapse = () => {
    state.isCollapse = !state.isCollapse
  }

  return {
    ...toRefs(state),
    toggleCollapse
  }
}
