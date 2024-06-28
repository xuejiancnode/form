import { Component } from "vue"
import { FormItemComponentPropsBase } from "./Form"

export interface DatePickerPropsBase {
  clearable?: boolean
  placeholder?: string
  startPlaceholder?: string
  endPlaceholder?: string
  rangeSeparator?: string
  type?: 'year' | 'month' | 'date' | 'dates' | 'datetime' | 'week' | 'datetimerange' | 'daterange' | 'monthrange'
  defaultValue?: Date | [Date, Date]
  format?: string
  valueFormat?: string
  unlinkPanels?: boolean
  teleported?: boolean
  popperClass?: string
  prefixIcon?: string | Component
}

export interface DatePickerComponentProps extends DatePickerPropsBase, FormItemComponentPropsBase { }