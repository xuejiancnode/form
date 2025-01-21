import { Component } from "vue";
import { ComponentPropsBase, FormItemComponentPropsBase } from "./Form";

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

export type SwitchComponentProps = SwitchPropsBase & FormItemComponentPropsBase;

export interface SwitchProps extends ComponentPropsBase {
  component: "Switch"
  switchProps?: SwitchPropsBase
}