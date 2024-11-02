import './style.css'
import { type BSLOptions, lock, unlock } from 'tua-body-scroll-lock'

import { name } from '../package.json'

let someText = ''
for (let i = 0; i < 150; i++) {
  someText += `<p>${i} scroll me~</p>`
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header>
    <h1>tua-body-scroll-lock ${name}</h1>
    <img src="https://img.shields.io/badge/dependencies-none-green.svg" alt="dependencies">
    <a href="https://www.npmjs.com/package/tua-body-scroll-lock" target="_blank">
      <img src="https://badgen.net/npm/dm/tua-body-scroll-lock" alt="Downloads per month">
      <img src="https://img.shields.io/npm/v/tua-body-scroll-lock.svg" alt="Version">
      <img src="https://img.shields.io/npm/v/tua-body-scroll-lock/next.svg" alt="Next Version">
      <img src="https://img.shields.io/npm/l/tua-body-scroll-lock.svg" alt="License">
    </a>
  </header>

  <button id="btn">click me to <br />show dialog one</button>

  <button id="clearBtn">
    click me to <br />clear all body locks
  </button>

  <div id="modalOne" class="modal">
    <h2>
      dialog one
      <button id="modalBtn">click me to show dialog two</button>
    </h2>
    <div id="targetOne" class="target">${someText}</div>
    <div id="targetTwo" class="target">${someText}</div>
  </div>

  <dialog id="modalTwo" class="modal">
    <h2>dialog two with scroll-x</h2>
    <div id="targetThree" class="target">
      <p>123456789101112131415161718192021222324252627282930</p>
      ${someText}
    </div>
  </dialog>

  <div id="list">${someText}</div>
`
const $ = document.querySelector.bind(document)
const $modalOne = $<HTMLElement>('#modalOne')!
const $modalTwo = $<HTMLElement>('#modalTwo')!
const $targetOne = $<HTMLElement>('#targetOne')!
const $targetTwo = $<HTMLElement>('#targetTwo')!
const $targetThree = $<HTMLElement>('#targetThree')!

// show modals
$('#btn')!.addEventListener('click', () => {
  $modalOne.style.display = 'block'
  lock([$targetOne, $targetTwo], {
    overflowType: 'clip',
    setOverflowForIOS: true,
    useGlobalLockState: true,
  })
})

$('#modalBtn')!.addEventListener('click', () => {
  $modalTwo.style.display = 'block'
  lock($targetThree, { useGlobalLockState: true })
})

// hide modals
$modalOne.addEventListener('click', (event) => {
  if (['modalBtn', 'targetOne'].includes((event.target as HTMLElement).id)) return

  $modalOne.style.display = 'none'
  unlock([$targetOne, $targetTwo], { useGlobalLockState: true })
})

$modalTwo.addEventListener('click', (event) => {
  if ((event.target as HTMLElement).id === 'targetThree') return

  $modalTwo.style.display = 'none'
  unlock($targetThree, { useGlobalLockState: true })
})

declare global {
  interface Window {
    bodyScrollLock: {
      clearBodyLocks: (options?: BSLOptions) => void;
    };
  }
}

$('#clearBtn')!.addEventListener('click', () => {
  window.bodyScrollLock.clearBodyLocks({ useGlobalLockState: true })
})
