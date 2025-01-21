import { Component } from "vue";
import { FormItemComponentPropsBase, IconProps } from "./Form";
import { ComponentPropsBase } from "./Form";

export type InputType = 'text' | 'textarea' | 'password'

export interface InputPropsBase {
  maxlength?: string | number
  placeholder?: string
  clearable?: boolean
  type?: InputType
  iconProps?: IconProps
  prepend?: string | Component
  append?: string | Component
  inputRule?: (val: any) => boolean
}

export type InputComponentProps = InputPropsBase & FormItemComponentPropsBase;

export interface InputProps extends ComponentPropsBase {
  component: 'Input'
  inputProps?: InputPropsBase
}