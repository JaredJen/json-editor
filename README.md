![Banner](/docs/banner.jpg)

# JSON Editor

我非常喜欢[UTools 的 json 编辑器](https://www.u-tools.cn/plugins/detail/JSON%20%E7%BC%96%E8%BE%91%E5%99%A8/)，但是不想为了它安装整个 UTools，所以在网页端模仿重新实现了它

基于 Monaco Editor 构建，提供 JSON 格式化、转换和编辑功能。

支持注释
![示例](/docs/example.jpg)

支持多行操作语句
![示例2](/docs/example2.jpg)

## ✨ 功能特性

- 📝 **双编辑器布局** - 左侧编辑区，右侧格式化预览区
- 🎨 **Monaco Editor** - 使用 VS Code 同款编辑器，提供优秀的编辑体验
- 🔧 **JSON 格式化** - 一键格式化 JSON 代码
- 📂 **展开/收起** - 支持代码块的展开和收起操作
- 💬 **支持注释** - 支持带注释的 JSON（JSONC）格式
- 🔄 **动态提取** - 通过表达式动态提取 JSON 数据（如 `list[0]`、`user.name` 等）
- 📋 **TypeScript 接口生成** - 一键将 JSON 转换为 TypeScript 接口定义
- 🗜️ **压缩复制** - 压缩 JSON 并复制到剪贴板
- 🌙 **深色主题** - 内置深色主题，保护眼睛

## 🛠️ 技术栈

- **构建工具**: Vite
- **编辑器**: Monaco Editor
- **前端框架**: Alpine.js
- **样式框架**: Tailwind CSS
- **语言**: TypeScript
- **依赖库**:
  - `json-to-ts` - JSON 转 TypeScript 接口
  - `strip-json-comments` - 支持 JSON 注释解析

## 📦 安装

```bash
# 使用 pnpm 安装依赖
pnpm install
```

## 🚀 运行

```bash
# 开发模式
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview
```

## 🚢 部署

### GitHub Pages 自动部署

项目已配置 GitHub Actions，当代码推送到 `main` 或 `master` 分支时会自动构建并部署到 GitHub Pages。

**首次部署步骤：**

1. 在 GitHub 仓库设置中启用 GitHub Pages：

   - 进入仓库的 `Settings` → `Pages`
   - 在 `Source` 中选择 `GitHub Actions`

2. 推送代码到 `main` 或 `master` 分支：

   ```bash
   git push origin main
   ```

3. 等待 GitHub Actions 完成构建和部署（可在 `Actions` 标签页查看进度）

4. 部署完成后，访问 `https://你的用户名.github.io/json-editor/` 即可查看在线版本

**手动触发部署：**

在 GitHub 仓库的 `Actions` 标签页中，选择 `Build and Deploy to GitHub Pages` 工作流，点击 `Run workflow` 即可手动触发部署。

## 📖 使用说明

### 基本操作

1. **编辑 JSON** - 在左侧编辑器中输入或粘贴 JSON 代码
2. **格式化** - 点击工具栏的"格式化"按钮（或使用快捷键）格式化代码
3. **展开/收起** - 使用"展开所有"或"收起所有"按钮控制代码折叠

### 动态提取数据

在底部输入框中输入 JavaScript 表达式来提取 JSON 数据：

- `list[0]` - 获取数组第一个元素
- `user.name` - 获取对象的属性
- `items.filter(item => item.active)` - 使用数组方法过滤

提取的结果会显示在右侧编辑器中。

### 复制功能

- **复制为 TS 接口** - 将 JSON 转换为 TypeScript 接口定义并复制到剪贴板
- **压缩复制** - 将 JSON 压缩为单行并复制到剪贴板

## 📁 项目结构

```
json-editor/
├── index.html              # 入口 HTML 文件
├── package.json            # 项目配置和依赖
├── vite.config.js          # Vite 配置
├── tailwind.config.js      # Tailwind CSS 配置
├── tsconfig.json           # TypeScript 配置
├── public/                 # 静态资源
│   ├── format.svg          # 格式化图标
│   ├── expand.svg          # 展开图标
│   ├── collapse.svg        # 收起图标
│   ├── compress.svg        # 压缩图标
│   ├── discomment.svg      # 取消注释图标
│   └── typescript.svg      # TypeScript 图标
└── src/
    ├── css/
    │   └── index.css       # 样式文件
    └── scripts/
        ├── index.ts        # 入口文件
        ├── editor.ts       # Monaco Editor 配置
        ├── store.ts        # Alpine.js 状态管理
        ├── type.d.ts       # TypeScript 类型定义
        └── tools/
            ├── parse.ts    # JSON 解析工具
            └── add2Clipboard.ts  # 剪贴板工具
```

## 🎯 主要功能实现

### JSON 解析

项目使用自定义的 `parse` 函数解析 JSON，支持带注释的 JSON 格式。

### Monaco Editor 配置

- 启用 JSON 语言支持
- 配置深色主题
- 支持格式化、折叠等操作
- 允许 JSON 注释（通过 `monaco.json.jsonDefaults.setDiagnosticsOptions`）

### 状态管理

使用 Alpine.js 的 store 功能管理全局状态，包括：

- 格式化表达式字符串
- 格式化结果
- 编辑器显示状态
- 工具栏按钮配置

## 📝 开发说明

项目使用 TypeScript 开发，确保类型安全。主要编辑逻辑集中在 `src/scripts/store.ts` 中，通过 Alpine.js 的响应式系统实现 UI 更新。

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源协议。

Copyright (c) 2024 JSON Editor Contributors
