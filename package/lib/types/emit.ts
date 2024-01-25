export enum EmitEventNameEnumKeys {
  "onUpdate:modelValue" = "update:modelValue",
  "onUpdate" = "update",
  "onBeforeUpload" = "beforeUpload",
  "onUploadSuccess" = "uploadSuccess",
  "onUploadError" = "uploadError",
}

type keys = keyof typeof EmitEventNameEnumKeys;

export function getEmit<K extends keys>(key: K): typeof EmitEventNameEnumKeys[K] {
  return EmitEventNameEnumKeys[key]
}