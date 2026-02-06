/**
 * 将值添加到剪贴板
 * @param value - 要添加的值
 */
export default async (value: string) => {
  if (!value) {
    return
  }
  try {
    await navigator.clipboard.writeText(value)
    alert('复制成功')
  } catch (error) {
    console.error('复制到剪贴板失败:', error)
    alert(`复制失败: ${error instanceof Error ? error.message : String(error)}`)
  }
}
