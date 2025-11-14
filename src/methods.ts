import { getLockState } from './getLockState'
import { handleScroll } from './handleScroll'
import { setOverflowForMobile, setOverflowForPc } from './setOverflow'
import type { BSLOptions, LockState, Nullable } from './types'
import {
  isServer,
  detectOS,
  getPreventEventDefault,
  getEventListenerOptions,
  noticeRequiredTargetElement,
  toArray,
} from './utils'

/**
 * lock body scroll
 * @param targetElement the element(s) still needs scrolling（iOS only）
 * @param options
 */
export function lock (targetElement?: Nullable<HTMLElement>, options?: BSLOptions): void {
  if (isServer()) return

  noticeRequiredTargetElement(targetElement)
  const detectRes = detectOS()
  const lockState = getLockState(options)

  if (detectRes.ios) {
    toArray(targetElement)
      .filter(e => e && lockState.lockedElements.indexOf(e) === -1)
      .forEach((element) => {
        element.ontouchstart = (event) => {
          const { clientX, clientY } = event.targetTouches[0]
          lockState.initialClientPos = { clientX, clientY }
        }

        element.ontouchmove = (event) => {
          handleScroll(event, element, lockState.initialClientPos, {
            isRowReverse: options?.isRowReverse,
            isColumnReverse: options?.isColumnReverse,
          })
        }

        lockState.lockedElements.push(element)
      })

    addTouchMoveListener(lockState)

    if (options?.setOverflowForIOS) {
      lockState.unLockCallback = setOverflowForPc()
    }
  } else if (lockState.lockedNum <= 0) {
    lockState.unLockCallback = detectRes.android
      ? setOverflowForMobile(options)
      : setOverflowForPc()
  }

  lockState.lockedNum += 1
}

/**
 * unlock body scroll
 * @param targetElement the element(s) still needs scrolling（iOS only）
 * @param options
 */
export function unlock (targetElement?: Nullable<HTMLElement>, options?: BSLOptions): void {
  if (isServer()) return

  noticeRequiredTargetElement(targetElement)

  const lockState = getLockState(options)
  lockState.lockedNum -= 1

  if (lockState.lockedNum > 0) return

  lockState.unLockCallback?.()
  if (!detectOS().ios) return

  toArray(targetElement).forEach((element) => {
    const index = lockState.lockedElements.indexOf(element)

    if (element && index !== -1) {
      element.ontouchmove = null
      element.ontouchstart = null
      lockState.lockedElements.splice(index, 1)
    }
  })

  removeTouchMoveListener(lockState)
}

/**
 * clear all body locks
 * @param options
 */
export function clearBodyLocks (options?: BSLOptions): void {
  if (isServer()) return

  const lockState = getLockState(options)
  lockState.lockedNum = 0

  lockState.unLockCallback?.()
  if (!detectOS().ios) return

  if (lockState.lockedElements.length) {
    let element = lockState.lockedElements.pop()
    while (element) {
      element.ontouchmove = null
      element.ontouchstart = null
      element = lockState.lockedElements.pop()
    }
  }

  removeTouchMoveListener(lockState)
}

export function addTouchMoveListener (lockState: LockState) {
  if (!detectOS().ios) return
  if (lockState.documentListenerAdded) return

  document.addEventListener('touchmove', getPreventEventDefault(), getEventListenerOptions({ passive: false }))
  lockState.documentListenerAdded = true
}

export function removeTouchMoveListener (lockState: LockState) {
  if (!lockState.documentListenerAdded) return

  document.removeEventListener('touchmove', getPreventEventDefault(), getEventListenerOptions({ passive: false }))
  lockState.documentListenerAdded = false
}
