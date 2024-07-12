import { AnyProperty } from "./Common"
import { ComponentPropsBase, FieldProps, FormItemComponentPropsBase } from "./Form"

export interface RadioItem extends AnyProperty {
  disabled?: boolean
}

export type RadioComponentProps = FormItemComponentPropsBase & {
  modelValue: any
  options: Array<RadioItem>
  fieldProps: FieldProps
}

export interface RadioProps extends ComponentPropsBase {
  component: 'Radio',
  radioProps?: {
    options: Array<RadioItem>
    fieldProps?: FieldProps
  }
}