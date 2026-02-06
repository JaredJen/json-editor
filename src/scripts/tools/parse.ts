/**
 * 解析json字符串
 * @param jsonStr - 要解析的json字符串
 * @returns 解析后的json对象
 * @throws {Error} 当 JSON 解析失败时抛出错误
 */
export default (jsonStr: string) => {
  if (!jsonStr.trim()) {
    throw new Error('JSON 字符串为空')
  }
  try {
    return JSON.parse(jsonStr)
  } catch (error) {
    throw new Error(`JSON 解析失败: ${error instanceof Error ? error.message : String(error)}`)
  }
}