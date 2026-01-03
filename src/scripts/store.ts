import Alpine from 'alpinejs'
import { formatEditor, mainEditor } from './editor'
import json2ts from 'json-to-ts'
import parse from './tools/parse'

// 将 Alpine 挂载到 window 对象上，这样 HTML 中的指令才能生效
import type { IGlobalStore } from './type'
import add2Clipboard from './tools/add2Clipboard'
import stripJsonComments from 'strip-json-comments'

// 获取 base URL，用于处理 GitHub Pages 子路径部署
const BASE_URL = import.meta.env.BASE_URL

;(window as any).Alpine = Alpine

Alpine.store('global', {
  formatEvalStr: '',
  formatResult: '',
  isShowFormatEditor: false,
  btnList: [
    {
      title: '格式化',
      img: `${BASE_URL}format.svg`,
      handleClick() {
        const mine = this as unknown as IGlobalStore
        mine.formatCode()
      },
    },
    {
      title: '展开所有',
      img: `${BASE_URL}expand.svg`,
      handleClick() {
        const mine = this as unknown as IGlobalStore
        mine.expandCode()
      },
    },
    {
      title: '收起所有',
      img: `${BASE_URL}collapse.svg`,
      handleClick() {
        const mine = this as unknown as IGlobalStore
        mine.collapseCode()
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
      handleClick() {
        add2Clipboard(json2ts(parse(mainEditor.getValue())).join('\n'))
      },
    },
    {
      title: '压缩',
      img: `${BASE_URL}compress.svg`,
      handleClick() {
        const mine = this as unknown as IGlobalStore
        mine.compressCodeAndCopyToClipboard()
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
    console.info(mainInfo)
    try {
      const codeLines = `this${mine.formatEvalStr}`
        .split(';')
        .map(code => code.trim())
        .filter(code => code)
      console.info(codeLines)
      const runnerList = codeLines.map(code => {
        if (code) {
          return function () {
            return eval(code)
          }
        }
        return () => {}
      })
      console.info(runnerList)
      let result
      runnerList.forEach((runner, idx) => {
        const _res = runner && runner.call(mainInfo)
        // 承接最后一句的返回值
        if (idx === runnerList.length - 1) {
          result = _res
        }
      })
      if (result) {
        const resultStr = JSON.stringify(result) || ''
        mine.formatResult = resultStr
        mine.isShowFormatEditor = !!resultStr
        formatEditor.setValue(resultStr)
        formatEditor.getAction('editor.action.formatDocument')?.run()
      }
    } catch (error) {
      console.info(error)
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
  compressCodeAndCopyToClipboard() {
    let value = ''
    try {
      value = JSON.stringify(parse(mainEditor.getValue()))
    } catch (error) {
      throw error
    }
    add2Clipboard(value)
  },
})

// 启动 Alpine
Alpine.start()
