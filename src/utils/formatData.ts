// 用法'yyyy-mm-dd HH:MM:SS'
function dateFormat(fmt = 'yyyy-mm-dd', date: Date | string): string {
  let dateObj: Date

  if (date instanceof Date) {
    dateObj = date
  } else {
    dateObj = new Date(date.replace(/-/g, '/')) // 替换'-'为'/'，解决Safari兼容性问题

    // 检查日期是否有效
    if (isNaN(dateObj.getTime())) {
      console.warn('Invalid date string:', date)
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
