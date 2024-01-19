<template>
  <div class="form-item-wrapper">
    <el-slider
      :model-value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      :show-input="showInput"
      :show-input-controls="showInputControls"
      :debounce="debounc"
      :show-stops="showStops"
      :show-tooltip="showTooltip"
      :placement="placement"
      :format-tooltip="formatTooltip"
      :range="range"
      :vertical="vertical"
      :height="height"
      @input="inputHandle">
    </el-slider>
  </div>
</template>
<script setup lang="ts">
import { SliderComponentProps } from '../types/Slider';
import { EmitEventNameEnumKeys } from '../types/emit';
import { ElSlider } from "element-plus"

defineOptions({
  name: "Slider"
})

const props = withDefaults(defineProps<SliderComponentProps>(), {
  min: 0,
  max: 100,
  step: 1,
  showInput: false,
  showInputControls: true,
  showStops: false,
  showTooltip: true,
  placement: "top",
  range: false,
  vertical: false,
  height: "200px"
})

const emit = defineEmits([EmitEventNameEnumKeys.onUpdate, "update:modelValue"])

function inputHandle(val: number | number[]) {
  emit(EmitEventNameEnumKeys.onUpdate, val)
  emit('update:modelValue', val)
}
</script>
<style scoped lang="scss">
  
</style>