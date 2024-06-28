
/**
 * 将name转化为大驼峰命名
 * @date 2023-06-28
 * @param {string} name:string 需要转换的名称
 * @returns {string} 返回转化后的大驼峰命名
 */
export function toNameOfHump(name: string) {
  let nameTemp = name.split('-')
  nameTemp = nameTemp.map(str => {
    return str.substring(0, 1).toUpperCase() + str.substring(1)
  })
  return nameTemp.join('')
}

/**
 * 合并props
 * @param defaultProps props默认值
 * @param props 传入的props
 * @returns 合并后的Props
 */
export function mergeProps<D>(defaultProps: any, props: any): D {
  let temp: D = Object.assign(defaultProps, props);
  return temp
}