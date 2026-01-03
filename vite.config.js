import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// 如果是 GitHub Pages 部署，使用仓库名作为 base 路径
// 如果仓库名是 username.github.io（与用户名相同），则使用 '/'
// 否则使用 '/仓库名/'
const getBase = () => {
  if (process.env.GITHUB_PAGES === 'true') {
    const repoName =
      process.env.GITHUB_REPOSITORY?.split('/')[1] || 'json-editor'
    // 如果仓库名包含 .github.io，说明是用户主页，使用根路径
    return repoName.includes('.github.io') ? '/' : `/${repoName}/`
  }
  return '/'
}

const base = getBase()

export default defineConfig({
  base,
  plugins: [tailwindcss()],
  optimizeDeps: {
    exclude: ['monaco-editor'],
  },
  server: {
    port: 3000,
  },
})
