<template>
  <div>
    <el-date-picker
      v-model:model-value="dateValue"
      :clearable="clearable"
      :format="format"
      :value-format="valueFormat"
      :type="type"
      :placeholder="placeholder"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
      :range-separator="rangeSeparator"
      :unlink-panels="unlinkPanels"
      :teleported="teleported"
      :popper-class="popperClass"
      :default-value="defaultValue"
      :prefix-icon="prefixIcon"
      @change="changeHandle">

    </el-date-picker>
  </div>
</template>
<script setup lang="ts">
import { DatePickerComponentProps } from '../types/DatePicker';
import { EmitEventNameEnumKeys } from '../types/emit';
import { ElDatePicker } from "element-plus"
import { ref, watchEffect } from "vue"

defineOptions({
  name: "DatePicker"
})

const props = withDefaults(defineProps<DatePickerComponentProps>(), {
  clearable: false,
  placeholder: "请选择",
  startPlaceholder: "开始日期",
  endPlaceholder: "结束日期",
  type: "date",
  format: "",
  valueFormat: "",
  rangeSeparator: "-",
})

const emit = defineEmits([EmitEventNameEnumKeys.onUpdate, "update:modelValue"])

const dateValue = ref("")

watchEffect(() => {
  dateValue.value = props.modelValue
})

function changeHandle(date: any) {
  emit(EmitEventNameEnumKeys.onUpdate, date)
  emit('update:modelValue', date)
}
</script>
<style scoped lang="scss">
  
</style>