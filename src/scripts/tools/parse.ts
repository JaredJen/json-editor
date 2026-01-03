/**
 * 解析json字符串
 * @param jsonStr - 要解析的json字符串
 * @returns 解析后的json对象
 */
export default (jsonStr: string) => {
  if (!jsonStr) return ''
  try {
    return JSON.parse(jsonStr)
  } catch (error) {
    return ''
  }
}