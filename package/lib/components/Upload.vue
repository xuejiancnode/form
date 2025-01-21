<template>
  <div class="form-item-wrapper">
    <el-upload
      ref="uploadRef"
      :action="action"
      :headers="headers"
      :method="method"
      :data="data"
      :name="name"
      :accept="accept"
      :with-credentials="withCredentials"
      :multiple="multiple"
      :limit="limit"
      :show-file-list="showFileList"
      :drag="drag"
      :auto-upload="autoUpload"
      :list-type="listType"
      :on-exceed="onExceed"
      :before-upload="beforeUpload"
      :on-success="uploadSuccess"
      :on-error="uploadError">
      <template v-if="button">
        <el-button :type="'primary'">
          <template #icon v-if="prefixIcon">
            <el-icon style="margin-right: 4px;">
              <component :is='prefixIcon'></component>
            </el-icon>
          </template>
          <span>{{ buttonText }}</span>
          <template v-if="suffixIcon">
            <el-icon style="margin-left: 4px;">
              <component :is='suffixIcon'></component>
            </el-icon>
          </template>
        </el-button>
      </template>
      <template v-if="trigger" #trigger>
        <component :is='trigger'></component>
      </template>
      <template v-for="(_, name) in slots" #[name]="scopeData">
        <slot :name="name" v-bind="scopeData"></slot>
      </template>
    </el-upload>
  </div>
</template>
<script setup lang="ts">
import { UploadFile, UploadFiles, UploadRawFile, ElUpload, ElButton, ElIcon } from 'element-plus';
import { UploadComponentProps } from '../types/Upload';
import { withDefaults } from "vue"
import { FormEmitEventName } from '../types';

defineOptions({
  name: "Upload"
})

const slots = defineSlots<{
  default(): any
  trigger(): any
  tip(): any
  file(scopeData: {file: UploadFile}): any
}>()

const props = withDefaults(defineProps<UploadComponentProps>(), {
  action: "#",
  method: "POST",
  multiple: false,
  data: {},
  name: "file",
  withCredentials: false,
  showFileList: true,
  drag: false,
  accept: "",
  listType: "text",
  autoUpload: true,
  button: true,
  buttonText: "文件上传"
})

const emit = defineEmits([
  FormEmitEventName.beforeUpload,
  FormEmitEventName.uploadSuccess,
  FormEmitEventName.uploadError
])

function beforeUpload(rawFile: UploadRawFile) {
  emit(FormEmitEventName.beforeUpload, rawFile)
}

function uploadSuccess(response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) {
  emit(FormEmitEventName.uploadSuccess, {
    response,
    uploadFile,
    uploadFiles
  })
}

function uploadError(error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) {
  emit(FormEmitEventName.uploadError, {
    response: error,
    uploadFile,
    uploadFiles
  })
}

</script>
<style scoped lang="scss">
  
</style>