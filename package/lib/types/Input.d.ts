import { Component } from "vue";
import { FormItemComponentPropsBase } from "./Form";

export type inputType = 'text' | 'textarea' | 'password' | 'button' | 'checkbox' | 'file' | 'number' | 'radio'

export interface InputPropsBase {
  maxlength?: string | number
  placeholder?: string
  clearable?: boolean
  type?: inputType
  prefixIcon?: string | Component
  suffixIcon?: string | Component
}

export interface InputComponentProps extends InputPropsBase, FormItemComponentPropsBase { }
