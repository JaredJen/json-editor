import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// 如果是 GitHub Pages 部署，使用仓库名作为 base 路径
// 如果仓库名是 username.github.io（与用户名相同），则使用 '/'
// 否则使用 '/仓库名/'
const getBase = () => {
  if (process.env.GITHUB_PAGES === 'true') {
    const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'json-editor'
    // 如果仓库名包含 .github.io，说明是用户主页，使用根路径
    return repoName.includes('.github.io') ? '/' : `/${repoName}/`
  }
  return '/'
}

const base = getBase()

// Vite 插件：处理 HTML 中的 public 资源路径
const htmlBasePlugin = () => {
  return {
    name: 'html-base-plugin',
    transformIndexHtml(html) {
      // 处理 HTML 中的绝对路径 public 资源（如 /favicon.svg）
      // 将它们转换为带 base URL 的路径
      if (base !== '/') {
        // 匹配 href="/xxx" 或 src="/xxx" 格式，但排除已经是完整 URL 的情况
        return html.replace(
          /(href|src)=["'](\/[^"']+\.(svg|ico|png|jpg|jpeg|gif|webp))["']/g,
          (match, attr, path) => {
            // 跳过已经是完整 URL 的路径（如 http:// 或 https://）
            if (path.startsWith('http://') || path.startsWith('https://')) {
              return match
            }
            // 跳过已经是模块路径的（如 /src/ 或 /node_modules/）
            if (path.startsWith('/src/') || path.startsWith('/node_modules/')) {
              return match
            }
            // 为 public 目录下的资源添加 base URL
            return `${attr}="${base}${path.slice(1)}"`
          }
        )
      }
      return html
    },
  }
}

export default defineConfig({
  base,
  plugins: [tailwindcss(), htmlBasePlugin()],
  optimizeDeps: {
    exclude: ['monaco-editor'],
  },
  server: {
    port: 3000,
  },
})
