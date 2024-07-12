import { AnyProperty } from "./Common"
import { ComponentPropsBase, FormItemComponentPropsBase } from "./Form"

export interface TreeSelectItem {
  label?: string
  children?: Array<TreeSelectItem>
  disabled?: boolean
  isLeaf?: string
  class?: string
}

export interface TreeSelectPropsBase {
  data: Array<TreeProps | AnyProperty>
  placeholder?: string
  treeProps?: TreeProps   // 指定tree加载字段
  changeValue?: string  // 自定义change事件返回值，默认为当前选中节点
  nodeKey?: string  // 数节点的唯一标识
  renderAfterExpand?: boolean   // 是否第一次展开某个树节点后才渲染其子节点
  highlightCurrent?: boolean  // 是否高亮当前选中节点
  defaultExpandAll?: boolean  // 是否默认展开所有节点
  expandOnClickNode?: boolean   // 是否在点击节点时展开或者收缩节点
  checkOnClickNode?: boolean  // 是否在点击节点的时候选中节点
  defaultExpandedKeys?: Array<string>   // 默认展开的节点的key的数组
  showCheckbox?: boolean  // 节点是否可被选择
  checkStrictly?: boolean   // 在显示复选框的情况下，是否严格遵循父子不互相管理的做法
  defaultCheckedKeys?: Array<string>  // 默认勾选的节点的key的数组
  accordion?: boolean   // 是否每次只打开一个同级树节点
  indent?: number   // 相邻级节点间的水平缩进，单位为px
}

export interface TreeProps {
  label?: string
  children?: string
  disabled?: string
  isLeaf?: string
  class?: string
}

export type TreeSelectComponentProps = TreeSelectPropsBase & FormItemComponentPropsBase;

export interface TreeSelectProps extends ComponentPropsBase {
  component: "TreeSelect",
  treeSelectProps?: TreeSelectPropsBase
}