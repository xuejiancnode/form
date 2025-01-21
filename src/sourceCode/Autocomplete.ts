const Autocomplete = `
<template>
  <div style="width: 250px;">
    <Autocomplete 
      v-model:model-value="value" 
      placeholder="请输入搜索内容"
      clearable
      :fetch-suggestions="fetchSuggestions"
      :input-rule="inputRuleHandle"
      @select="selectHandle">
      <template #default="{ item }">
        <div>
          <span>组件名：</span>
          <span>{{ item.value }}</span>
        </div>
      </template>
      <template #append>
        <span>.vue</span>
      </template>
    </Autocomplete>
  </div>
</template>
<script setup lang="ts">
import Autocomplete from "../../package/lib/components/Autocomplete.vue"
import { ref } from "vue";

defineOptions({
  name: "AutocompleteDemo"
})

const value = ref("");

const suggestions = [
  { value: "Autocomplete" },
  { value: "Button" },
  { value: "Input" },
  { value: "InputNumber" },
  { value: "Select" },
  { value: "Cascader" },
  { value: "Checkbox" },
  { value: "CheckboxButton" },
  { value: "CheckboxGroup" },
  { value: "DatePicker" },
  { value: "TimePicker" },
  { value: "TimeSelect" },
  { value: "Rate" },
  { value: "ColorPicker" },
  { value: "Transfer" },
  { value: "Slider" },
  { value: "Switch" },
]

const fetchSuggestions = (query: string, cb: Function) => {
  const results = suggestions.filter(item => item.value.toLowerCase().includes(query.toLowerCase()))
  cb(results)
}

/**
 * 校验输入内容
 * @param value 输入的值
 */
function inputRuleHandle(value: string) { 
  // 不允许输入中文
  if (/[\\u4e00-\\u9fa5]/.test(value)) {
    return false
  }
  return true
}

function selectHandle(item: any) {
  console.log(item)
}

</script>
<style scoped lang="scss">
  
</style>`;
export default Autocomplete;
      