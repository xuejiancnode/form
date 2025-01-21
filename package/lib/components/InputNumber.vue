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
      @change="changeHandle"
      @focus="focusHandle"
      @blur="blurHandle">
    </el-input-number>
  </div>
</template>
<script setup lang="ts">
import { FormEmitEventName } from "../types";
import { InputNumberComponentProps } from "../types/InputNumber"
import { ElInputNumber } from "element-plus"
import { withDefaults } from "vue"

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

const emit = defineEmits([
  FormEmitEventName.updateModelValue,
  FormEmitEventName.change,
  FormEmitEventName.focus,
  FormEmitEventName.blur
])

function changeHandle(number: number | undefined) {
  emit(FormEmitEventName.updateModelValue, number)
  emit(FormEmitEventName.change)
}

function focusHandle(e) {
  emit(FormEmitEventName.focus, e)
}

function blurHandle(e) {
  emit(FormEmitEventName.blur, e)
}
</script>
<style scoped lang="scss">
  
</style>