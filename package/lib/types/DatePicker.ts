import { Component } from "vue"
import { ComponentPropsBase, FormItemComponentPropsBase } from "./Form"

type DatePickerType = 'year' | 'month' | 'date' | 'dates' | 'datetime' | 'week' | 'datetimerange' | 'daterange' | 'monthrange';
export interface DatePickerPropsBase {
  clearable?: boolean
  placeholder?: string
  startPlaceholder?: string
  endPlaceholder?: string
  rangeSeparator?: string
  type?: DatePickerType
  defaultValue?: Date | [Date, Date]
  format?: string
  valueFormat?: string
  unlinkPanels?: boolean
  teleported?: boolean
  popperClass?: string
  prefixIcon?: string | Component
}

export type DatePickerComponentProps = DatePickerPropsBase & FormItemComponentPropsBase;

export interface DatePickerProps extends ComponentPropsBase {
  component: "DatePicker",
  datePickerProps?: DatePickerPropsBase
}