import { Component } from "vue";
import { FormItemComponentPropsBase } from "./Form";
import { ComponentPropsBase } from "./Form";

export type inputType = 'text' | 'textarea' | 'password'

export interface InputPropsBase {
  maxlength?: string | number
  placeholder?: string
  clearable?: boolean
  type?: inputType
  prefixIcon?: string | Component
  suffixIcon?: string | Component
  inputRule?: (val: any) => boolean
}

export type InputComponentProps = InputPropsBase & FormItemComponentPropsBase;

export interface InputProps extends ComponentPropsBase {
  component: 'Input'
  inputProps?: InputPropsBase
}