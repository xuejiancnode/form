import { Component } from "vue"
import { AnyProperty } from "../types"

const customComponents: AnyProperty<Component> = {}

export function getCustomComponents() {
  return customComponents
}
  
export function registerComponent(name: string, component: Component) {
  customComponents[name] = component
}
