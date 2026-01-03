// 扩展 Window 接口以支持 Alpine
export declare global {
  interface Window {
    Alpine: typeof Alpine
  }
}

// Monaco Editor 环境配置
declare global {
  var MonacoEnvironment:
    | {
        getWorker: (moduleId: string, label: string) => Worker
      }
    | undefined
}

export interface IGlobalStore {
  formatEvalStr: string
  formatResult: string
  isShowFormatEditor: boolean
  images: {
    path: string
    handleClick: () => void
  }[]
  changeFormatEvalStr: (event: InputEvent) => void
  formatCode: () => void
  expandCode: () => void
  collapseCode: () => void
  compressCodeAndCopyToClipboard: () => void
}
