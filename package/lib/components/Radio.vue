<template>
  <div>
    <el-radio-group :model-value="modelValue" @change="valueChange">
      <template v-for="item in options">
        <el-radio :label="item[fieldProps.value]">{{ item[fieldProps.label] }}</el-radio>
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
import { mergeProps } from "../util";

defineOptions({
  name: "Radio"
})

const props = withDefaults(defineProps<RadioComponentProps>(), {
  modelValue: "",
  disabled: false,
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

function valueChange(val: any) {
  emit(FormEmitEventName.updateModelValue, val)
  emit(FormEmitEventName.change, val)
}
</script>
<style scoped lang="scss">
  
</style>