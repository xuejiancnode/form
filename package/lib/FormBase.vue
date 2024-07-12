<script lang="ts">
import {
  FormEmitEventName,
  AnyProperty,
  FormItemConfig,
} from './types';
import {
  toNameOfHump,
} from './util';

import { ElFormItem } from 'element-plus';

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

    // @ts-ignore
    const events: AnyProperty = {
      'onUpdate:modelValue'(data: any) {
        emit('update:modelValue', data)
      }
    }

    // 注册表单组件事件回调
    function subscribeEvent() {
      Object.keys(FormEmitEventName).forEach(eventName => {
        events[eventName] = function (data: any) {
          // @ts-ignore
          emit(FormEmitEventName[eventName], data)
        }
      })
    }

    subscribeEvent()

    function createElComponent() {
      const componentProps = {
        ...props.config,
        // placeholder: props.config.placeholder,
        // prop: props.config.prop,
        modelValue: props.model[props.config.prop],
        disabled: typeof props.config.disabled === 'function' ? props.config.disabled(props.config) : props.config.disabled,
        style: {
          minWidth: '200px'
        },
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
        },() => createElComponent()
      )
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

</style>