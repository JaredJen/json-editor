![Banner](/docs/banner.jpg)

# JSON Editor

我非常喜欢[UTools 的 json 编辑器](https://www.u-tools.cn/plugins/detail/JSON%20%E7%BC%96%E8%BE%91%E5%99%A8/)，但是不想为了它安装整个 UTools，所以在网页端模仿重新实现了它

基于 Monaco Editor 构建，提供 JSON 格式化、转换和编辑功能。

## 🌍 语言 / Language

- **[中文](#中文文档)** | [English](#english-documentation)\*\*

---

## 中文文档 {#中文文档}

支持注释
![示例](/docs/example.jpg)

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

### 动态提取数据详解

在底部输入框中输入安全的表达式来提取 JSON 数据。以下是所有支持的语法和详细示例：

#### 示例数据

为了更好地理解各个功能，我们将使用以下示例数据：

```json
{
  "name": "张三",
  "age": 28,
  "isActive": true,
  "hobbies": ["阅读", "编程", "运动"],
  "address": {
    "city": "北京",
    "district": "朝阳区",
    "coordinates": {
      "lat": 39.9,
      "lng": 116.4
    }
  },
  "users": [
    {
      "id": 1,
      "name": "Alice",
      "age": 25,
      "isActive": true,
      "role": "admin"
    },
    {
      "id": 2,
      "name": "Bob",
      "age": 30,
      "isActive": false,
      "role": "user"
    },
    {
      "id": 3,
      "name": "Charlie",
      "age": 28,
      "isActive": true,
      "role": "user"
    }
  ],
  "products": [
    {
      "id": 101,
      "name": "笔记本电脑",
      "price": 5999,
      "inStock": true
    },
    {
      "id": 102,
      "name": "无线鼠标",
      "price": 199,
      "inStock": false
    },
    {
      "id": 103,
      "name": "机械键盘",
      "price": 899,
      "inStock": true
    }
  ],
  "metadata": {
    "version": "1.0.0",
    "author": "developer",
    "tags": ["api", "v2", "stable"]
  }
}
```

#### 1. 基本属性访问

**点表示法访问对象属性**

| 表达式                    | 输出结果 | 说明                   |
| ------------------------- | -------- | ---------------------- |
| `name`                    | `"张三"` | 获取根对象的 name 属性 |
| `age`                     | `28`     | 获取根对象的 age 属性  |
| `address.city`            | `"北京"` | 获取嵌套对象的属性     |
| `address.coordinates.lat` | `39.9`   | 获取多层嵌套的属性     |

**方括号表示法访问数组元素**

| 表达式          | 输出结果 | 说明                        |
| --------------- | -------- | --------------------------- |
| `hobbies[0]`    | `"阅读"` | 获取数组第一个元素          |
| `hobbies[2]`    | `"运动"` | 获取数组第三个元素          |
| `users[0]`      | 完整对象 | 获取 users 数组的第一个对象 |
| `users[1].name` | `"Bob"`  | 获取第二个用户的 name 属性  |

**混合使用点表示法和方括号**

| 表达式              | 输出结果 | 说明                       |
| ------------------- | -------- | -------------------------- |
| `products[2].price` | `899`    | 获取第三个产品的价格       |
| `metadata.tags[1]`  | `"v2"`   | 获取 tags 数组的第二个元素 |

#### 2. 数组操作函数

**filter - 过滤数组**

语法：`filter(数组, 属性名)`

根据属性的值（真值判断）过滤数组。

| 表达式                        | 输出结果           | 说明                   |
| ----------------------------- | ------------------ | ---------------------- |
| `filter(users, "isActive")`   | `[Alice, Charlie]` | 过滤出所有活跃用户     |
| `filter(products, "inStock")` | 有库存的产品列表   | 过滤出所有有库存的产品 |

**map - 映射数组**

语法：`map(数组, 属性名)`

提取数组中每个元素的指定属性值。

| 表达式                   | 输出结果                    | 说明             |
| ------------------------ | --------------------------- | ---------------- |
| `map(users, "name")`     | `["Alice","Bob","Charlie"]` | 提取所有用户名   |
| `map(users, "age")`      | `[25,30,28]`                | 提取所有用户年龄 |
| `map(products, "price")` | `[5999,199,899]`            | 提取所有产品价格 |

**find - 查找元素**

语法：`find(数组, 属性名)`

查找数组中第一个具有指定属性的元素。

| 表达式                | 输出结果       | 说明                         |
| --------------------- | -------------- | ---------------------------- |
| `find(users, "role")` | Alice 完整对象 | 返回第一个有 role 属性的用户 |

**slice - 数组切片**

语法：`slice(数组, 开始索引, 结束索引?)`

| 表达式               | 输出结果         | 说明              |
| -------------------- | ---------------- | ----------------- |
| `slice(users, 0, 2)` | `[Alice, Bob]`   | 获取前 2 个用户   |
| `slice(users, -2)`   | `[Bob, Charlie]` | 获取最后 2 个用户 |

**first - 获取第一个元素**

| 表达式                 | 输出结果       | 说明                 |
| ---------------------- | -------------- | -------------------- |
| `first(users)`         | Alice 完整对象 | 获取第一个用户       |
| `first(products).name` | `"笔记本电脑"` | 获取第一个产品的名称 |

**last - 获取最后一个元素**

| 表达式                   | 输出结果         | 说明                       |
| ------------------------ | ---------------- | -------------------------- |
| `last(users)`            | Charlie 完整对象 | 获取最后一个用户           |
| `last(products).inStock` | `true`           | 获取最后一个产品的库存状态 |

#### 3. 对象操作函数

**length - 获取长度**

| 表达式             | 输出结果 | 说明                  |
| ------------------ | -------- | --------------------- |
| `length(users)`    | `3`      | users 数组的长度      |
| `length(metadata)` | `3`      | metadata 对象的属性数 |

**keys - 获取对象的所有键**

| 表达式          | 输出结果                            | 说明                  |
| --------------- | ----------------------------------- | --------------------- |
| `keys(address)` | `["city","district","coordinates"]` | 获取 address 的所有键 |

**values - 获取对象的所有值**

| 表达式             | 输出结果                                      | 说明                   |
| ------------------ | --------------------------------------------- | ---------------------- |
| `values(metadata)` | `["1.0.0","developer",["api","v2","stable"]]` | 获取 metadata 的所有值 |

#### 4. 多行表达式与 this 传递

使用分号 `;` 分隔多个表达式，每行都会执行，最终结果为最后一行的返回值。

**`this` 关键字说明：**

- 在多行表达式中，`this` 引用**上一行的执行结果**
- 第一行的 `this` 指向**原始数据**
- 可以使用 `this.xxx` 访问上一行结果的属性
- 这使得你可以将多个操作链式组合，实现复杂的数据处理

**基本示例：**

| 表达式                                            | 输出结果              | 说明                               |
| ------------------------------------------------- | --------------------- | ---------------------------------- |
| `filter(users, "isActive"); length(this)`         | `2`                   | 过滤活跃用户，然后获取结果数组长度 |
| `filter(products, "inStock"); map(this, "price")` | `[5999, 899]`         | 过滤有库存产品，再提取价格         |
| `filter(users, "isActive"); map(this, "name")`    | `["Alice","Charlie"]` | 过滤活跃用户，再提取名字           |

**`this` 传递流程示例：**

以 `filter(users, "isActive"); length(this)` 为例：

1. **第一行** `filter(users, "isActive")`

   - 从原始数据中获取 `users` 数组并过滤
   - 返回 `[{id:1, name:"Alice"...}, {id:3, name:"Charlie"...}]`
   - 此结果成为下一行的 `this`

2. **第二行** `length(this)`
   - `this` 现在是上一行的结果（过滤后的数组）
   - `length(this)` 返回 `2`

**更多 `this` 使用示例：**

| 表达式                                    | 输出结果   | 说明                     |
| ----------------------------------------- | ---------- | ------------------------ |
| `filter(users, "isActive"); first(this)`  | Alice 对象 | 获取第一个活跃用户       |
| `first(users); this.name`                 | `"Alice"`  | 获取第一个用户的名字     |
| `filter(products, "inStock"); last(this)` | 机械键盘   | 获取最后一个有库存的产品 |
| `map(users, "age"); slice(this, 0, 2)`    | `[25, 30]` | 提取所有年龄后取前两个   |

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
            ├── add2Clipboard.ts  # 剪贴板工具
            └── safeEval.ts # 安全表达式求值
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

---

## English Documentation {#english-documentation}

Supports comments
![Example](/docs/example.jpg)

Supports multi-line operation statements
![Example 2](/docs/example2.jpg)

## ✨ Features

- 📝 **Dual Editor Layout** - Left editing area, right formatted preview area
- 🎨 **Monaco Editor** - Uses VS Code's same editor for excellent editing experience
- 🔧 **JSON Formatting** - One-click JSON code formatting
- 📂 **Expand/Collapse** - Supports code block expand and collapse operations
- 💬 **Comment Support** - Supports JSON with comments (JSONC) format
- 🔄 **Dynamic Extraction** - Dynamically extract JSON data through expressions (like `list[0]`, `user.name`, etc.)
- 📋 **TypeScript Interface Generation** - One-click convert JSON to TypeScript interface definitions
- 🗜️ **Compress and Copy** - Compress JSON and copy to clipboard
- 🌙 **Dark Theme** - Built-in dark theme to protect your eyes

## 🛠️ Tech Stack

- **Build Tool**: Vite
- **Editor**: Monaco Editor
- **Frontend Framework**: Alpine.js
- **Styling Framework**: Tailwind CSS
- **Language**: TypeScript
- **Dependencies**:
  - `json-to-ts` - JSON to TypeScript interface
  - `strip-json-comments` - JSON comment parsing support

## 📦 Installation

```bash
# Install dependencies using pnpm
pnpm install
```

## 🚀 Run

```bash
# Development mode
pnpm dev

# Build production version
pnpm build

# Preview production build
pnpm preview
```

## 🚢 Deployment

### GitHub Pages Automatic Deployment

The project is configured with GitHub Actions and will automatically build and deploy to GitHub Pages when code is pushed to `main` or `master` branch.

**First deployment steps:**

1. Enable GitHub Pages in GitHub repository settings:

   - Go to repository `Settings` → `Pages`
   - Select `GitHub Actions` in `Source`

2. Push code to `main` or `master` branch:

   ```bash
   git push origin main
   ```

3. Wait for GitHub Actions to complete build and deployment (can check progress in `Actions` tab)

4. After deployment completes, visit `https://your-username.github.io/json-editor/` to view the online version

**Manual deployment trigger:**

In the GitHub repository's `Actions` tab, select `Build and Deploy to GitHub Pages` workflow, click `Run workflow` to manually trigger deployment.

## 📖 Usage

### Basic Operations

1. **Edit JSON** - Enter or paste JSON code in the left editor
2. **Format** - Click the "Format" button in the toolbar (or use keyboard shortcuts) to format code
3. **Expand/Collapse** - Use "Expand All" or "Collapse All" buttons to control code folding

### Dynamic Data Extraction Details

Enter safe expressions in the bottom input box to extract JSON data. Here are all supported syntaxes and detailed examples:

#### Sample Data

To better understand each feature, we will use the following sample data:

```json
{
  "name": "张三",
  "age": 28,
  "isActive": true,
  "hobbies": ["阅读", "编程", "运动"],
  "address": {
    "city": "北京",
    "district": "朝阳区",
    "coordinates": {
      "lat": 39.9,
      "lng": 116.4
    }
  },
  "users": [
    {
      "id": 1,
      "name": "Alice",
      "age": 25,
      "isActive": true,
      "role": "admin"
    },
    {
      "id": 2,
      "name": "Bob",
      "age": 30,
      "isActive": false,
      "role": "user"
    },
    {
      "id": 3,
      "name": "Charlie",
      "age": 28,
      "isActive": true,
      "role": "user"
    }
  ],
  "products": [
    {
      "id": 101,
      "name": "笔记本电脑",
      "price": 5999,
      "inStock": true
    },
    {
      "id": 102,
      "name": "无线鼠标",
      "price": 199,
      "inStock": false
    },
    {
      "id": 103,
      "name": "机械键盘",
      "price": 899,
      "inStock": true
    }
  ],
  "metadata": {
    "version": "1.0.0",
    "author": "developer",
    "tags": ["api", "v2", "stable"]
  }
}
```

#### 1. Basic Property Access

**Dot notation for object property access**

| Expression                | Output   | Description                     |
| ------------------------- | -------- | ------------------------------- |
| `name`                    | `"张三"` | Get root object's name property |
| `age`                     | `28`     | Get root object's age property  |
| `address.city`            | `"北京"` | Get nested object property      |
| `address.coordinates.lat` | `39.9`   | Get multi-level nested property |

**Bracket notation for array element access**

| Expression      | Output      | Description                       |
| --------------- | ----------- | --------------------------------- |
| `hobbies[0]`    | `"阅读"`    | Get first array element           |
| `hobbies[2]`    | `"运动"`    | Get third array element           |
| `users[0]`      | Full object | Get first object from users array |
| `users[1].name` | `"Bob"`     | Get second user's name property   |

**Mixed dot and bracket notation**

| Expression          | Output | Description                      |
| ------------------- | ------ | -------------------------------- |
| `products[2].price` | `899`  | Get third product's price        |
| `metadata.tags[1]`  | `"v2"` | Get second element of tags array |

#### 2. Array Operation Functions

**filter - Filter array**

Syntax: `filter(array, propertyName)`

Filter array based on property value (truthy check).

| Expression                    | Output                 | Description                  |
| ----------------------------- | ---------------------- | ---------------------------- |
| `filter(users, "isActive")`   | `[Alice, Charlie]`     | Filter all active users      |
| `filter(products, "inStock")` | In-stock products list | Filter all in-stock products |

**map - Map array**

Syntax: `map(array, propertyName)`

Extract specified property value from each element in array.

| Expression               | Output                      | Description                |
| ------------------------ | --------------------------- | -------------------------- |
| `map(users, "name")`     | `["Alice","Bob","Charlie"]` | Extract all user names     |
| `map(users, "age")`      | `[25,30,28]`                | Extract all user ages      |
| `map(products, "price")` | `[5999,199,899]`            | Extract all product prices |

**find - Find element**

Syntax: `find(array, propertyName)`

Find first element in array with specified property.

| Expression            | Output            | Description                          |
| --------------------- | ----------------- | ------------------------------------ |
| `find(users, "role")` | Alice full object | Return first user with role property |

**slice - Array slicing**

Syntax: `slice(array, startIndex, endIndex?)`

| Expression           | Output           | Description       |
| -------------------- | ---------------- | ----------------- |
| `slice(users, 0, 2)` | `[Alice, Bob]`   | Get first 2 users |
| `slice(users, -2)`   | `[Bob, Charlie]` | Get last 2 users  |

**first - Get first element**

| Expression             | Output            | Description              |
| ---------------------- | ----------------- | ------------------------ |
| `first(users)`         | Alice full object | Get first user           |
| `first(products).name` | `"笔记本电脑"`    | Get first product's name |

**last - Get last element**

| Expression               | Output              | Description                     |
| ------------------------ | ------------------- | ------------------------------- |
| `last(users)`            | Charlie full object | Get last user                   |
| `last(products).inStock` | `true`              | Get last product's stock status |

#### 3. Object Operation Functions

**length - Get length**

| Expression         | Output | Description                             |
| ------------------ | ------ | --------------------------------------- |
| `length(users)`    | `3`    | Length of users array                   |
| `length(metadata)` | `3`    | Number of properties in metadata object |

**keys - Get all object keys**

| Expression      | Output                              | Description             |
| --------------- | ----------------------------------- | ----------------------- |
| `keys(address)` | `["city","district","coordinates"]` | Get all keys of address |

**values - Get all object values**

| Expression         | Output                                        | Description                |
| ------------------ | --------------------------------------------- | -------------------------- |
| `values(metadata)` | `["1.0.0","developer",["api","v2","stable"]]` | Get all values of metadata |

#### 4. Multi-line Expressions

Use semicolon `;` to separate multiple expressions. Each line executes, final result is the last line's return value.

| Expression                                        | Output                | Description                                       |
| ------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `filter(users, "isActive"); length(this)`         | `2`                   | Filter active users, then get result array length |
| `filter(products, "inStock"); map(this, "price")` | `[5999, 899]`         | Filter in-stock products, then extract prices     |
| `filter(users, "isActive"); map(this, "name")`    | `["Alice","Charlie"]` | Filter active users, then extract names           |

The extracted results will be displayed in the right editor.

### Copy Functions

- **Copy as TS Interface** - Convert JSON to TypeScript interface definition and copy to clipboard
- **Compress and Copy** - Compress JSON to single line and copy to clipboard

## 📁 Project Structure

```
json-editor/
├── index.html              # Entry HTML file
├── package.json            # Project config and dependencies
├── vite.config.js          # Vite config
├── tailwind.config.js      # Tailwind CSS config
├── tsconfig.json           # TypeScript config
├── public/                 # Static assets
│   ├── format.svg          # Format icon
│   ├── expand.svg          # Expand icon
│   ├── collapse.svg        # Collapse icon
│   ├── compress.svg        # Compress icon
│   ├── discomment.svg      # Remove comment icon
│   └── typescript.svg      # TypeScript icon
└── src/
    ├── css/
    │   └── index.css       # Style file
    └── scripts/
        ├── index.ts        # Entry file
        ├── editor.ts       # Monaco Editor config
        ├── store.ts        # Alpine.js state management
        ├── type.d.ts       # TypeScript type definitions
        └── tools/
            ├── parse.ts    # JSON parsing tool
            ├── add2Clipboard.ts  # Clipboard tool
            └── safeEval.ts # Safe expression evaluation
```

## 🎯 Main Feature Implementation

### JSON Parsing

The project uses a custom `parse` function to parse JSON, supporting JSON format with comments.

### Monaco Editor Configuration

- Enable JSON language support
- Configure dark theme
- Support formatting, folding, and other operations
- Allow JSON comments (via `monaco.json.jsonDefaults.setDiagnosticsOptions`)

### State Management

Uses Alpine.js store functionality to manage global state, including:

- Format expression string
- Format result
- Editor display state
- Toolbar button configuration

## 📝 Development Notes

The project is developed with TypeScript, ensuring type safety. Main editing logic is concentrated in `src/scripts/store.ts`, implementing UI updates through Alpine.js's reactive system.

## 📄 License

This project is open source under the [MIT License](LICENSE).

Copyright (c) 2024 JSON Editor Contributors
