<template>
  <div class="form-item-wrapper">
    <el-autocomplete
      :model-value="modelValue"
      :placeholder="placeholder"
      :clearable="clearable"
      :valueKey="valueKey"
      :debounce="debounce"
      :placement="placement"
      :disabled="disabled"
      :trigger-on-focus="triggerOnFocus"
      :select-when-unmatched="selectWhenUnmatched"
      :hide-loading="hideLoading"
      :popper-class="popperClass"
      :teleported="teleported"
      :highlight-first-item="highlightFirstItem"
      :fit-input-width="fitInputWidth"
      :fetch-suggestions="fetchSuggestions"
      @input="inputHandle"
      @select="selectHandle"
      @change="changeHandle"
      @focus="focusHandle"
      @blur="blurHandle"
    >
      <template #default="{ item }" v-if="suggestionItem">
        <component :is='suggestionItem' :item="item"></component>
      </template> 
      <template #prefix v-if="prefix">
        <div v-if="typeof prefix === 'string'">
          {{ prefix }}
        </div>
        <component :is='prefix' v-else></component>
      </template> 
      <template #suffix v-if="suffix">
        <div v-if="typeof suffix === 'string'">
          {{ suffix }}
        </div>
        <component :is='suffix' v-else></component>
      </template> 
      <template #prepend v-if="prepend">
        <div v-if="typeof prepend === 'string'">
          {{ prepend }}
        </div>
        <component :is='prepend' v-else></component>
      </template> 
      <template #append v-if="append">
        <div v-if="typeof append === 'string'">
          {{ append }}
        </div>
        <component :is='append' v-else></component>
      </template>
      <template v-for="(_, name) in slots" #[name]="{ item }">
        <slot :name="name" :item="item"></slot>
      </template>
    </el-autocomplete>
  </div>
</template>
<script setup lang="ts">
import {
  AutocompleteComponentProps,
  FormEmitEventName
} from "../types"

defineOptions({
  name: "Autocomplete"
})

const props = withDefaults(defineProps<AutocompleteComponentProps>(), {
  placeholder: "请输入",
  valueKey: 'value',
  debounce: 300,
  placement: 'bottom-start',
  triggerOnFocus: true,
  selectWhenUnmatched: false,
  teleported: true,
  fetchSuggestions: () => {
    return (_q: string, cb: (suggestions: any[]) => void) => {
      cb([])
    }
  },
})

const emit = defineEmits([
  'update:modelValue',
  FormEmitEventName.blur,
  FormEmitEventName.focus,
  FormEmitEventName.input,
  FormEmitEventName.change,
  FormEmitEventName.select,
])

const slots = defineSlots<{
  prefix(): any
  suffix(): any
  prepend(): any
  append(): any
  suggestionItem(item: Record<string, any>): any
}>()

function inputHandle(value: string) {
  if (props.inputRule && !props.inputRule(value)) return;
  emit(FormEmitEventName.updateModelValue, value)
  emit(FormEmitEventName.input, value)
}

function selectHandle(item: Record<string, any>) {
  console.log('selectHandle', item);
  
  emit(FormEmitEventName.select, item)
}

function changeHandle(value: string) {
  console.log('changeHandle', value);
  
  emit(FormEmitEventName.change, value)
}


function focusHandle(e: any) {
  emit(FormEmitEventName.focus, e)
}

function blurHandle(e: any) {
  emit(FormEmitEventName.blur, e)
}

</script>
<style scoped lang="scss">
  
</style>