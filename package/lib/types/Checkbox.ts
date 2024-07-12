import { AnyProperty } from "./Common"
import { ComponentPropsBase, FieldProps, FormEmitEventName, FormItemComponentPropsBase } from "./Form"
export interface CheckboxItem extends AnyProperty {
  disabled?: boolean
}

export type CheckboxComponentProps = FormItemComponentPropsBase & {
  modelValue: string[] | number[]
  options: Array<CheckboxItem>
  fieldProps: FieldProps
}

export interface CheckboxProps extends ComponentPropsBase {
  component: 'Checkbox'
  checkboxProps: {
    options: Array<CheckboxItem>
    fieldProps?: FieldProps
  }
}