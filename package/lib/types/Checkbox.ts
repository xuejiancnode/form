import { AnyProperty } from "./Common"
import { FormEmitEventName, FormItemComponentPropsBase } from "./Form"

export interface CheckboxProps {
  label?: string
  value?: string
  options: Array<CheckboxItem>
}

export interface CheckboxItem extends AnyProperty, Pick<FormItemComponentPropsBase, 'disabled' | 'size'> {
  label?: string  // 单选框的标签描述
  value?: any   // 单选框选中时的值
}


export interface CheckboxComponentProps extends FormItemComponentPropsBase {
  modelValue: string[] | number[]
  options: Array<CheckboxItem>
  value?: string
  label?: string
}