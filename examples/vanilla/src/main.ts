import './style.css'
import { lock, unlock } from 'tua-body-scroll-lock'

let someText = ''
for (let i = 0; i < 50; i++) {
  someText += `<p>${i} scroll me~</p>`
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <section class="content">
    <button id="btn">click me to <br />show dialog one</button>

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
  </section>
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
  lock([$targetOne, $targetTwo])
})

$('#modalBtn')!.addEventListener('click', () => {
  $modalTwo.style.display = 'block'
  lock($targetThree)
})

// hide modals
$modalOne.addEventListener('click', (event) => {
  if (['modalBtn', 'targetOne'].includes((event.target as HTMLElement).id)) return

  $modalOne.style.display = 'none'
  unlock([$targetOne, $targetTwo])
})

$modalTwo.addEventListener('click', (event) => {
  if ((event.target as HTMLElement).id === 'targetThree') return

  $modalTwo.style.display = 'none'
  unlock($targetThree)
})
