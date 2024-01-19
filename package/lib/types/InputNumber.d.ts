import { FormItemComponentPropsBase } from "./Form";

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

export interface InputNumberComponentProps extends InputNumberPropsBase, FormItemComponentPropsBase { }