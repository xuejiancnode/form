<template>
  <div class="form-item-wrapper">
    <el-input 
      :type="type"
      :model-value="modelValue"
      :placeholder="placeholder"
      :clearable="clearable"
      :disabled="disabled" 
      :maxlength="maxlength"
      :suffix-icon="suffixIcon"
      :prefix-icon="prefixIcon"
      @input="inputHandle"
      @change="changeHandle"
      @focus="focusHandle"
      @blur="blurHandle">
    </el-input>
  </div>
</template>
<script setup lang="ts">
import { FormEmitEventName } from '../types';
import { InputComponentProps } from '../types/Input';
import { ElInput } from "element-plus"
import { withDefaults } from "vue"

defineOptions({
  name: "Input"
})

const props = withDefaults(defineProps<InputComponentProps>(), {
  type: "text",
  clearable: false,
  disabled: false,
  placeholder: "请输入",
})

const emit = defineEmits([
  FormEmitEventName.updateModelValue,
  FormEmitEventName.change,
  FormEmitEventName.input,
  FormEmitEventName.focus,
  FormEmitEventName.blur
])

function inputHandle(val: any) {
  if (props.inputRule && !props.inputRule(val)) return false;
  emit(FormEmitEventName.updateModelValue, val)
  emit(FormEmitEventName.input, val)
}

function changeHandle(val: any) {
  emit(FormEmitEventName.change, val)
}

function focusHandle(e: any) {
  emit(FormEmitEventName.change, e)
}

function blurHandle(e: any) {
  emit(FormEmitEventName.change, e)
}
</script>
<style scoped lang="scss">
  
</style>