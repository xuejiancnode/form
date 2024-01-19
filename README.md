# @xuejian/form

使用 `vue3` `ts`，基于 `element-plus` 进行二次封装的 `Form` 组件，可通过简单的 json 配置快速展示表单组件。


## 安装

```shell
npm install @xuejian/form@latest --save
```


```shell
yarn add @xuejian/form@latest --save
```


## 使用

```js
// main.ts
import Form from "@xuejian/form"

app.use(Form);
```

```html
<template>
  <Form :config="config" v-model:model="model"></Form>
</template>

<script setup lang="ts">
import { FormConfigList } from "@xuejian/form/lib/types/Form";
import { reactive } from "vue";

const model = ref({
  test: '',
  name: '',
  select: "",
  date: [],
  number: null,
  slider: null,
  switch: true
})

const config = reactive<FormConfigList>([
  {
    label: "test",
    prop: "test",
    type: "Input",
    inputProps: {
      maxlength: 10
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
      teleported: true
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
  }
])
</script>
```