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
  }
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
  }
)

monaco.json.jsonDefaults.setDiagnosticsOptions({
  allowComments: true,
})
