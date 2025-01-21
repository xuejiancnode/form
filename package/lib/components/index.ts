import { Component } from "vue"
import { AnyProperty } from "../types"

const customComponents: AnyProperty<Component> = {}

export function getCustomComponents() {
  return customComponents
}

/**
 * 注册自定义组件
 * @param name 组件名称
 * @param component 组件实例
 */
export function registerComponent(name: string, component: Component) {
  customComponents[name] = component
}
