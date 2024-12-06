# fast-form-ui

使用 `vue3` `ts`，基于 `element-plus` 进行二次封装的 `Form` 组件，可通过简单的 json 配置快速展示表单组件。


[Docs | 文档](https://xuejiancnode.github.io/it-docs/npm-package/fast-form-ui.html)



## 安装

### NPM

```shell
npm install fast-form-ui@latest --save
```

### Yarn
```shell
yarn add fast-form-ui@latest --save
```


## 使用

### 手动导入

```html
<template>
  <Input v-model:model-value="modelValue" />
</template>

<script setup lang="ts">
import { Input } from "fast-form-ui"
import { ref } from "vue";

const modelValue = ref('')
</script>
```



### 完整引入

```js
// main.ts
import Form from "fast-form-ui"

app.use(Form);
```

```html
<template>
  <Form :config="config" v-model:model="model"></Form>
</template>

<script setup lang="ts">
import { FormConfigList } from "fast-form-ui/lib/types/Form";
import { reactive } from "vue";

const model = ref({
  value: ""
})

const config = reactive<FormConfigList>([
  {
    label: "标签",
    prop: "value",
    component: "Input",
    placeholder: "请输入"
  }
])
</script>
```