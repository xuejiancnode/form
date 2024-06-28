<template>
  <div>
    <el-tree-select
      :data="data"
      :placeholder="placeholder"
      :model-value="modelValue"
      :props="treeProps"
      :node-key="nodeKey"
      :render-after-expand="renderAfterExpand"
      :highlight-current="highlightCurrent"
      :default-expand-all="defaultExpandAll"
      :expand-on-click-node="expandOnClickNode"
      :check-on-click-node="checkOnClickNode"
      :default-expanded-keys="defaultExpandedKeys"
      :default-checked-keys="defaultCheckedKeys"
      :show-checkbox="showCheckbox"
      :check-strictly="checkStrictly"
      :accordion="accordion"
      :indent="indent"
      @current-change="valueChangeHandle"
    >
    </el-tree-select>
  </div>
</template>
<script setup lang="ts">
import {
  FormEmitEventName,
  TreeSelectComponentProps,
} from '../types';
import { withDefaults, computed } from "vue"
import { mergeProps } from '../util';

defineOptions({
  name: "TreeSelect"
})

const props = withDefaults(defineProps<TreeSelectComponentProps>(), {
  modelValue: "",
  treeProps() {
    return {
      label: "label",
      children: "children"
    }
  }
})

const treeProps = computed(() => {
  return mergeProps(props.treeProps, {
    label: "label",
    children: "children",
    disabled: false,
  })
})

const emit = defineEmits([
  FormEmitEventName.updateModelValue,
  FormEmitEventName.change
])

function valueChangeHandle(node: any) {
  let val = node
  if (props.changeValue) {
    if (props.changeValue in node) {
      val = node[props.changeValue]
    } else {
      console.warn('change-value 指定的属性在 node 对象中不存在。');
    }
  }
  emit(FormEmitEventName.updateModelValue, val)
  emit(FormEmitEventName.change, val)
}
</script>
<style scoped lang="scss">
  
</style>