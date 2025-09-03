import type { AxiosRequestConfig } from 'axios'

// 模拟的 request 函数
function request<T = any>(option: AxiosRequestConfig): Promise<T> {
  return new Promise((resolve, reject) => {
    const { url, method = 'get', data, params } = option
    const key = url?.split('/')[0] // 使用 'users' 作为 localStorage 的 key

    if (!key) {
      return reject(new Error('Invalid URL for localStorage operation'))
    }

    // 模拟异步请求
    setTimeout(() => {
      try {
        const storedData = localStorage.getItem(key)
        let items = storedData ? JSON.parse(storedData) : []

        switch (method.toLowerCase()) {
          case 'post': // 新增 (addUser)
            {
              // 为新数据创建一个唯一的 ID
              const newItem = { ...data, id: Date.now() }
              items.push(newItem)
              localStorage.setItem(key, JSON.stringify(items))
              // 模拟成功创建后返回新创建的数据
              resolve({ data: newItem } as any)
            }
            break

          case 'get': // 查询 (getUserList)
            {
              // 简单模拟参数查询，这里只返回所有数据
              // 你可以根据 params 在这里实现更复杂的过滤、分页逻辑
              resolve({ data: items } as any)
            }
            break

          case 'put': // 修改 (updateUser)
            {
              const id = data.id
              const itemIndex = items.findIndex((item: any) => item.id === id)
              if (itemIndex > -1) {
                items[itemIndex] = { ...items[itemIndex], ...data }
                localStorage.setItem(key, JSON.stringify(items))
                resolve({ data: items[itemIndex] } as any)
              } else {
                reject(new Error('Item not found'))
              }
            }
            break

          case 'delete': // 删除 (delUser)
            {
              // 从 url 中提取 id, e.g., 'users/1678886400000'
              const id = parseInt(url?.split('/')[1] || '', 10)
              const filteredItems = items.filter((item: any) => item.id !== id)
              if (filteredItems.length < items.length) {
                localStorage.setItem(key, JSON.stringify(filteredItems))
                // 模拟成功删除返回空对象
                resolve({} as any)
              } else {
                reject(new Error('Item not found for deletion'))
              }
            }
            break

          default:
            reject(new Error(`Unsupported method: ${method}`))
        }
      } catch (error) {
        reject(error)
      }
    }, 50) // 模拟 50ms 的网络延迟
  })
}

export default request
