import { FormSize, IconProps, ThemeType } from "./Form"

export interface ButtonProps {
  content?: string
  action?: string
  size?: FormSize
  plain?: boolean
  type?: ThemeType
  link?: boolean
  iconProps?: IconProps
  disabled?: boolean | (() => boolean)
}

export interface ButtonComponentProps extends ButtonProps {
  buttons?: Array<ButtonProps>
}