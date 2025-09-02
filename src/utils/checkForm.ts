import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'

let msg: any = null

/**
 * 表单验证函数
 * @param formEl 表单实例
 * @param checkCompleted 验证成功后的回调函数
 * @returns Promise<void>
 */
async function checkForm(formEl: FormInstance, checkCompleted: () => void): Promise<void> {
  if (!formEl) return

  await formEl.validate((valid, fields) => {
    if (valid) {
      checkCompleted()
    } else if (fields) {
      // 关闭之前的消息提示（避免消息堆叠）
      if (msg) msg.close()

      // 获取第一个字段的第一条错误消息
      const firstField = Object.keys(fields)[0]
      const errorMessage = fields[firstField][0].message

      // 显示错误消息
      msg = ElMessage({
        message: errorMessage,
        type: 'error',
        duration: 1500
      })
    }
  })
}

export default checkForm
