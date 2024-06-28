import { FormRules, UploadFile, UploadFiles, UploadRawFile } from "element-plus"
import {
  InputPropsBase,
  SelectPropsBase,
  DatePickerPropsBase,
  InputNumberPropsBase,
  SliderPropsBase,
  SwitchPropsBase,
  IconType,
  CascaderComponentProps,
  CascaderPropsBasic,
  CascaderPropsBase,
  CheckboxPropsBase,
  CheckboxProps,
  RadioProps,
  TreeSelectProps,
  ButtonProps
} from "./index"
import { UploadPropsBase } from "./Upload"
import { Component } from "vue"

export type FormSize = '' | 'large' | 'default' | 'small'
export type ThemeType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | ''

// 表单组件的props
export interface FormComponentProps {
  config: FormConfigList
  model: any
  inline?: boolean
  labelWidth?: string
  labelPosition?: 'left' | 'right' | 'top',
  rules?: FormRules,
  // search?: boolean
  // searchText?: string
  // clear?: boolean
  // clearText?: string
  disabled?: boolean
  size?: FormSize
  columns?: number  // 表单需要被分成多少列
  autoColumn?: boolean  // 当为行排列时是否开启自动计算列数，开启后columns无效
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

// 表单项的配置
export interface FormItemConfig {
  label: string
  prop: string
  type: string
  size?: FormSize
  block?: boolean   // 是否独自展示到一行
  span?: number // 在行展示中占据的比例
  inputProps?: InputPropsBase
  selectProps?: SelectPropsBase
  datePickerProps?: DatePickerPropsBase
  inputNumberProps?: InputNumberPropsBase
  sliderProps?: SliderPropsBase
  switchProps?: SwitchPropsBase
  uploadProps?: UploadPropsBase
  cascaderProps?: CascaderPropsBase
  checkboxProps?: CheckboxProps
  radioProps?: RadioProps
  treeSelectProps?: TreeSelectProps
  buttonProps?: Array<ButtonProps>
  disabled?: () => boolean
  visibled?: () => boolean
}

export type FormConfigList = FormItemConfig[]

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
  prop?: string
  disabled?: boolean
  size?: FormSize,
}

export enum FormEmitEventName {
  updateModelValue = 'update:modelValue',
  click = "click",
  input = "input",
  change = "change",
  focus = "focus",
  blur = "blur",
  beforeUpload = "beforeUpload",
  uploadSuccess = "uploadSuccess",
  uploadError = "uploadError",
}

export type FormComponentEmits = {
  "update:model": [value: any]
  beforeUpload: [config: FormItemConfig, data: UploadRawFile]
  uploadSuccess: [config: FormItemConfig, data: { response: any, uploadFile: UploadFile, uploadFiles: UploadFiles }]
  uploadError: [config: FormItemConfig, data: { response: any, uploadFile: UploadFile, uploadFiles: UploadFiles }]
  search: []
}