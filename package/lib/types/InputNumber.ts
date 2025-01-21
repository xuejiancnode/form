import { ComponentPropsBase, FormItemComponentPropsBase } from "./Form";

export interface InputNumberPropsBase {
  clearable?: boolean
  min?: number
  max?: number
  step?: number
  stepStrictly?: boolean
  precision?: number
  placeholder?: string
  controls?: boolean
  controlsPosition?: '' | 'right'
  valueOnClear?: number | null | 'min' | 'max'
}

export type InputNumberComponentProps = InputNumberPropsBase & FormItemComponentPropsBase;

export interface InputNumberProps extends ComponentPropsBase {
  component: 'InputNumber',
  inputNumberProps?: InputNumberPropsBase
}