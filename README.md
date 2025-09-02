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

   这将同时启动前端开发服务器（默认 `http://localhost:5173`）和本地数据服务器（`http://localhost:3001`）。

## 使用说明

- 访问前端页面进行数据操作（如添加用户、编辑记录）。
- 数据会自动保存到 `localData/db.json` 文件中。
- 支持分页、搜索等功能，无需刷新页面。

## 技术栈

- **前端框架**: Vue 3 + TypeScript
- **UI 组件**: Element Plus
- **构建工具**: Vite
- **本地服务器**: json-server
- **包管理**: pnpm

## 注意事项

- 数据仅存储在本地文件，关闭项目后数据仍保留。
- 如果 `db.json` 文件损坏，可手动修复 JSON 语法。
- 生产环境建议备份 `localData` 文件夹。

## 许可证

MIT License
