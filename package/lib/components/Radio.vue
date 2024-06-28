<template>
  <div>
    <el-radio-group :model-value="modelValue" @change="valueChange">
      <template v-for="item in options">
        <el-radio :label="item.value">{{ item.label }}</el-radio>
      </template>
    </el-radio-group>
  </div>
</template>
<script setup lang="ts">
import { withDefaults } from "vue"
import {
  FormEmitEventName,
  RadioComponentProps,
} from '../types';

defineOptions({
  name: "Radio"
})

const props = withDefaults(defineProps<RadioComponentProps>(), {
  modelValue: "",
  disabled: false,
  label: "label",
  value: "value",
})

const emit = defineEmits([
  FormEmitEventName.updateModelValue,
  FormEmitEventName.change,
])

function valueChange(val: any) {
  emit(FormEmitEventName.updateModelValue, val)
  emit(FormEmitEventName.change, val)
}
</script>
<style scoped lang="scss">
  
</style>