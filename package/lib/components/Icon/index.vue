<template>
  <el-icon 
    v-if="type === 'class'"
    :color="color"
    class="!w-auto !m-0"
    :size="iconSize">
    <component class="icons" :is="icon"></component>
  </el-icon>
  <svg 
    v-if="type === 'svg'" 
    class="icon-svg" 
    aria-hidden="true" 
    :style="{
      '--color': svgColor,
      '--icon-size': iconSize
    }">
    <use :xlink:href="icon"></use>
  </svg>
  <img 
    v-if="type === 'img'" 
    :src="name" 
    class="img-icon object-contain" 
    :style="{
      '--icon-size': iconSize
    }">
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
    return ''
  } else {
    let name = props.name.includes('#') ? props.name : '#' + props.name
    return name
  }
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
}
</style>