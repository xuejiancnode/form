import { ComponentPropsBase, FormItemComponentPropsBase } from "./Form";

export interface SliderPropsBase {
  min?: number
  max?: number
  step?: number
  showInput?: boolean
  showInputControls?: boolean
  debounc?: number
  showStops?: boolean
  showTooltip?: boolean
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
  formatTooltip?: (value: number) => number | string
  range?: boolean
  vertical?: boolean
  height?: string
}

export type SliderComponentProps = SliderPropsBase & FormItemComponentPropsBase;

export interface SliderProps extends ComponentPropsBase {
  component: 'Slider',
  sliderProps?: SliderPropsBase
}