import { App } from "vue"
import Form from "./Form.vue" 

const install = function (app: App) {
  app.component(Form.name, Form);
}

export default install;