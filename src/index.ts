import { handleScroll } from './handleScroll'
import { setOverflowHiddenMobile, setOverflowHiddenPc } from './setOverflowHidden'
import type { BSLOptions, Nullable } from './types'
import {
  isServer,
  detectOS,
  preventEventDefault,
  getEventListenerOptions,
  noticeRequiredTargetElement,
} from './utils'

const eventListenerOptions = getEventListenerOptions({ passive: false })

function lock (targetElement?: Nullable<HTMLElement>, options?: BSLOptions) {
  if (isServer()) return

  noticeRequiredTargetElement(targetElement)

  if (detectOS().ios) {
    // iOS
    if (targetElement) {
      const elementArray = Array.isArray(targetElement) ? targetElement : [targetElement]

      elementArray.forEach((element) => {
        if (element && lock.lockedElements.indexOf(element) === -1) {
          element.ontouchstart = (event) => {
            const { clientX, clientY } = event.targetTouches[0]
            lock.initialClientPos = { clientX, clientY }
          }

          element.ontouchmove = (event) => {
            if (event.targetTouches.length !== 1) return

            handleScroll(event, element, lock.initialClientPos)
          }

          lock.lockedElements.push(element)
        }
      })
    }

    if (!lock.documentListenerAdded) {
      document.addEventListener('touchmove', preventEventDefault, eventListenerOptions)
      lock.documentListenerAdded = true
    }
  } else if (lock.lockedNum <= 0) {
    lock.unLockCallback = detectOS().android
      ? setOverflowHiddenMobile(options)
      : setOverflowHiddenPc()
  }

  lock.lockedNum += 1
}

lock.lockedNum = 0
lock.lockedElements = [] as HTMLElement[]

lock.unLockCallback = null as null | (() => void)

/** Only add document listener once */
lock.documentListenerAdded = false

lock.initialClientPos = {
  clientX: 0,
  clientY: 0,
}

function unlock (targetElement?: Nullable<HTMLElement>) {
  if (isServer()) return

  noticeRequiredTargetElement(targetElement)

  lock.lockedNum -= 1
  if (lock.lockedNum > 0) return

  if (
    !detectOS().ios &&
    typeof lock.unLockCallback === 'function'
  ) {
    lock.unLockCallback()
    return
  }

  // iOS
  if (targetElement) {
    const elementArray = Array.isArray(targetElement) ? targetElement : [targetElement]

    elementArray.forEach((element) => {
      const index = lock.lockedElements.indexOf(element)

      if (index !== -1) {
        element.ontouchmove = null
        element.ontouchstart = null
        lock.lockedElements.splice(index, 1)
      }
    })
  }

  if (lock.documentListenerAdded) {
    document.removeEventListener('touchmove', preventEventDefault, eventListenerOptions)
    lock.documentListenerAdded = false
  }
}

function clearBodyLocks () {
  if (isServer()) return

  lock.lockedNum = 0

  if (
    !detectOS().ios &&
    typeof lock.unLockCallback === 'function'
  ) {
    lock.unLockCallback()
    return
  }

  // iOS
  if (lock.lockedElements.length) {
    // clear events
    let element = lock.lockedElements.pop()
    while (element) {
      element.ontouchmove = null
      element.ontouchstart = null

      element = lock.lockedElements.pop()
    }
  }

  if (lock.documentListenerAdded) {
    document.removeEventListener('touchmove', preventEventDefault, eventListenerOptions)
    lock.documentListenerAdded = false
  }
}

export * from './types'
export { lock, unlock, clearBodyLocks }
