import Alpine from 'alpinejs'
import { formatEditor, mainEditor } from './editor'
import json2ts from 'json-to-ts'
import parse from './tools/parse'

// 将 Alpine 挂载到 window 对象上，这样 HTML 中的指令才能生效
import type { IGlobalStore } from './type'
import add2Clipboard from './tools/add2Clipboard'
import stripJsonComments from 'strip-json-comments'
import safeEval from './tools/safeEval'

// 获取 base URL，用于处理 GitHub Pages 子路径部署
const BASE_URL = import.meta.env.BASE_URL

window.Alpine = Alpine

Alpine.store('global', {
  formatEvalStr: '',
  formatResult: '',
  isShowFormatEditor: false,
  btnList: [
    {
      title: '格式化',
      img: `${BASE_URL}format.svg`,
      handleClick(this: IGlobalStore) {
        this.formatCode()
      },
    },
    {
      title: '展开所有',
      img: `${BASE_URL}expand.svg`,
      handleClick(this: IGlobalStore) {
        this.expandCode()
      },
    },
    {
      title: '收起所有',
      img: `${BASE_URL}collapse.svg`,
      handleClick(this: IGlobalStore) {
        this.collapseCode()
      },
    },
    {
      title: '取消注释',
      img: `${BASE_URL}discomment.svg`,
      handleClick() {
        mainEditor.setValue(stripJsonComments(mainEditor.getValue()))
      },
    },
  ],
  clipBtnList: [
    {
      title: 'TS接口',
      img: `${BASE_URL}typescript.svg`,
      async handleClick() {
        try {
          const json = parse(mainEditor.getValue())
          const tsInterfaces = json2ts(json).join('\n')
          await add2Clipboard(tsInterfaces)
        } catch (error) {
          console.error('生成 TypeScript 接口失败:', error)
          alert(
            `生成 TypeScript 接口失败: ${
              error instanceof Error ? error.message : String(error)
            }`,
          )
        }
      },
    },
    {
      title: '压缩',
      img: `${BASE_URL}compress.svg`,
      async handleClick(this: IGlobalStore) {
        await this.compressCodeAndCopyToClipboard()
      },
    },
  ],
  changeFormatEvalStr(event: Event) {
    const target = event.target as HTMLInputElement
    const mine = this as IGlobalStore
    if (!target) return
    const value = target.value
    mine.formatEvalStr = value
    const mainInfo = parse(stripJsonComments(mainEditor.getValue()))
    try {
      // 使用安全的表达式求值器替代 eval
      let result
      if (mine.formatEvalStr.trim()) {
        // safeEval 已经支持多行表达式（分号分隔）
        result = safeEval(mine.formatEvalStr, mainInfo)
      }
      if (result !== undefined) {
        const resultStr = JSON.stringify(result) || ''
        mine.formatResult = resultStr
        mine.isShowFormatEditor = !!resultStr
        formatEditor.setValue(resultStr)
        formatEditor.getAction('editor.action.formatDocument')?.run()
      } else {
        // 清空结果
        mine.formatResult = ''
        mine.isShowFormatEditor = false
        formatEditor.setValue('')
      }
    } catch (error) {
      console.error('表达式求值失败:', error)
      // 出错时清空结果
      mine.formatResult = ''
      mine.isShowFormatEditor = false
      formatEditor.setValue('')
    }
  },
  // 按钮操作
  formatCode() {
    mainEditor.getAction('editor.action.formatDocument')?.run()
  },
  expandCode() {
    mainEditor.getAction('editor.unfoldAll')?.run()
  },
  collapseCode() {
    mainEditor.getAction('editor.foldAll')?.run()
  },
  async compressCodeAndCopyToClipboard() {
    try {
      const json = parse(mainEditor.getValue())
      const value = JSON.stringify(json)
      await add2Clipboard(value)
    } catch (error) {
      console.error('压缩 JSON 失败:', error)
      alert(
        `压缩 JSON 失败: ${
          error instanceof Error ? error.message : String(error)
        }`,
      )
    }
  },
})

// 启动 Alpine
Alpine.start()
