<template>
  <div class="form-item-wrapper">
    <el-input-number
      :model-value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      :step-strictly="stepStrictly"
      :clearable="clearable"
      :precision="precision"
      :controls="controls"
      :controls-position="controlsPosition"
      :placeholder="placeholder"
      :value-on-clear="valueOnClear"
      @change="changeHandle">
    </el-input-number>
  </div>
</template>
<script setup lang="ts">
import { InputNumberComponentProps } from "../types/InputNumber"
import { EmitEventNameEnumKeys } from "../types/emit";
import { ElInputNumber } from "element-plus"

defineOptions({
  name: "InputNumber"
})

const props = withDefaults(defineProps<InputNumberComponentProps>(), {
  clearable: false,
  min: -Infinity,
  max: Infinity,
  step: 1,
  stepStrictly: false,
  precision: 0,
  controls: true,
  placeholder: "请输入",
  valueOnClear: null
})

const emit = defineEmits([EmitEventNameEnumKeys.onUpdate, "update:modelValue"])

function changeHandle(number: number | undefined) {
  emit(EmitEventNameEnumKeys.onUpdate, number)
  emit('update:modelValue', number)
}
</script>
<style scoped lang="scss">
  
</style>