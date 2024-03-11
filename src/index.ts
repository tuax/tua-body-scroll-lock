import { getLockState } from './getLockState'
import { handleScroll } from './handleScroll'
import { setOverflowHiddenMobile, setOverflowHiddenPc } from './setOverflowHidden'
import type { BSLOptions, Nullable } from './types'
import {
  isServer,
  detectOS,
  getPreventEventDefault,
  getEventListenerOptions,
  noticeRequiredTargetElement,
} from './utils'

const eventListenerOptions = getEventListenerOptions({ passive: false })

function lock (targetElement?: Nullable<HTMLElement>, options?: BSLOptions) {
  if (isServer()) return

  noticeRequiredTargetElement(targetElement)

  const lockState = getLockState(options)

  if (detectOS().ios) {
    // iOS
    if (targetElement) {
      const elementArray = Array.isArray(targetElement) ? targetElement : [targetElement]

      elementArray.forEach((element) => {
        if (element && lockState.lockedElements.indexOf(element) === -1) {
          element.ontouchstart = (event) => {
            const { clientX, clientY } = event.targetTouches[0]
            lockState.initialClientPos = { clientX, clientY }
          }

          element.ontouchmove = (event) => {
            if (event.targetTouches.length !== 1) return

            handleScroll(event, element, lockState.initialClientPos)
          }

          lockState.lockedElements.push(element)
        }
      })
    }

    if (!lockState.documentListenerAdded) {
      document.addEventListener('touchmove', getPreventEventDefault(), eventListenerOptions)
      lockState.documentListenerAdded = true
    }
  } else if (lockState.lockedNum <= 0) {
    lockState.unLockCallback = detectOS().android
      ? setOverflowHiddenMobile(options)
      : setOverflowHiddenPc()
  }

  lockState.lockedNum += 1
}

function unlock (targetElement?: Nullable<HTMLElement>, options?: BSLOptions) {
  if (isServer()) return

  noticeRequiredTargetElement(targetElement)

  const lockState = getLockState(options)

  lockState.lockedNum -= 1
  if (lockState.lockedNum > 0) return

  if (
    !detectOS().ios &&
    typeof lockState.unLockCallback === 'function'
  ) {
    lockState.unLockCallback()
    return
  }

  // iOS
  if (targetElement) {
    const elementArray = Array.isArray(targetElement) ? targetElement : [targetElement]

    elementArray.forEach((element) => {
      const index = lockState.lockedElements.indexOf(element)

      if (index !== -1) {
        element.ontouchmove = null
        element.ontouchstart = null
        lockState.lockedElements.splice(index, 1)
      }
    })
  }

  if (lockState.documentListenerAdded) {
    document.removeEventListener('touchmove', getPreventEventDefault(), eventListenerOptions)
    lockState.documentListenerAdded = false
  }
}

function clearBodyLocks (options?: BSLOptions) {
  if (isServer()) return

  const lockState = getLockState(options)

  lockState.lockedNum = 0

  if (
    !detectOS().ios &&
    typeof lockState.unLockCallback === 'function'
  ) {
    lockState.unLockCallback()
    return
  }

  // iOS
  if (lockState.lockedElements.length) {
    // clear events
    let element = lockState.lockedElements.pop()
    while (element) {
      element.ontouchmove = null
      element.ontouchstart = null

      element = lockState.lockedElements.pop()
    }
  }

  if (lockState.documentListenerAdded) {
    document.removeEventListener('touchmove', getPreventEventDefault(), eventListenerOptions)
    lockState.documentListenerAdded = false
  }
}

export * from './types'
export { lock, unlock, clearBodyLocks }
