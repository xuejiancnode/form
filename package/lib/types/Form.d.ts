import { FormRules, UploadFile, UploadFiles, UploadRawFile } from "element-plus"
import {
  InputPropsBase,
  SelectPropsBase,
  DatePickerPropsBase,
  InputNumberPropsBase,
  SliderPropsBase,
  SwitchPropsBase
} from "./index"
import { UploadPropsBase } from "./Upload"
import { Component } from "vue"

export type FormSize = '' | 'large' | 'default' | 'small'

// 表单组件的props
export interface FormComponentProps {
  config: FormConfigList
  model: any
  inline?: boolean
  labelWidth?: string
  labelPosition?: 'left' | 'right' | 'top',
  rules?: FormRules,
  search?: boolean
  searchText?: string
  clear?: boolean
  clearText?: string
}

// 表单项的配置
export interface FormItemConfig {
  label: string
  prop: string
  type: string
  size?: FormSize
  inputProps?: InputPropsBase
  selectProps?: SelectPropsBase
  datePickerProps?: DatePickerPropsBase
  inputNumberProps?: InputNumberPropsBase
  sliderProps?: SliderPropsBase
  switchProps?: SwitchPropsBase
  uploadProps?: UploadPropsBase
  disabled?: () => boolean
  visibled?: () => boolean
}

export type FormConfigList = FormItemConfig[]

export interface IconProps {
  prefix?: string | Component
  suffix?: string | Component
  color?: string
  size?: number | string
}

// 表单项组件的props
export interface FormItemComponentPropsBase {
  modelValue: any
  prop?: string
  disabled?: boolean
  size?: FormSize,
}

export type FormComponentEmits = {
  "update:model": [value: any]
  beforeUpload: [config: FormItemConfig, data: UploadRawFile]
  uploadSuccess: [config: FormItemConfig, data: { response: any, uploadFile: UploadFile, uploadFiles: UploadFiles }]
  uploadError: [config: FormItemConfig, data: { response: any, uploadFile: UploadFile, uploadFiles: UploadFiles }]
  search: []
}