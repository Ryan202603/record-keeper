// 用法'yyyy-mm-dd HH:MM:SS'
function dateFormat(date: Date | string, fmt = 'yyyy-mm-dd'): string {
  let dateObj: Date

  if (date instanceof Date) {
    dateObj = date
  } else {
    // 优先尝试直接转换 (支持 ISO 8601 如 2026-03-02T05:43:07.112Z)
    dateObj = new Date(date)

    // 如果无效，尝试解决 Safari 兼容性问题 (YYYY-MM-DD 替换为 YYYY/MM/DD)
    if (isNaN(dateObj.getTime()) && typeof date === 'string' && date.includes('-')) {
      dateObj = new Date(date.replace(/-/g, '/'))
    }

    // 再次检查日期是否有效
    if (isNaN(dateObj.getTime())) {
      return fmt // 返回原始格式
    }
  }

  let ret
  const opt: Record<string, string> = {
    'y+': dateObj.getFullYear().toString(), // 年
    'm+': (dateObj.getMonth() + 1).toString(), // 月
    'd+': dateObj.getDate().toString(), // 日
    'H+': dateObj.getHours().toString(), // 时
    'M+': dateObj.getMinutes().toString(), // 分
    'S+': dateObj.getSeconds().toString() // 秒
  }

  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'))
    }
  }

  return fmt
}

export default dateFormat
