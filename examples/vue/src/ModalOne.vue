<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import { throttle } from 'radash'
import { lock, unlock } from 'tua-body-scroll-lock'
import { ref, watch } from 'vue'

import { printLockedNum } from './utils'

const props = defineProps<{
  visible: boolean,
  useGlobalLockState: boolean,
}>()
const emits = defineEmits<{(e: 'clickBtn'): void, (e: 'update:visible', v: boolean): void}>()

const targetOneRef = ref<HTMLElement>()
const targetTwoRef = ref<HTMLElement>()

watch(() => props.visible, () => {
  if (props.visible) {
    lock(
      [targetOneRef.value!, targetTwoRef.value!],
      {
        overflowType: 'clip',
        setOverflowForIOS: true,
        useGlobalLockState: props.useGlobalLockState,
      },
    )
  } else {
    unlock(
      [targetOneRef.value!, targetTwoRef.value!],
      {
        useGlobalLockState: props.useGlobalLockState,
      },
    )
  }
  printLockedNum()
})

useEventListener(window, 'scroll', throttle({ interval: 300 }, printLockedNum))

</script>

<template>
  <div class="modal" v-show="props.visible" @click="emits('update:visible', false)">
    <h2>
      dialog one
      <button @click.stop="emits('clickBtn')">click me to show dialog two</button>
    </h2>

    <div id="targetOne" ref="targetOneRef" class="target" @click.stop>
      <p v-for="i in 50" :key="i">{{i}} scroll me~</p>
    </div>

    <div id="targetTwo" ref="targetTwoRef" class="target" @click.stop>
      <p v-for="i in 50" :key="i">{{i}} scroll me~</p>
    </div>
  </div>
</template>

<style scoped>

#targetOne {
  height: 30%;

  color: blue;
  border-bottom: 1px dashed black;
}

#targetTwo {
  height: 30%;

  color: red;
}

</style>
