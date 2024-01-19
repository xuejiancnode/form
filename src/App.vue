<script setup lang="ts">
import Form from '../package/lib/Form.vue';
import { ref, reactive } from "vue"
import { FormConfigList } from "../package/lib/types/Form"
import { Search, Upload } from "@element-plus/icons-vue"
import { FormRules } from 'element-plus';
import { Input } from "../package/index"

const model = ref({
  test: '',
  name: '',
  select: "",
  date: [],
  number: null,
  slider: null,
  switch: true,
  upload: ""
})

const loading = ref(false)

const config = reactive<FormConfigList>([
  {
    label: "test",
    prop: "test",
    type: "Input",
    inputProps: {
      maxlength: 10,
      prefixIcon: markRaw(Search)
    },
    disabled() {
      return false
    },
  }, {
    label: "name",
    prop: "name",
    type: "Input"
  }, {
    label: "select",
    prop: "select",
    type: "Select",
    selectProps: {
      options: [{
        label: "1",
        value: "1"
      }, {
        label: "2",
        value: "2"
      }]
    }
  }, {
    label: "date",
    prop: "date",
    type: "DatePicker",
    datePickerProps: {
      type: "daterange",
      teleported: true,
      prefixIcon: markRaw(Search)
    }
  }, {
    label: "number",
    prop: "number",
    type: "InputNumber"
  }, {
    label: "slider",
    prop: "slider",
    type: "Slider",
    sliderProps: {
      range: true
    }
  }, {
    label: "switch",
    prop: "switch",
    type: "Switch",
    switchProps: {
      loading: true,
      beforeChange() {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true)
          }, 2000)
        })
      },
    }
  }, {
    label: "upload",
    prop: "upload",
    type: "Upload",
    uploadProps: {
      action: "/api/file/upload",
      headers: {
        'Type': '',
        'Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOjIxMDk4NDEwNTA5MDAwMTk3LCJyblN0ciI6Im1OcUtuNURSM2tBUUx5MHVVNmRtTExYSGhCNlZ3bDVhIn0.nprO2LqXrgECTXAhqTxKyCoZLCDhQ34tzl-ZzFFDbAM'
      },
      showFileList: false,
      suffixIcon: markRaw(Upload),
    }
  }
])

function handle() {
}

const FormRef = ref<InstanceType<typeof Form>>()

function save() {
  FormRef.value?.getInstance()?.resetFields()
}

const formRules = reactive<FormRules>({
  test: [{ required: true, message: "请输入test", trigger: "blur" }],
})

const value = ref("")

function updateHandle(val) {
  value.value = val
}

</script>

<template>
  <div style="width: 100%;">
    {{ model }}
    <Form 
      ref="FormRef"
      :config="config" 
      v-model:model="model" 
      :inline="true" 
      label-width="90px" 
      search
      clear
      @update:model="handle">
    </Form>
    <br>
    <el-button @click="save">保存</el-button>
    <div>{{ value }}</div>
    <Input :model-value="value" @update="updateHandle"></Input>
  </div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style>
html, body, #app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0px;
}
</style>
