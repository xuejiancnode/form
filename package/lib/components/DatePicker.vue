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
import { FormEmitEventName } from '../types';
import { DatePickerComponentProps } from '../types/DatePicker';
import { ElDatePicker } from "element-plus"
import { withDefaults, ref, watchEffect } from "vue"

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

const emit = defineEmits([
  FormEmitEventName.updateModelValue,
  FormEmitEventName.change
])

const dateValue = ref("")

watchEffect(() => {
  dateValue.value = props.modelValue
})

function changeHandle(date: any) {
  emit(FormEmitEventName.updateModelValue, date)
  emit(FormEmitEventName.change, date)
}
</script>
<style scoped lang="scss">
  
</style>