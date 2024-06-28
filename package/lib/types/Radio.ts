import { AnyProperty } from "./Common"
import { FormItemComponentPropsBase } from "./Form"

export interface RadioProps {
  label?: string
  value?: string
  options: Array<RadioItem>
}

export interface RadioItem extends AnyProperty, Pick<FormItemComponentPropsBase, 'disabled' | 'size'> {
  label?: string  // 单选框的标签描述
  value?: any   // 单选框选中时的值
}

export interface RadioComponentProps extends FormItemComponentPropsBase {
  modelValue: any
  options: Array<RadioItem>
  value?: string
  label?: string
}