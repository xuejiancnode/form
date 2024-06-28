import { Component } from "vue";

export type IconType = 'class' | 'svg' | 'img';

export interface IconProperty {
  size?: number | string
  color?: string
  type?: IconType
}


export interface IconComponentProps extends IconProperty {
  name: string | Component
}
