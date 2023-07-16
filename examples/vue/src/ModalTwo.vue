<script setup lang="ts">
import { lock, unlock } from 'tua-body-scroll-lock'
import { ref, watch } from 'vue'

const props = defineProps<{ visible: boolean }>()
const emits = defineEmits<{(e: 'update:visible', v: boolean): void}>()

const targetThreeRef = ref<HTMLElement>()

watch(() => props.visible, () => {
  if (props.visible) {
    lock(targetThreeRef.value!)
  } else {
    unlock(targetThreeRef.value!)
  }
})

</script>

<template>
  <dialog class="modal" v-show="props.visible" @click="emits('update:visible', false)">
    <h2>dialog two with scroll-x</h2>
    <div ref="targetThreeRef" class="target" @click.stop>
      <p>123456789101112131415161718192021222324252627282930</p>
      <p v-for="i in 50" :key="i">{{i}} scroll me~</p>
    </div>
  </dialog>
</template>

<style scoped>

h2 {
  margin-top: 50px;
}

</style>
