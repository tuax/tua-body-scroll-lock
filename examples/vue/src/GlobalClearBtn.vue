<script setup lang="ts">
import type { BSLOptions } from 'tua-body-scroll-lock'

declare global {
  interface Window {
    bodyScrollLock: {
      clearBodyLocks: (options?: BSLOptions) => void;
    }
  }
}

function onClickClearBtn () {
  window.bodyScrollLock.clearBodyLocks({ useGlobalLockState: true })
}

</script>

<template>
  <button id="clearBtn" @click="onClickClearBtn">
    click me to <br />clear all body locks
  </button>
</template>

<style>

#clearBtn {
  position: fixed;
  bottom: 150px;
  left: 20px;
  z-index: 1;
}

</style>
