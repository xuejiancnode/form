<template>
  <div class="form-item-wrapper">
    <el-cascader
      ref="cascaderRef"
      :model-value="modelValue"
      :options="options"
      :props="fieldProps"
      :placeholder="placeholder"
      :clearable="clearable"
      :disabled="disabled"
      :show-all-levels="showAllLevels"
      :collapse-tags="collapseTags"
      :collapse-tags-tooltip="collapseTagsTooltip"
      :separator="separator"
      :filterable="filterable"
      :filter-method="filterMethod"
      :debounce="debounce"
      :before-filter="beforeFilter"
      :popper-class="popperClass"
      :teleported="teleported"
      :tag-type="tagType"
      @change="handleChange"
    >
      <template v-for="(_, name) in slots" #[name]="scopeData">
        <slot :name="name" v-bind="scopeData"></slot>
      </template>
    </el-cascader>
  </div>
</template>
<script setup lang="ts">
import { withDefaults, ref } from "vue";
import { CascaderComponentProps, FormEmitEventName } from "../types";
import { CascaderNode, CascaderValue, ElCascader as ElCascaderComponent } from "element-plus";
import { mergeProps } from "../util";

defineOptions({
  name: "Cascader"
})

const slots = defineSlots<{
  default(scopeData: {node: any, data: any}): any
  empty(): any
}>()

const props = withDefaults(defineProps<CascaderComponentProps>(), {
  modelValue: [],
  options() {
    return []
  },
  clearable: false,
  showAllLevels: true,
  collapseTagsTooltip: false,
  separator: "/",
  debounce: 300,
  popperClass: "",
  teleported: true,
  tagType: "info"
})

const fieldProps = computed(() => {
  return mergeProps({
    label: "label",
    value: "value",
  }, props.fieldProps)
})

const emit = defineEmits([
  FormEmitEventName.updateModelValue,
  FormEmitEventName.change,
])

const cascaderRef = ref<InstanceType<typeof ElCascaderComponent>>()

function handleChange(value: CascaderValue) {
  emit(FormEmitEventName.updateModelValue, value)
  emit(FormEmitEventName.change, value)
}

function getCheckedNodes(leafOnly: boolean): CascaderNode[] | undefined {
  return cascaderRef.value?.getCheckedNodes(leafOnly)
}

defineExpose({
  getCheckedNodes
})
</script>
<style scoped lang="scss">
.form-item-wrapper {
  width: 220px;
}
</style>