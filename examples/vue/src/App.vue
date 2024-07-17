<script setup lang="ts">
import { ref } from 'vue'

import GlobalClearBtn from './GlobalClearBtn.vue'
import HeaderPart from './HeaderPart.vue'
import ModalOne from './ModalOne.vue'
import ModalTwo from './ModalTwo.vue'

const showModalOne = ref(false)
const showModalTwo = ref(false)
const useGlobalLockState = ref(false)

</script>

<template>
  <HeaderPart/>
  <GlobalClearBtn/>

  <div id="input" @click="useGlobalLockState = !useGlobalLockState">
    useGlobalLockState: <input v-model="useGlobalLockState" type="checkbox" />
  </div>

  <button id="btn" @click="showModalOne = true">
    click me to <br />show dialog one
  </button>

  <ModalOne v-model:visible="showModalOne" :useGlobalLockState="useGlobalLockState" @click-btn="showModalTwo = true"/>

  <ModalTwo v-model:visible="showModalTwo" :useGlobalLockState="useGlobalLockState"/>

  <div id="list">
    <p v-for="i in 150" :key="i">{{i}} scroll me~</p>
  </div>
</template>

<style>

#input {
  position: fixed;
  top: 150px;
  left: 20px;
}

#btn {
  position: fixed;
  top: 200px;
  left: 20px;
}

#list {
  margin: 0 20px;
  padding-right: 50px;
  text-indent: 100px;
}

button {
  padding: 6px;

  color: #fff;
  border-radius: 5px;
  background-color: blue;
}

.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: block;

  width: 100%;
  height: 100%;
  padding-top: 40px;

  background-color: rgba(0, 0, 0, 0.5);
}

h2 {
  width: 80%;
  max-width: 300px;
  margin: 0 auto;

  color: #000;
  background-color: #fff;
}

.target {
  overflow: scroll;
  -webkit-overflow-scrolling: touch;

  width: 80%;
  max-width: 300px;
  height: 60%;
  margin: 0 auto;

  text-align: center;

  color: #000;
  background-color: #fff;
}

</style>
