import { FormRules, UploadFile, UploadFiles, UploadRawFile } from "element-plus"
import {
  DatePickerProps,
  IconType,
  CascaderProps,
  CheckboxProps,
  ButtonProps,
  InputProps,
  InputNumberProps,
  RadioProps,
  SelectProps,
  SliderProps,
  SwitchProps,
  TreeSelectProps,
  uploadProps,
  AnyProperty
} from "./index"
import { Component } from "vue"

export type FormSize = '' | 'large' | 'default' | 'small'
export type ThemeType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | ''

// 表单组件配置属性
export type FormComponentConfig = InputProps | ButtonProps | CascaderProps | CheckboxProps | DatePickerProps | InputNumberProps | RadioProps | SelectProps | SliderProps | SwitchProps | TreeSelectProps | uploadProps;

// 表单组件的props
export interface FormComponentProps {
  config: FormConfigList
  model: any
  inline?: boolean
  labelWidth?: string
  labelPosition?: 'left' | 'right' | 'top',
  rules?: FormRules,
  disabled?: boolean
  size?: FormSize
  columns?: number  // 表单需要被分成多少列
  autoColumn?: boolean  // 当为行排列时是否开启自动计算列数，开启后columns无效
}

export interface FieldProps {
  label?: string
  value?: string
}

// 设置传入组件属性名称   key: 组件名称   value: 传入该组件的私有属性名称
export enum FormItemComponentPropsMap {
  Input = "inputProps",
  Select = "selectProps",
  DatePicker = "datePickerProps",
  InputNumber = "inputNumberProps",
  Slider = "sliderProps",
  Switch = "switchProps",
  Upload = "uploadProps",
  Cascader = "cascaderProps",
  Radio = "radioProps",
  checkboxProps = "checkboxProps",
  TreeSelect = "treeSelectProps",
  Button = "buttonProps",
}

export interface ComponentPropsBase {
  component: string
}

// 表单项的配置
export type FormItemConfig = {
  label: string
  prop: string
  size?: FormSize
  block?: boolean
  span?: number
  asterisk?: boolean
  required?: boolean
  rules?: Object
  style?: CSSStyleDeclaration
  labelWidth?: string
  showMessage?: Boolean
  inlineMessage?: Boolean
  disabled?: ((cfg: FormItemConfig, model: any) => boolean) | boolean
  visibled?: ((cfg: FormItemConfig, model: any) => boolean) | boolean
} & FormComponentConfig & AnyProperty

export type FormConfigList = FormItemConfig[]

// 图标组件的Props
export interface IconProps {
  prefix?: string | Component
  suffix?: string | Component
  color?: string
  size?: number | string
  type?: IconType
}

// 表单项组件的props
export interface FormItemComponentPropsBase {
  modelValue: any
  disabled?: boolean
  size?: FormSize,
}

// 表单组件的事件名称
export enum FormEmitEventName {
  updateModelValue = 'update:modelValue',
  click = "click",
  input = "input",
  change = "change",
  focus = "focus",
  blur = "blur",
  beforeUpload = "beforeupload",
  uploadSuccess = "uploadsuccess",
  uploadError = "uploaderror",
}

export type FormComponentEmits = {
  "update:model": [value: any]
  beforeUpload: [config: FormItemConfig, data: UploadRawFile]
  uploadSuccess: [config: FormItemConfig, data: { response: any, uploadFile: UploadFile, uploadFiles: UploadFiles }]
  uploadError: [config: FormItemConfig, data: { response: any, uploadFile: UploadFile, uploadFiles: UploadFiles }]
  search: []
}