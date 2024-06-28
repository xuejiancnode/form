import { Component } from "vue";
import { FormItemComponentPropsBase } from "./Form";

export interface SwitchPropsBase {
  loading?: boolean
  width?: string
  inlinePrompt?: boolean
  activeIcon?: string | Component
  inactiveIcon?: string | Component
  activeText?: string
  inactiveText?: string
  activeValue?: boolean | string | number
  inactiveValue?: boolean | string | number
  beforeChange?: () => Promise<boolean>
}

export interface SwitchComponentProps extends SwitchPropsBase, FormItemComponentPropsBase { }