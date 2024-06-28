import { CascaderNode } from "element-plus";
import { FormItemComponentPropsBase, FormSize } from "./Form";
import { AnyProperty } from "./Common";

export interface CascaderFieldProps {
  label: string
  value: string
}

export interface CascaderPropsBase {
  options: Array<AnyProperty>
  cascaderFieldProps?: CascaderFieldProps
  placeholder?: string
  clearable?: boolean
  showAllLevels?: boolean     // 输入框中是否显示选中值的完整路径	
  collapseTags?: boolean
  collapseTagsTooltip?: boolean
  separator?: string
  filterable?: boolean
  filterMethod?: (node: CascaderNode, keyword: string) => boolean
  debounce?: number
  beforeFilter?: (value: string) => boolean
  popperClass?: string
  teleported?: boolean
  tagType?: 'success' | 'info' | 'warning' | 'danger'
}

/**
 * Cascader API: https://element-plus.org/zh-CN/component/cascader.html#cascader-api
 */
export interface CascaderComponentProps extends CascaderPropsBase, FormItemComponentPropsBase {
  
}