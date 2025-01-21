<script lang="ts">
import {
  FormEmitEventName,
  AnyProperty,
  FormItemConfig,
} from './types';

import { ElFormItem } from 'element-plus';
import { getCustomComponents } from './components/index';
import { toNameOfHump } from './util';

export default defineComponent({
  name: "FormBase",
  props: {
    config: {
      type: Object as () => FormItemConfig,
      default: () => {
        return {}
      }
    },
    model: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, { emit }) {
    let reg = /([^\/]+)(?=\.\w+$)/

    const componentModules: Record<string, AnyProperty> = import.meta.glob('./components/*.vue', {eager: true})
    
    const components: AnyProperty = {}
    
    let componentModulesKeys = Object.keys(componentModules).map(key => {
      return {
        name: key.match(reg)![1],
        path: key
      }
    })

    componentModulesKeys.forEach(({name, path}) => {
      components[name] = componentModules[path].default
    })

    const customComponents = getCustomComponents()

    // 注册自定义组件
    for (const name in customComponents) {
      if (Object.prototype.hasOwnProperty.call(customComponents, name)) {
        const component = customComponents[name];
        components[name] = component
      }
    }

    // @ts-ignore
    const events: AnyProperty = {
      'onUpdate:modelValue'(data: any) {
        emit('update:modelValue', data)
      }
    }

    // 注册表单组件事件回调
    function subscribeEvent() {
      Object.keys(FormEmitEventName).forEach(eventName => {
        // @ts-ignore
        events[`on${toNameOfHump(eventName)}`] = function (data: any, ...args) {
          // @ts-ignore
          emit(FormEmitEventName[eventName], data, ...args)
        }
      })
    }

    subscribeEvent()

    function createElComponent() {
      const componentProps = {
        class: 'form-item-wrapper',
        ...props.config,
        // placeholder: props.config.placeholder,
        // prop: props.config.prop,
        modelValue: props.model[props.config.prop],
        disabled: typeof props.config.disabled === 'function' ? props.config.disabled(props.config, props.model) : props.config.disabled,
        // style: {
        //   minWidth: '200px'
        // },
        ...events,
      }

      const componentPropsName = props.config.component.substring(0, 1).toLowerCase() + props.config.component.substring(1) + 'Props'
      
      Object.assign(componentProps, {
        // @ts-ignore
        ...props.config[componentPropsName]
      })
      if (props.config.component === 'DatePicker') { 
        console.log('componentPropsName',componentPropsName);
        console.log('componentProps',componentProps);
      }
      
      return h(
        components[props.config.component],
        componentProps
      )
    }

    function createElFormItem() {
      if (props.config.visibled === undefined || props.config.visibled) {
        if (typeof props.config.visibled === 'function' && !props.config.visibled(props.config, props.model)) return null;

        let slots = {
          default: () => createElComponent(),
          label: () => {
            if (typeof props.config.label === 'string') {

              return h('span', {}, [
                props.config.asterisk ? h('span', { class: 'text-[var(--el-color-danger)] mr-[4px]' }, '*') : "",
                props.config.label
              ])
            }

            return props.config.label
          }
        }

        if (!props.config.label) {
          // @ts-ignore
          delete slots.label
        }

        return h(
          ElFormItem,
          {
            ref: 'baseFormItem',
            key: props.config.prop + Math.random(),
            label: props.config.label,
            prop: props.config.prop,
            rules: props.config.rules,
            style: props.config.style,
            required: props.config.required,
            size: props.config.size,
            'label-width': props.config.labelWidth,
            'show-message': props.config.showMessage,
            'inline-message': props.config.inlineMessage
          },
          slots
        )
      }

      return null;
    }
    return {
      createElFormItem
    }
  },
  render() {
    return this.createElFormItem()
  }
})
</script>

<style lang="scss" scoped>
.form-item-wrapper {
  width: 100%;
}
.el-form-item {
  width: 100%;
}
</style>