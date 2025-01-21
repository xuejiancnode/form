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
      :valueKey="fieldProps.value"
      @change="changeHandle">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item[fieldProps.label]"
        :value="item[fieldProps.value]"
        />
      <template v-for="(_, name) in slots" #[name]>
        <slot :name="name"></slot>
      </template>
    </el-select>
  </div>
</template>
<script setup lang="ts">
import { FormEmitEventName } from '../types';
import { SelectComponentProps } from '../types/Select';
import { ElSelect, ElOption } from "element-plus"
import { withDefaults } from "vue"
import { mergeProps } from '../util';

defineOptions({
  name: "Select"
})

const slots = defineSlots<{
  default(): any,
  prefix(): any,
  empty(): any,
}>()

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
  options() {
    return []
  },
})

const fieldProps = computed(() => {
  return mergeProps({
    label: "label",
    value: 'value'
  }, props.fieldProps)
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
.form-item-wrapper {
  width: 220px;
}
</style>