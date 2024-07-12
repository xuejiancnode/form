import { UploadUserFile } from "element-plus";
import { ComponentPropsBase, FormItemComponentPropsBase } from "./Form";
import { Component } from "vue";

export interface UploadResponse {
  filePath: string
  fileName: string
}

export interface UploadPropsBase { 
  action?: string
  headers?: Headers | Record<string, any>
  method?: string
  multiple?: boolean
  limit?: number
  data?: any
  name?: string
  withCredentials?: boolean
  showFileList?: boolean
  drag?: boolean
  accept?: string
  onExceed?: (files: File[], uploadFiles: UploadUserFile[]) => void
  listType?: 'text' | 'picture' | 'picture-card'
  autoUpload?: boolean
  button?: boolean // 是否使用按钮触发文件上传
  buttonText?: string
  trigger?: Component,
  response?: UploadResponse,
  prefixIcon?: string | Component
  suffixIcon?: string | Component
}

export type UploadComponentProps = UploadPropsBase & FormItemComponentPropsBase;

export interface uploadProps extends ComponentPropsBase {
  component: "Upload",
  uploadProps?: UploadPropsBase
}