import { CascaderNode } from "element-plus";
import { ComponentPropsBase, FieldProps, FormItemComponentPropsBase, FormSize } from "./Form";
import { AnyProperty } from "./Common";

export interface CascaderFieldProps {
  label: string
  value: string
}

export interface CascaderPropsBase {
  options: Array<AnyProperty>
  fieldProps?: FieldProps
  placeholder?: string
  clearable?: boolean
  showAllLevels?: boolean     // 输入框中是否显示选中值的完整路径	
  collapseTags?: boolean
  collapseTagsTooltip?: boolean
  separator?: string
  filterable?: boolean
  debounce?: number
  popperClass?: string
  teleported?: boolean
  tagType?: 'success' | 'info' | 'warning' | 'danger'
  filterMethod?: (node: CascaderNode, keyword: string) => boolean
  beforeFilter?: (value: string) => boolean
}

/**
 * Cascader API: https://element-plus.org/zh-CN/component/cascader.html#cascader-api
 */
export type CascaderComponentProps = CascaderPropsBase & FormItemComponentPropsBase;

export interface CascaderProps extends ComponentPropsBase {
  component: "Cascader",
  cascaderProps: CascaderPropsBase
}