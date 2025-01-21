<template>
  <span class="icon__wrapper" :style="{
    '--icon-size': iconSize,
    '--color': svgColor
  }">
    <el-icon 
      v-if="type === 'class'"
      :color="color"
      class="!w-auto !m-0"
      :size="iconSize">
      <component class="icons" :is="icon"></component>
    </el-icon>
    <template v-if="type === 'svg'">
      <svg 
        v-if="typeof icon === 'string'" 
        class="icon-svg" 
        aria-hidden="true">
        <use :xlink:href="icon"></use>
      </svg>
      <span v-else class="icon-svg" >
        <component :is='icon'></component>
      </span>
    </template>
    <template v-if="type === 'img'">
      <img 
        v-if="typeof icon === 'string'" 
        :src="icon" 
        class="img-icon object-contain">
      <span v-else class="img-icon">
        <component :is='icon'></component>
      </span>
    </template>
  </span>
</template>

<script lang="ts" setup>
import { IconComponentProps } from '../../types';
import { isNumber } from '@vueuse/shared';
import {
  withDefaults,
  defineProps,
  computed,
  ref,
  watchEffect,
} from "vue"
import * as Icons from "@element-plus/icons-vue"

defineOptions({
  name: "Icon"
})

const props = withDefaults(defineProps<IconComponentProps>(), {
  name: '',
  size: '',
  color: '',
  type: 'class',
})

let icon = computed(() => {
  if (props.type === 'class') {
    return typeof props.name === 'string' ?
      // @ts-ignore
      Icons[props.name] :
      props.name
  } else if(props.type === 'svg') {
    let name = props.name
    if (typeof props.name === 'string') {
      name = props.name.includes('#') ? props.name : '#' + props.name
    }
    return name
  }
  
  return props.name
})


let iconSize = computed(() => {
  if (props.type === 'svg' && !props.size) {
    return '1em'
  }
  return addUnit(props.size)
})

let svgColor = ref('currentColor')

watchEffect(() => {
  if (props.type === 'svg' && props.color) {
    svgColor.value = props.color
  }
})

function addUnit(value: number | string, defaultUnit = 'px') {
  if (isNumber(value)) return value + defaultUnit;
  let isStringNumber = !isNaN(Number(value))

  if (isStringNumber) return value + defaultUnit;
  else return value;
}

</script>

<style lang="scss" scoped>
.icon__wrapper {
  display: inline-flex;
  align-items: center;
}
.icon-svg {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: var(--color);
  overflow: hidden;
  font-size: var(--icon-size);
}
.img-icon {
  width: var(--icon-size, 16px);
  height: var(--icon-size, 16px);
  display: inline-flex;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>