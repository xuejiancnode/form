<template>
  <div class="layout-container">
    <aside>
      <!-- <header>组件</header> -->
      <ul class="component-list">
        <template v-for="(_, name) in components" :key="name">
          <li class="component-item" @click="clickComponent(name as string)">
            <span>{{ name }}</span>
          </li>
        </template>
      </ul>
    </aside>
    <main>
      <component :is="components[componentName]"></component>
      <template v-if="sourceCode[componentName]">
        <div class="source-code">
          <highlightjs
            language="javascript"
            :code="sourceCode[componentName]"
          />
        </div>
      </template>
    </main>
  </div>
</template>
<script setup lang="ts">
const componentModules = import.meta.glob('./components/*.vue', { eager: true, import: 'default' })
const sourceCodeModules = import.meta.glob('./sourceCode/*.ts', { eager: true, import: 'default' })

const components = ref<{
  [key: string]: Component;
}>({});
const keys = Object.keys(componentModules);

for (let i = 0; i < keys.length; i++) {
  const key = keys[i];

  let name = key.match(/([^\/]+)(?=\.)?$/)?.[0];
  if (!name) {
    name = key
  }
  name = name.replace(/\.vue$/, '')

  components.value[name] = markRaw(componentModules[key] as Component);
}

const componentName = ref('');

function clickComponent(name: string) {
  componentName.value = name;
}

const sourceCode = ref<{
  [key: string]: string;
}>({});

const sourceCodeFileNames = Object.keys(sourceCodeModules);

for (let i = 0; i < sourceCodeFileNames.length; i++) {
  const key = sourceCodeFileNames[i];
  let name = key.match(/([^\/]+)(?=\.)?$/)?.[0];
  if (!name) {
    name = key
  }
  name = name.replace(/\.ts$/, '')

  sourceCode.value[name] = sourceCodeModules[key] as string;
}

</script>
<style lang="scss" scoped>
@font-face {
  font-family: 'Consolas';
  src: url(../public/fonts/consola.ttf);
}
@font-face {
  font-family: 'Courier New';
  src: url(../public/fonts/cour.ttf);
}
.layout-container {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  aside {
    width: 220px;
    height: 100%;
    border-right: 1px solid #ccc;
    header {
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-bottom: 1px solid #ccc;
      font-size: 16px;
      font-weight: bold;
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .component-list {
      .component-item {
        height: 50px;
        line-height: 50px;
        padding-left: 20px;
        cursor: pointer;
        transition: all 0.3s linear;
        &:hover {
          background-color: #ccc;
        }
      }
    }
  }
  main {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    .source-code {
      width: 100%;
      flex: 1;
      font-size: 16px;
      overflow: auto;
    }
  }
}
</style>
<style lang="scss">
html, body, #app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0px;
}
.source-code {
  pre {
    width: 100%;
    code {
      font-family: Consolas, 'Courier New';
    }
  }
}
</style>