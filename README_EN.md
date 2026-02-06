![Banner](/docs/banner.jpg)

# JSON Editor

I really like [UTools' JSON editor](https://www.u-tools.cn/plugins/detail/JSON%20%E7%BC%96%E8%BE%91%E5%99%A8/), but I don't want to install the entire UTools just for it, so I recreated it on the web.

Built with Monaco Editor, providing JSON formatting, conversion, and editing features.

## 🌍 Language / 语言

[中文](README.md) | **English**

---

Supports comments
![Example](/docs/example.jpg)

Supports multi-line operation statements
![Example 2](/docs/example_2.jpg)

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

#### 4. Multi-line Expressions and `this` Passing

Use semicolon `;` to separate multiple expressions. Each line executes, final result is the last line's return value.

**`this` Keyword Explanation:**

- In multi-line expressions, `this` references **the result of the previous line**
- In the first line, `this` points to **the original data**
- You can use `this.xxx` to access properties of the previous line's result
- This allows you to chain multiple operations together for complex data processing

**Basic Examples:**

| Expression                                        | Output                | Description                                       |
| ------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `filter(users, "isActive"); length(this)`         | `2`                   | Filter active users, then get result array length |
| `filter(products, "inStock"); map(this, "price")` | `[5999, 899]`         | Filter in-stock products, then extract prices     |
| `filter(users, "isActive"); map(this, "name")`    | `["Alice","Charlie"]` | Filter active users, then extract names           |

**`this` Passing Flow Example:**

Taking `filter(users, "isActive"); length(this)` as an example:

1. **First line** `filter(users, "isActive")`

   - Gets `users` array from original data and filters it
   - Returns `[{id:1, name:"Alice"...}, {id:3, name:"Charlie"...}]`
   - This result becomes `this` for the next line

2. **Second line** `length(this)`
   - `this` is now the result from the previous line (filtered array)
   - `length(this)` returns `2`

**More `this` Usage Examples:**

| Expression                                | Output       | Description                        |
| ----------------------------------------- | ------------ | ---------------------------------- |
| `filter(users, "isActive"); first(this)`  | Alice object | Get first active user              |
| `first(users); this.name`                 | `"Alice"`    | Get first user's name              |
| `filter(products, "inStock"); last(this)` | Keyboard     | Get last in-stock product          |
| `map(users, "age"); slice(this, 0, 2)`    | `[25, 30]`   | Extract all ages then take first 2 |

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
