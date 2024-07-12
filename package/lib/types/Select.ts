import { ComponentPropsBase, FieldProps, FormItemComponentPropsBase } from "./Form"

export interface OptionItem {
  label?: string
  value?: string
  [key: string]: any
}

export interface SelectPropsBase {
  options: Array<OptionItem>
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
  fieldProps?: FieldProps
}

export type SelectComponentProps = SelectPropsBase & FormItemComponentPropsBase;

export interface SelectProps extends ComponentPropsBase {
  component: "Select",
  selectProps?: SelectPropsBase
}