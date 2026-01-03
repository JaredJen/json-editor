/**
 * 将值添加到剪贴板
 * @param value - 要添加的值
 */
export default (value: string) => {
  if (value) {
    navigator.clipboard.writeText(value)
    alert('复制成功')
  }
}
