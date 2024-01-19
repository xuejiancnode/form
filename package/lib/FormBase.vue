<script lang="ts">
import { ElFormItem } from 'element-plus';
import { EmitEventNameEnumKeys } from './types/emit';
import { defineComponent, h } from "vue"
const components: Record<string, any> = import.meta.glob("./components/*.vue", { eager: true });

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
    const events = {}

    // 注册表单组件事件回调
    function subscribeEvent() {
      Object.keys(EmitEventNameEnumKeys).forEach(item => {
        // @ts-ignore
        events[item] = function (data: any) {
          emit(item, data)
        }
      })
    }

    subscribeEvent()

    function createComponent() {
      const componentProps: {
        [key: string]: any
      } = {
        ...props.config,
        modelValue: props.model[props.config.prop],
        type: props.config.inputType,
        disabled: typeof props.config.disabled === 'function' ? props.config.disabled() : props.config.disabled,
        iconProps: props.config.iconProps,
        ...events,
      }

      const propsMap: any = {
        'Input': 'inputProps',
        'InputNumber': 'inputNumberProps',
        'Select': 'selectProps',
        'DatePicker': 'datePickerProps',
        'Slider': 'sliderProps',
        'Switch': 'switchProps',
        'Upload': 'uploadProps',
      }

      Object.assign(componentProps, {
        ...props.config[propsMap[props.config.type]]
      })
      /* switch (props.config.type) {
        case 'Input':
          Object.assign(componentProps, {
            ...props.config.inputProps
          })
          break;
        case 'InputNumber':
          Object.assign(componentProps, {
            ...props.config.inputNumberProps
          })
          break;
        case 'Select':
          Object.assign(componentProps, {
            ...props.config.selectProps
          })
          break;
        case 'DatePicker':
          Object.assign(componentProps, {
            ...props.config.datePickerProps
          })
          break;
        case 'Slider':
          Object.assign(componentProps, {
            ...props.config.sliderProps
          })
          break;
        case 'Switch':
          Object.assign(componentProps, {
            ...props.config.switchProps
          })
          break;
      } */
      
      return h(
        components[`./components/${props.config.type}.vue`].default,
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
          required: props.config.required,
          size: props.config.size,
          'label-width': props.config.labelWidth,
          'show-message': props.config.showMessage,
          'inline-message': props.config.inlineMessage
        }, createComponent
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