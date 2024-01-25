<template>
  <div class="form-item-wrapper">
    <el-switch
      :model-value="modelValue"
      :loading="loadingState"
      :width="width"
      :inline-prompt="inlinePrompt"
      :active-text="activeText"
      :inactive-text="inactiveText"
      :active-value="activeValue"
      :inactive-value="inactiveValue"
      :before-change="beforeChangeHandle"
      @change="changeHandle">
    </el-switch>
  </div>
</template>
<script setup lang="ts">
import { SwitchComponentProps } from '../types';
import { EmitEventNameEnumKeys } from '../types/emit';
import { ref } from "vue"
import { ElSwitch } from "element-plus"

defineOptions({
  name: "Switch"
})

const props = withDefaults(defineProps<SwitchComponentProps>(), {
  loading: false,
  inlinePrompt: false,
  activeValue: true,
  inactiveValue: false,
})

const loadingState = ref(false)

const emit = defineEmits([EmitEventNameEnumKeys['onUpdate:modelValue']])

function changeHandle(val: boolean | string | number) {
  emit(EmitEventNameEnumKeys['onUpdate:modelValue'], val)
}

async function beforeChangeHandle() {
  let state = true
  if (props.beforeChange) { 
    if(props.loading) loadingState.value = !loadingState.value

    state = await props.beforeChange();

    if(props.loading) loadingState.value = !loadingState.value
  } 
  return state
}
</script>
<style scoped lang="scss">
  
</style>