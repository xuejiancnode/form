<script lang="ts">
import {
  FormEmitEventName,
  AnyProperty,
  FormItemComponentPropsMap
} from './types';
import {
  toNameOfHump,
} from './util';

import { ElFormItem } from 'element-plus';

export default defineComponent({
  name: "FormBase",
  props: {
    config: {
      type: Object,
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
        type: props.config.inputType,
        disabled: typeof props.config.disabled === 'function' ? props.config.disabled() : props.config.disabled,
        style: {
          minWidth: '200px'
        },
        iconProps: props.config.iconProps,
        ...events,
      }

      Object.assign(componentProps, {
        ...props.config[FormItemComponentPropsMap[props.config.type as keyof typeof FormItemComponentPropsMap]]
      })
      
      return h(
        components[props.config.type],
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