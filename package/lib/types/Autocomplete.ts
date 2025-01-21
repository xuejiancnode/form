import { Component } from "vue";
import { FormItemComponentPropsBase, IconProps } from "./Form";
import { ComponentPropsBase } from "./Form";

export type Placement = 'top' | 'top- start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end';

export interface AutocompletePropsBase {
  maxlength?: string | number
  placeholder?: string
  clearable?: boolean
  valueKey?: string
  debounce?: number
  placement?: Placement
  triggerOnFocus?: boolean
  selectWhenUnmatched?: boolean
  hideLoading?: boolean
  popperClass?: string
  teleported?: boolean
  highlightFirstItem?: boolean
  fitInputWidth?: boolean
  suggestionItem?: Component
  prepend?: string | Component
  append?: string | Component
  prefix?: string | Component
  suffix?: string | Component
  inputRule?: (value: string) => boolean
  fetchSuggestions?: (queryString: string, cb: (suggestions: any[]) => void) => void
}

export type AutocompleteComponentProps = AutocompletePropsBase & FormItemComponentPropsBase;

export interface AutocompleteProps extends ComponentPropsBase {
  component: 'Autocomplete'
  autocompleteProps?: AutocompletePropsBase
}