import { FormConfigList, FormItemConfig } from '../types';
import { deepClone } from '../util';

/**
 * useForm 用于处理单一表单
 */
export function useForm(config: FormConfigList) {
  const formConfig = ref(deepClone(config));
  
  /**
   * 更新表单配置项
   * @param prop 更新的表单配置项
   * @param expression 属性表达式 a.b | a
   * @param newValue 更新后的值
   */
  function updateForm(prop: string, expression: string, newValue: any) {
    for (let i = 0; i < formConfig.value.length; i++) {
      let target = formConfig.value[i];
      const segments = expression.split('.')
      if (target.prop === prop) {
        for (let j = 0; j < segments.length - 1; j++) {
          if (!target) return;
          target = target[segments[j]];
        }
        
        target[segments[segments.length - 1]] = newValue;
      }
    }
  }

  /**
   * 插入表单配置项
   * @param config 插入的表单配置项
   * @param posi 插入位置 默认插入到末尾
   */
  function insertConfig(config: FormItemConfig, posi?: number) {
    if (posi !== undefined) {
      for (let i = 0; i < formConfig.value.length; i++) {
        formConfig.value.splice(posi, 0, config)
      }
    } else {
      formConfig.value.push(config)
    }
  }

  return {
    formConfig,
    updateForm,
    insertConfig
  }
}