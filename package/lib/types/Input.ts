import { Component } from "vue";
import { FormItemComponentPropsBase } from "./Form";

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

export interface InputComponentProps extends InputPropsBase, FormItemComponentPropsBase { }
