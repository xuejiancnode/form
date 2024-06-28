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
      @input="inputHandle"
      @change="changeHandle">
    </el-slider>
  </div>
</template>
<script setup lang="ts">
import { FormEmitEventName } from '../types';
import { SliderComponentProps } from '../types/Slider';
import { ElSlider } from "element-plus"
import { withDefaults } from "vue"

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

const emit = defineEmits([
  FormEmitEventName.updateModelValue,
  FormEmitEventName.input,
  FormEmitEventName.change
])

function inputHandle(val: number | number[]) {
  emit(FormEmitEventName.updateModelValue, val)
  emit(FormEmitEventName.input, val)
}

function changeHandle(val: number | number[]) {
  emit(FormEmitEventName.change, val)
}
</script>
<style scoped lang="scss">
  
</style>