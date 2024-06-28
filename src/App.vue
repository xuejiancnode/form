<script setup lang="ts">
import Form from '../package/lib/Form.vue';
import { ref, reactive } from "vue"
import { Search, Upload } from "@element-plus/icons-vue"
import { FormRules } from 'element-plus';
import {
  Input,
  FormConfigList,
  Button,
  ButtonProps,
  Cascader,
  Checkbox,
  CheckboxItem,
  Radio,
  TreeSelect
} from '../package/index';

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
        'Type': 'web',
        'Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOjIxMDk4NDEwNTA5MDAwMTk3LCJyblN0ciI6Im1OcUtuNURSM2tBUUx5MHVVNmRtTExYSGhCNlZ3bDVhIn0.nprO2LqXrgECTXAhqTxKyCoZLCDhQ34tzl-ZzFFDbAM'
      },
      showFileList: false,
      suffixIcon: markRaw(Upload),
    }
  }
])

function handle(data) {
  console.log(data);
  
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

function inputRule(val) {
  const reg = /[^\d]/;
  if(reg.test(val)){
    return false
  }
  return true
}

const buttons = reactive<Array<ButtonProps>>([
  {
    content: "按钮1",
    type: "danger",
    disabled() {
      return false
    }
  },
  {
    content: "按钮2",
    type: "primary",
    disabled() {
      return true
    },
  },
  {
    content: "按钮3",
    type: "success",
    link: true,
    plain: true,
    disabled() {
      return false
    },
  }
])

const options = ref([
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout',
          },
          {
            value: 'color',
            label: 'Color',
          },
          {
            value: 'typography',
            label: 'Typography',
          },
          {
            value: 'icon',
            label: 'Icon',
          },
          {
            value: 'button',
            label: 'Button',
          },
        ],
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio',
          },
          {
            value: 'checkbox',
            label: 'Checkbox',
          },
          {
            value: 'input',
            label: 'Input',
          },
          {
            value: 'input-number',
            label: 'InputNumber',
          },
          {
            value: 'select',
            label: 'Select',
          },
          {
            value: 'cascader',
            label: 'Cascader',
          },
          {
            value: 'switch',
            label: 'Switch',
          },
          {
            value: 'slider',
            label: 'Slider',
          },
          {
            value: 'time-picker',
            label: 'TimePicker',
          },
          {
            value: 'date-picker',
            label: 'DatePicker',
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker',
          },
          {
            value: 'upload',
            label: 'Upload',
          },
          {
            value: 'rate',
            label: 'Rate',
          },
          {
            value: 'form',
            label: 'Form',
          },
        ],
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table',
          },
          {
            value: 'tag',
            label: 'Tag',
          },
          {
            value: 'progress',
            label: 'Progress',
          },
          {
            value: 'tree',
            label: 'Tree',
          },
          {
            value: 'pagination',
            label: 'Pagination',
          },
          {
            value: 'badge',
            label: 'Badge',
          },
        ],
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert',
          },
          {
            value: 'loading',
            label: 'Loading',
          },
          {
            value: 'message',
            label: 'Message',
          },
          {
            value: 'message-box',
            label: 'MessageBox',
          },
          {
            value: 'notification',
            label: 'Notification',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu',
          },
          {
            value: 'tabs',
            label: 'Tabs',
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb',
          },
          {
            value: 'dropdown',
            label: 'Dropdown',
          },
          {
            value: 'steps',
            label: 'Steps',
          },
        ],
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog',
          },
          {
            value: 'tooltip',
            label: 'Tooltip',
          },
          {
            value: 'popover',
            label: 'Popover',
          },
          {
            value: 'card',
            label: 'Card',
          },
          {
            value: 'carousel',
            label: 'Carousel',
          },
          {
            value: 'collapse',
            label: 'Collapse',
          },
        ],
      },
    ],
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components',
      },
      {
        value: 'sketch',
        label: 'Sketch Templates',
      },
      {
        value: 'docs',
        label: 'Design Documentation',
      },
    ],
  },
])
const treeSelectData = reactive([
  {
    value: '1',
    label: 'Level one 1',
    children: [
      {
        value: '1-1',
        label: 'Level two 1-1',
        children: [
          {
            value: '1-1-1',
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: 'Level one 2',
    children: [
      {
        value: '2-1',
        label: 'Level two 2-1',
        children: [
          {
            value: '2-1-1',
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        value: '2-2',
        label: 'Level two 2-2',
        children: [
          {
            value: '2-2-1',
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    value: '3',
    label: 'Level one 3',
    children: [
      {
        value: '3-1',
        label: 'Level two 3-1',
        children: [
          {
            value: '3-1-1',
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        value: '3-2',
        label: 'Level two 3-2',
        children: [
          {
            value: '3-2-1',
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
])
const checkbox = reactive<Array<CheckboxItem>>([
  {
    label: "选项1",
    value: 1
  }, {
    label: "选项2",
    value: 2
  }
])

const cascaderValue = ref<Array<number>>([])
const checkboxValue = ref<Array<number>>([])
const radioValue = ref<Array<number>>()
const treeSelectValue = ref('')
</script>

<template>
  <div style="width: 100%;">
    {{ model }}
    <Form 
      ref="FormRef"
      :config="config" 
      v-model:model="model" 
      inline
      auto-column
      label-width="90px" 
      search
      clear
      @update:model="handle">
    </Form>
    <br>
    <el-button @click="save">保存</el-button>
    <div>{{ value }}</div>
    <Input 
      v-model:model-value="value"
      :input-rule="inputRule"
      placeholder="输入框">
    </Input>

    <Button :buttons="buttons">按钮</Button>
    <Cascader 
      style="margin-left: 5px;"
      clearable
      v-model:model-value="cascaderValue"
      placeholder="级联选择器"
      :options="options" 
      :cascader-field-props="{
        label: 'label',
        value: 'value',
      }"/>
      <Checkbox v-model:model-value="checkboxValue" :options="checkbox" />
      <Radio v-model:model-value="radioValue" :options="checkbox" />
      <tree-select 
        v-model:model-value="treeSelectValue" 
        :data="treeSelectData" 
        :tree-props="{
          label: 'label',
          children: 'children',
        }"
        check-strictly
        placeholder="树形选择器" />
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
