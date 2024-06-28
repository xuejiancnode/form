import { FormItemComponentPropsBase } from "./Form"

export interface OptionItem {
  label?: string
  value?: string
  [key: string]: any
}

export interface SelectPropsBase {
  options: OptionItem[]
  valueKey?: string
  clearable?: boolean
  placeholder?: string
  multiple?: boolean
  multipleLimit?: number
  collapseTags?: boolean
  collapseTagsTooltip?: boolean
  filterable?: boolean
  popperClass?: string
  teleported?: string
  fitInputWidth?: boolean
  tagType?: '' | 'success' | 'info' | 'warning' | 'danger'
  maxCollapseTags?: number
  defaultProps?: {
    label: string
    value: string
  },
}

export interface SelectComponentProps extends SelectPropsBase, FormItemComponentPropsBase { }