
type HumpType = 1 | 2;
/**
 * 将name转化为type指定的驼峰命名规范
 * @date 2023-06-28
 * @param {string} name:string 需要转换的名称
 * @param type 驼峰类型 1：大驼峰 2：小驼峰
 * @returns {string} 返回转化后的大驼峰命名
 */
export function toNameOfHump(name: string, type: HumpType = 1) {
  let nameTemp = name.split('-')

  nameTemp = nameTemp.map(str => {
    let newStr = str.toLowerCase()
    return newStr.substring(0, 1).toUpperCase() + newStr.substring(1)
  })

  if (type === 2) {
    let str = nameTemp[0]
    nameTemp.splice(0, 1, str.substring(0, 1).toLowerCase() + str.substring(1))
  }
  return nameTemp.join('')
}

/**
 * 合并props
 * @param defaultProps props默认值
 * @param props 传入的props
 * @returns 合并后的Props
 */
export function mergeProps<D extends Record<string, string>>(defaultProps: D, props: any): D {
  let temp: D = Object.assign(defaultProps, props);
  return temp
}