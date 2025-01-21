# Form

使用 `vue3` `ts`，基于 `element-plus` 进行二次封装的 `Form` 组件，通过简单的 json 配置快速进行表单开发。


[Docs | 文档](https://xuejiancnode.github.io/it-docs/npm-package/FormUI.html)



## 安装

### NPM

```shell
npm install @xuejian/form --save
```

### Yarn
```shell
yarn add @xuejian/form --save
```


## 使用

### 手动导入

```html
<template>
  <Input v-model:model-value="modelValue" />
</template>

<script setup lang="ts">
import { Input } from "@xuejian/form"
import { ref } from "vue";

const modelValue = ref('')
</script>
```



### 完整引入

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