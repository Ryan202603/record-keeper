# Record Keeper

一个无需后台的纯前端数据记录管理系统，使用本地 JSON 文件存储数据，支持日常记录

## 功能特点

- **纯前端架构**：无需服务器，直接在本地运行。
- **本地数据存储**：数据存储在项目内的 `localData/db.json` 文件中，无需数据库。
- **用户管理**：支持添加、编辑、删除用户记录。
- **分页查询**：支持数据分页、搜索和过滤。
- **实时更新**：修改数据后自动保存到本地文件。

## 环境要求

- **Node.js**: `23.8.0` 或更高版本
- **pnpm**: `10.4.1` 或更高版本

## 安装步骤

1. 克隆项目：

   ```bash
   git clone <https://github.com/1want/record-keeper.git>
   cd record-keeper
   ```

2. 安装依赖：

   ```bash
   pnpm install
   ```

3. 启动项目：

   ```bash
   pnpm run dev
   ```

## 许可证

MIT License
