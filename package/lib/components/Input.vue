<template>
  <div class="form-item-wrapper">
    <el-input 
      :type="type"
      :model-value="modelValue"
      :placeholder="placeholder"
      :clearable="clearable"
      :disabled="disabled" 
      :maxlength="maxlength"
      @input="inputHandle"
      @change="changeHandle"
      @focus="focusHandle"
      @blur="blurHandle">
      <template v-if="iconProps.prefix" #prefix>
        <Icon 
          v-if="iconProps.prefix"
          :type="iconProps.type" 
          :name="iconProps.prefix" 
          :size="iconProps.size"
          :color="iconProps.color" /> 
      </template>
      <template v-if="iconProps.suffix" #suffix>
        <Icon 
          v-if="iconProps.suffix"
          :type="iconProps.type" 
          :name="iconProps.suffix" 
          :size="iconProps.size"
          :color="iconProps.color" /> 
      </template>
      <template v-if="prepend" #prepend>
        <span>
          {{ typeof prepend === 'string' ? prepend : '' }}
          <component v-if="(typeof prepend) !== 'string'" :is="prepend"></component>
        </span>
      </template>
      <template v-if="append" #append>
        <span>
          {{ typeof append === 'string' ? append : '' }}
          <component v-if="(typeof append) !== 'string'" :is="append"></component>
        </span>
      </template>
      <template v-for="(_, name) in slots" #[name]>
        <slot :name="name"></slot>
      </template>
    </el-input>
  </div>
</template>
<script setup lang="ts">
import { FormEmitEventName } from '../types';
import { InputComponentProps } from '../types/Input';
import { ElInput } from "element-plus"
import { withDefaults } from "vue"
import Icon from "./Icon/index.vue"
import { mergeProps } from '../util';

defineOptions({
  name: "Input"
})

const slots = defineSlots<{
  prefix(): any
  suffix(): any
  prepend(): any
  append(): any
}>()

const props = withDefaults(defineProps<InputComponentProps>(), {
  type: "text",
  clearable: false,
  disabled: false,
  placeholder: "请输入",
})

const iconProps = computed(() => {
  return mergeProps({
    prefix: "",
    suffix: "",
    color: "",
    size: "",
    type: 'class'
  }, props.iconProps)
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