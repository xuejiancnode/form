import { FormConfigList } from "../types";

/**
 * 获取数据类型
 * @date 2023-06-28
 * @param {any} obj:any 待检测的数据类型
 * @returns {string} 返回对应数据类型
 */
export function getObjType(obj: any): string {
  let toString = Object.prototype.toString;
  enum ObjTypes {
    '[object Boolean]' = 'boolean',
    '[object Number]' = 'number',
    '[object String]' = 'string',
    '[object Function]' = 'function',
    '[object Array]' = 'array',
    '[object Date]' = 'date',
    '[object RegExp]' = 'regExp',
    '[object Undefined]' = 'undefined',
    '[object Null]' = 'null',
    '[object Object]' = 'object'
  };
  if (obj instanceof Element) {
    return 'element';
  }
  
  return ObjTypes[toString.call(obj) as keyof typeof ObjTypes];
};

/**
 * 对象深拷贝
 */
export function deepClone<D>(data: D): D {
  let type = getObjType(data);
  // @ts-ignore
  let obj: D = null;
  if (type === 'array') {
    (obj as any[]) = [];
  } else if (type === 'object') {
    (obj as Object) = {};
  } else {
    //不再具有下一层次
    return data;
  }
  if (Array.isArray(data)) {
    for (let i = 0, len = data.length; i < len; i++) {
      (obj as any[]).push(deepClone(data[i]));
    }
  } else if (type === 'object') {
    for (let key in data) {
      obj[key] = deepClone((data as any)[key]);
    }
  }
  return obj;
};

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

/**
 * 动态计算表单布局
 * @param arr 表单配置列表
 * @param columns 列数
 */
export function calcLayoutCount(arr: FormConfigList, columns?: number) {
  let result = []
  let currentLine = []

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item.block) {
      if (currentLine.length > 0) {
        result.push(currentLine)
        currentLine = []
      }
      result.push([item])
    } else {
      currentLine.push(item)
      if (currentLine.length === columns) {
        result.push(currentLine)
        currentLine = []
      }
    }
  }

  if (currentLine.length > 0 && !arr[arr.length - 1].block) {
    result.push(currentLine)
    currentLine = []
  }

  return result
}