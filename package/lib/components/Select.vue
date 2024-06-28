<template>
  <div class="form-item-wrapper">
    <el-select
      :model-value="modelValue"
      :popper-class="popperClass"
      :placeholder="placeholder"
      :disabled="disabled"
      :clearable="clearable"
      :filterable="filterable"
      :multiple="multiple"
      :multiple-limit="multipleLimit"
      :tag-type="tagType"
      :max-collapse-tags="maxCollapseTags"
      :collapse-tags="collapseTags"
      :collapse-tags-tooltip="collapseTagsTooltip"
      :teleported="(teleported as unknown as boolean)"
      :valueKey="valueKey"
      @change="changeHandle">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item[defaultProps.label]"
        :value="item[defaultProps.value]"
      />
    </el-select>
  </div>
</template>
<script setup lang="ts">
import { FormEmitEventName } from '../types';
import { SelectComponentProps } from '../types/Select';
import { ElSelect, ElOption } from "element-plus"
import { withDefaults } from "vue"

defineOptions({
  name: "Select"
})

const props = withDefaults(defineProps<SelectComponentProps>(), {
  multiple: false,
  clearable: false,
  disabled: false,
  placeholder: "请选择",
  collapseTags: false,
  collapseTagsTooltip: false,
  multipleLimit: 0,
  popperClass: "",
  fitInputWidth: false,
  tagType: "",
  defaultProps() {
    return {
      label: "label",
      value: "value"
    }
  },
  options() {
    return []
  },
})

const emit = defineEmits([
  FormEmitEventName.updateModelValue,
  FormEmitEventName.change,
])

function changeHandle(value: any) {
  emit(FormEmitEventName.updateModelValue, value)
  emit(FormEmitEventName.change, value)
}
</script>
<style scoped lang="scss">
  
</style>