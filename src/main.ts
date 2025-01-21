import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import 'highlight.js/styles/vs.css'
import 'highlight.js/lib/common';
import hljsVuePlugin from "@highlightjs/vue-plugin";
import hljs from 'highlight.js';
console.log(hljs.listLanguages());

// import Form from "@xuejian/form"

const app = createApp(App);
// app.use(Form)
app.use(hljsVuePlugin)
app.mount('#app')
