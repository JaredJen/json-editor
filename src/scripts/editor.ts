import * as monaco from 'monaco-editor'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'

// 配置 Monaco Editor 的 worker 路径（适用于 Vite）
self.MonacoEnvironment = {
  getWorker: function (_moduleId: string, label: string) {
    if (label === 'json') {
      return new JsonWorker()
    }
    return new EditorWorker()
  },
}

export const mainEditor = monaco.editor.create(
  document.getElementById('editor')!,
  {
    value: ``,
    language: 'json',
    fontSize: 14,
    lineNumbers: 'on',
    roundedSelection: false,
    scrollBeyondLastLine: false,
    readOnly: false,
    theme: 'vs-dark',
    formatOnPaste: true,
  },
)

export const formatEditor = monaco.editor.create(
  document.getElementById('format')!,
  {
    value: ``,
    language: 'json',
    fontSize: 14,
    lineNumbers: 'on',
    roundedSelection: false,
    scrollBeyondLastLine: false,
    theme: 'vs-dark',
    formatOnPaste: true,
    formatOnType: true,
  },
)

monaco.json.jsonDefaults.setDiagnosticsOptions({
  allowComments: true,
})

// 监听窗口大小变化，实时调整编辑器尺寸
// 使用防抖优化性能，避免频繁触发
let resizeTimeout: ReturnType<typeof setTimeout> | null = null
const handleResize = () => {
  if (resizeTimeout) {
    clearTimeout(resizeTimeout)
  }
  resizeTimeout = setTimeout(() => {
    mainEditor.layout()
    formatEditor.layout()
  }, 100)
}

window.addEventListener('resize', handleResize)
