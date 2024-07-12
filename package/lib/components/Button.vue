<template>
  <div>
    <template v-if="!buttons">
      <el-button
        :type="type"
        :size="size"
        :plain="plain"
        :text="link"
        :disabled="buttonDisabled(disabled)">
        <template #default>
          <div class="flex items-center">
            <template v-if="iconProps?.prefix">
              <span class="inline-block items-center mr-[7px]">
                <Icon :name="iconProps.prefix" :type="iconProps.type" :color="iconProps.color" :size="iconProps.size"></Icon>
              </span>
            </template>
            <slot>
              <span class="inline-block items-center">{{ content }}</span>
            </slot>
            <template v-if="iconProps?.suffix">
              <span class="inline-block items-center ml-[7px]">
                <Icon :name="iconProps?.suffix" :type="iconProps.type" :color="iconProps.color" :size="iconProps.size"></Icon>
              </span>
            </template>
          </div>
        </template>
      </el-button>
    </template>
    <template v-else>
      <el-button
        v-for="(button, index) in buttons"
        :key="index"
        :type="button.type"
        :size="button.size"
        :plain="button.plain"
        :link="button.link"
        :disabled="buttonDisabled(button.disabled)">
        <template #default>
          <div class="button__inner">
            <template v-if="button.iconProps?.prefix">
              <span class="">
                <Icon 
                  :name="button.iconProps.prefix" 
                  :type="button.iconProps.type" 
                  :color="button.iconProps.color" 
                  :size="button.iconProps.size" />
              </span>
            </template>
            <slot>
              <span>{{ button.content }}</span>
            </slot>
            <template v-if="button.iconProps?.suffix">
              <span class="">
                <Icon 
                  :name="button.iconProps?.suffix" 
                  :type="button.iconProps.type" 
                  :color="button.iconProps.color" 
                  :size="button.iconProps.size" />
              </span>
            </template>
          </div>
        </template>
      </el-button>
    </template>
  </div>
</template>
<script setup lang="ts">
import { ButtonComponentProps } from "../types";
import { computed } from "vue"
import Icon from "./Icon/index.vue"

defineOptions({
  name: "Button"
})

const props = defineProps<ButtonComponentProps>()

const buttonDisabled = computed(() => {
  return (disabled?: boolean | (() => boolean)) => {
    if (!disabled) return false;
    if (typeof disabled === 'function') return disabled();

    return disabled
  }
})
</script>
<style scoped lang="scss">
.button__inner {
  line-height: normal;
}
</style>