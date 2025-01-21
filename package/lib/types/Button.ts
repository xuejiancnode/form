import { FormSize, IconProps, ThemeType } from "./Form"
import { ComponentPropsBase } from "./Form"

export interface ButtonPropsBase {
  content?: string
  action?: string
  size?: FormSize
  plain?: boolean
  type?: ThemeType
  link?: boolean
  iconProps?: IconProps
  disabled?: boolean | (() => boolean)
}

export type ButtonComponentProps = ButtonPropsBase & {
  buttons?: Array<ButtonPropsBase>
}

export interface ButtonProps extends ComponentPropsBase {
  component: 'Button',
  buttonProps?: {
    buttons?: Array<ButtonPropsBase>
  }
}