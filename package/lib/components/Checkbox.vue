<template>
  <div>
    <el-checkbox-group :model-value="modelValue" @change="checkboxChange">
      <template v-for="item in options">
        <el-checkbox :label="item[value]">
          {{ item[label] }}
        </el-checkbox>
      </template>
    </el-checkbox-group>
  </div>
</template>
<script setup lang="ts">
import { withDefaults } from "vue";
import { CheckboxComponentProps, FormEmitEventName } from "../types";
import { CheckboxValueType } from "element-plus";

defineOptions({
  name: "Checkbox"
})

const props = withDefaults(defineProps<CheckboxComponentProps>(), {
  modelValue() {
    return []
  },
  label: "label",
  value: "value",
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