<template>
  <div class="form-component">
    <el-form 
      ref="formRef"
      :inline="inline" 
      :label-width="labelWidth"
      :label-position="labelPosition"
      :rules="rules"
      :model="model">
      <template v-for="(cfg, index) in config">
        <FormBase 
          v-if="cfg.visibled === undefined ||  cfg.visibled()"
          :key="index" 
          :config="cfg" 
          :model="model"
          @on-update="(value) => updateHandle(cfg, value)"
          @on-before-upload="(data) => beforeUpload(cfg, data)"
          @on-upload-success="(data) => uploadSuccess(cfg, data)"
          @on-upload-error="(data) => uploadError(cfg, data)">
        </FormBase>
      </template>
      <el-form-item v-if="search">
        <el-button type="primary" @click="searchHandle">{{ searchText }}</el-button>
      </el-form-item>
      <el-form-item v-if="clear">
        <el-button type="default" plain @click="resetHandle">{{ clearText }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import FormBase from './FormBase.vue';
import { FormComponentProps, FormItemConfig, FormComponentEmits } from './types/Form';
import { ElForm, ElMessage, ElFormItem, ElButton } from "element-plus"
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
  clearText: "清空"
})

const emit = defineEmits<FormComponentEmits>()

function updateHandle(config: FormItemConfig, data: any) {
  emit('update:model', Object.assign(props.model, {
    [config.prop]: data
  }))
}

function beforeUpload(config: FormItemConfig, data: any) {
  emit('beforeUpload', config, data)
}

function uploadSuccess(config: FormItemConfig, data: any) {
  emit('update:model', Object.assign(props.model, {
    [config.prop]: data.response.data[config.uploadProps?.response?.filePath || 'filePath']
  }))
  emit('uploadSuccess', config, data)
}

function uploadError(config: FormItemConfig, data: any) {
  ElMessage({
    message: data.response.message,
    type: "error"
  })
  emit('uploadError', config, data)
}

function searchHandle() {
  emit('search')
}

function resetHandle() {
  formRef.value?.resetFields()
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
  
</style>