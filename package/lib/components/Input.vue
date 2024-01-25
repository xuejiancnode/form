<template>
  <div class="form-item-wrapper">
    <el-input 
      :model-value="modelValue"
      :placeholder="placeholder"
      :clearable="clearable"
      :disabled="disabled" 
      :maxlength="maxlength"
      :suffix-icon="suffixIcon"
      :prefix-icon="prefixIcon"
      @input="inputHandle">
    </el-input>
  </div>
</template>
<script setup lang="ts">
import { EmitEventNameEnumKeys } from '../types/emit';
import { InputComponentProps } from '../types/Input';
import { ElInput } from "element-plus"

defineOptions({
  name: "Input"
})

const props = withDefaults(defineProps<InputComponentProps>(), {
  type: "text",
  clearable: false,
  disabled: false,
  placeholder: "请输入",
})

const emit = defineEmits([EmitEventNameEnumKeys['onUpdate:modelValue']])

function inputHandle(val: any) {
  emit(EmitEventNameEnumKeys['onUpdate:modelValue'], val)
}
</script>
<style scoped lang="scss">
  
</style>