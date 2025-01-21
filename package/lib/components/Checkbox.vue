<template>
  <div>
    <el-checkbox-group :model-value="modelValue" @change="checkboxChange">
      <template v-for="item in options">
        <el-checkbox :label="item[fieldProps.value]">
          {{ item[fieldProps.label] }}
        </el-checkbox>
      </template>
    </el-checkbox-group>
  </div>
</template>
<script setup lang="ts">
import { withDefaults } from "vue";
import { CheckboxComponentProps, FormEmitEventName } from "../types";
import { CheckboxValueType } from "element-plus";
import { mergeProps } from "../util";

defineOptions({
  name: "Checkbox"
})

const props = withDefaults(defineProps<CheckboxComponentProps>(), {
  modelValue() {
    return []
  },
})

const fieldProps = computed(() => {
  return mergeProps({
    label: "label",
    value: "value",
  }, props.fieldProps)
})

const emit = defineEmits([
  FormEmitEventName.updateModelValue,
  FormEmitEventName.change
])

function checkboxChange(value: Array<CheckboxValueType>) {
  emit(FormEmitEventName.updateModelValue, value)
  emit(FormEmitEventName.change, value)
}
</script>
<style scoped lang="scss">
  
</style>