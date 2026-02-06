/**
 * 安全地执行表达式，避免使用 eval() 的安全风险
 * 支持属性访问和有限的数组操作
 * @param expression - 要执行的表达式（例如 "list[0]", "user.name"）
 * @param data - 数据对象，表达式中的 "this" 指向此对象
 * @returns 表达式的结果
 */
export default (expression: string, data: any): any => {
  if (!expression.trim()) {
    return undefined
  }

  // 移除开头的 "this." 如果存在，因为调用者会添加
  let expr = expression.trim()
  if (expr.startsWith('this.')) {
    expr = expr.substring(5)
  }

  // 如果表达式为空，返回整个数据对象
  if (!expr) {
    return data
  }

  try {
    return evaluateExpression(expr, data)
  } catch (error) {
    console.error('表达式执行失败:', error)
    throw new Error(
      `表达式执行失败: ${
        error instanceof Error ? error.message : String(error)
      }`,
    )
  }
}

/**
 * 安全地评估表达式
 */
function evaluateExpression(expr: string, data: any): any {
  // 支持多行表达式（分号分隔）
  const lines = expr
    .split(';')
    .map(line => line.trim())
    .filter(line => line)

  if (lines.length === 0) {
    return data
  }

  // 多行表达式中，this 引用上一行的结果
  // 第一行的 this 指向原始数据
  let lastResult: any = data
  for (const line of lines) {
    lastResult = evaluateLine(line, data, lastResult)
  }

  return lastResult
}

/**
 * 评估单行表达式
 * @param line - 单行表达式
 * @param context - 原始数据上下文
 * @param lastResult - 上一行的结果（用于 this 引用）
 */
function evaluateLine(line: string, context: any, lastResult: any): any {
  // 检查是否是支持的函数调用
  const functionMatch = line.match(/^(\w+)\((.*)\)$/)
  if (functionMatch) {
    const [, funcName, argsStr] = functionMatch
    return callSafeFunction(funcName, argsStr, context, lastResult)
  }

  // 否则作为属性访问链处理
  // 如果是 this 开头，使用 lastResult
  if (line === 'this') {
    return lastResult
  }
  if (line.startsWith('this.')) {
    return getPropertyByPath(line.substring(5), lastResult)
  }
  return getPropertyByPath(line, context)
}

/**
 * 调用安全的辅助函数
 * @param funcName - 函数名
 * @param argsStr - 参数字符串
 * @param context - 原始数据上下文
 * @param lastResult - 上一行的结果（用于 this 引用）
 */
function callSafeFunction(
  funcName: string,
  argsStr: string,
  context: any,
  lastResult: any,
): any {
  const args = parseFunctionArguments(argsStr, context, lastResult)

  switch (funcName) {
    case 'filter':
      if (args.length < 2) {
        throw new Error('filter 函数需要两个参数: 数组和属性名')
      }
      const [array, propertyName] = args
      if (!Array.isArray(array)) {
        throw new Error('filter 的第一个参数必须是数组')
      }
      if (typeof propertyName !== 'string') {
        throw new Error('filter 的第二个参数必须是字符串属性名')
      }
      return array.filter(item => item && item[propertyName])

    case 'map':
      if (args.length < 2) {
        throw new Error('map 函数需要两个参数: 数组和属性名')
      }
      const [mapArray, mapProperty] = args
      if (!Array.isArray(mapArray)) {
        throw new Error('map 的第一个参数必须是数组')
      }
      if (typeof mapProperty !== 'string') {
        throw new Error('map 的第二个参数必须是字符串属性名')
      }
      return mapArray.map(item => item && item[mapProperty])

    case 'find':
      if (args.length < 2) {
        throw new Error('find 函数需要两个参数: 数组和属性名')
      }
      const [findArray, findProperty] = args
      if (!Array.isArray(findArray)) {
        throw new Error('find 的第一个参数必须是数组')
      }
      if (typeof findProperty !== 'string') {
        throw new Error('find 的第二个参数必须是字符串属性名')
      }
      return findArray.find(item => item && item[findProperty])

    case 'slice':
      if (args.length < 1) {
        throw new Error('slice 函数需要至少一个参数: 数组')
      }
      const [sliceArray, start = 0, end] = args
      if (!Array.isArray(sliceArray)) {
        throw new Error('slice 的第一个参数必须是数组')
      }
      return sliceArray.slice(start, end)

    case 'first':
      if (args.length < 1) {
        throw new Error('first 函数需要一个参数: 数组')
      }
      const [firstArray] = args
      if (!Array.isArray(firstArray)) {
        throw new Error('first 的参数必须是数组')
      }
      return firstArray[0]

    case 'last':
      if (args.length < 1) {
        throw new Error('last 函数需要一个参数: 数组')
      }
      const [lastArray] = args
      if (!Array.isArray(lastArray)) {
        throw new Error('last 的参数必须是数组')
      }
      return lastArray[lastArray.length - 1]

    case 'length':
      if (args.length < 1) {
        throw new Error('length 函数需要一个参数: 数组或对象')
      }
      const [lengthTarget] = args
      if (Array.isArray(lengthTarget)) {
        return lengthTarget.length
      }
      if (lengthTarget && typeof lengthTarget === 'object') {
        return Object.keys(lengthTarget).length
      }
      throw new Error('length 的参数必须是数组或对象')

    case 'keys':
      if (args.length < 1) {
        throw new Error('keys 函数需要一个参数: 对象')
      }
      const [keysObj] = args
      if (!keysObj || typeof keysObj !== 'object') {
        throw new Error('keys 的参数必须是对象')
      }
      return Object.keys(keysObj)

    case 'values':
      if (args.length < 1) {
        throw new Error('values 函数需要一个参数: 对象')
      }
      const [valuesObj] = args
      if (!valuesObj || typeof valuesObj !== 'object') {
        throw new Error('values 的参数必须是对象')
      }
      return Object.values(valuesObj)

    default:
      throw new Error(`不支持的函数: ${funcName}`)
  }
}

/**
 * 解析函数参数
 * @param argsStr - 参数字符串
 * @param context - 原始数据上下文
 * @param lastResult - 上一行的结果（用于 this 引用）
 */
function parseFunctionArguments(
  argsStr: string,
  context: any,
  lastResult: any,
): any[] {
  if (!argsStr.trim()) {
    return []
  }

  // 简单参数解析：支持属性路径、字符串、数字
  const args: any[] = []
  let currentArg = ''
  let inString = false
  let stringChar = ''
  let bracketDepth = 0

  for (let i = 0; i < argsStr.length; i++) {
    const char = argsStr[i]

    if (!inString && char === ',' && bracketDepth === 0) {
      // 参数分隔符
      args.push(parseArgument(currentArg.trim(), context, lastResult))
      currentArg = ''
      continue
    }

    if (!inString && (char === '"' || char === "'")) {
      inString = true
      stringChar = char
      currentArg += char
    } else if (inString && char === stringChar && argsStr[i - 1] !== '\\') {
      inString = false
      currentArg += char
    } else if (!inString && char === '[') {
      bracketDepth++
      currentArg += char
    } else if (!inString && char === ']') {
      bracketDepth--
      currentArg += char
    } else {
      currentArg += char
    }
  }

  if (currentArg) {
    args.push(parseArgument(currentArg.trim(), context, lastResult))
  }

  return args
}

/**
 * 解析单个参数
 * @param arg - 参数字符串
 * @param context - 原始数据上下文
 * @param lastResult - 上一行的结果（用于 this 引用）
 */
function parseArgument(arg: string, context: any, lastResult: any): any {
  // 字符串字面量
  if (
    (arg.startsWith('"') && arg.endsWith('"')) ||
    (arg.startsWith("'") && arg.endsWith("'"))
  ) {
    return arg.substring(1, arg.length - 1)
  }

  // 数字
  if (/^-?\d+(\.\d+)?$/.test(arg)) {
    return Number(arg)
  }

  // 布尔值
  if (arg === 'true') return true
  if (arg === 'false') return false
  if (arg === 'null') return null
  if (arg === 'undefined') return undefined

  // this 关键字 - 引用上一行的结果
  if (arg === 'this') {
    return lastResult
  }
  // this.xxx - 访问上一行结果的属性
  if (arg.startsWith('this.')) {
    return getPropertyByPath(arg.substring(5), lastResult)
  }

  // 属性路径
  return getPropertyByPath(arg, context)
}

/**
 * 通过路径获取属性值
 */
function getPropertyByPath(path: string, obj: any): any {
  if (!path) {
    return obj
  }

  // 分割路径，支持点表示法和方括号表示法
  const segments: any[] = []
  let currentSegment = ''
  let inBrackets = false
  let bracketContent = ''

  for (let i = 0; i < path.length; i++) {
    const char = path[i]

    if (char === '[' && !inBrackets) {
      if (currentSegment) {
        segments.push(currentSegment)
        currentSegment = ''
      }
      inBrackets = true
      bracketContent = ''
    } else if (char === ']' && inBrackets) {
      inBrackets = false
      // 解析括号内容
      if (bracketContent.startsWith('"') || bracketContent.startsWith("'")) {
        // 字符串键
        segments.push(bracketContent.substring(1, bracketContent.length - 1))
      } else if (/^\d+$/.test(bracketContent)) {
        // 数字索引
        segments.push(Number(bracketContent))
      } else {
        // 变量（递归获取）
        const value = getPropertyByPath(bracketContent, obj)
        segments.push(value)
      }
    } else if (inBrackets) {
      bracketContent += char
    } else if (char === '.') {
      if (currentSegment) {
        segments.push(currentSegment)
        currentSegment = ''
      }
    } else {
      currentSegment += char
    }
  }

  if (currentSegment) {
    segments.push(currentSegment)
  }

  // 遍历路径获取值
  let result = obj
  for (const segment of segments) {
    if (result == null) {
      return undefined
    }
    result = result[segment]
  }

  return result
}
