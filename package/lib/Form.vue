<template>
  <div class="form-component">
    <el-form 
      ref="formRef"
      :inline="inline" 
      :label-width="labelWidth"
      :label-position="labelPosition"
      :size="size"
      :disabled="disabled"
      :rules="rules"
      :model="model">
      <template v-if="autoColumn">
        <FormBase 
          v-for="(config, index) in (formConfig as FormConfigList)" 
          :key="index"
          :config="config" 
          :model="model"
          @update:modelValue="(value) => updateModelValue(config, value)"
          @click.self="(action) => clickHandle(config, action)"
          @before-upload="(data) => beforeUpload(config, data)"
          @upload-success="(data) => uploadSuccess(config, data)"
          @upload-error="(data) => uploadError(config, data)">
        </FormBase>
      </template>
      <template v-else>
        <el-row v-for="(row, rowIndex) in (formConfig as FormConfigList[])" :key="rowIndex" :gutter="gutter">
          <el-col v-for="(col, colIndex) in row" :key="colIndex" :span="col.span === undefined ? (24 / (columns || 1)) : col.span">
            <FormBase 
              :config="col" 
              :model="model"
              @update:modelValue="(value) => updateModelValue(col, value)"
              @click.self="(action) => clickHandle(col, action)"
              @before-upload="(data) => beforeUpload(col, data)"
              @upload-success="(data) => uploadSuccess(col, data)"
              @upload-error="(data) => uploadError(col, data)">
            </FormBase>
          </el-col>
        </el-row>
      </template>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { FormConfigList, FormEmitEventName, FormComponentProps, FormItemConfig } from './types';
import { ElForm, ElMessage } from "element-plus"
import { calcLayoutCount } from './util';
import FormBase from './FormBase.vue';
import "element-plus/theme-chalk/index.css"

defineOptions({
  name: "Form"
})

const props = withDefaults(defineProps<FormComponentProps>(), {
  config() {
    return []
  },
  model: {},
  inline: true,
  labelWidth: '',
  labelPosition: "right",
  searchText: "搜索",
  clearText: "清空",
})

const emit = defineEmits([
  ...Object.values(FormEmitEventName),
  'update:model'
])

const formConfig = computed(() => {
  if (props.inline) {

    if (props.autoColumn) {
      return resetSpan(props.config)
    }

    return resetSpan(calcLayoutCount(props.config, props.columns))
  }
  
  return resetSpan(props.config.map(item => {
    return [item]
  }))
})

/**
 * 根据visibled属性，动态计算span
 */
function resetSpan(config: FormConfigList | FormConfigList[]) {
  if (Array.isArray(config[0])) { 
    return (config as FormConfigList[]).map(row => {
      return row.map(item => {
        if (
          (item.visibled !== undefined && !item.visibled) || 
          (typeof item.visibled === 'function' && !item.visibled(item, props.model))
        ) {
          return {
            ...item,
            span: 0,
          }
        }
        return item
      })
    })
  }

  return (config as FormConfigList).map(item => {
    if (
      (item.visibled !== undefined && !item.visibled) || 
      (typeof item.visibled === 'function' && !item.visibled(item, props.model))
    ) {
      
      
      return {
        ...item,
        span: 0,
      }
    }
    return item
  })
}

function updateModelValue(config: FormItemConfig, value: any) {
  emit('update:model', Object.assign(props.model, {
    [config.prop]: value
  }))
}

function clickHandle(config: FormItemConfig, action: string) {
  emit(FormEmitEventName.click, {
    action,
    config
  })
}

function beforeUpload(config: FormItemConfig, data: any) {
  emit(FormEmitEventName.beforeUpload, config, data)
}

function uploadSuccess(config: FormItemConfig, data: any) {
  emit('update:model', Object.assign(props.model, {
    [config.prop]: data.response.data[config.uploadProps.response?.filePath || 'filePath']
  }))
  emit(FormEmitEventName.uploadSuccess, config, data)
}

function uploadError(config: FormItemConfig, data: any) {
  ElMessage({
    message: data.response.message,
    type: "error"
  })
  emit(FormEmitEventName.uploadError, config, data)
}

const formRef = ref<InstanceType<typeof ElForm>>()

function getInstance() {
  return formRef.value
}

defineExpose({
  getInstance
})
</script>

<style lang="scss">
@import "./styles/common.scss";
</style>
<style scoped lang="scss">
.el-col .el-form-item {
  margin-right: 0;
}
.el-row {
  width: 100%;
}
</style>