import { Nullable } from './types'

export const isServer = () => typeof window === 'undefined'

export interface DetectOSResult { ios: boolean, android: boolean }
export const detectOS = (ua?: string): DetectOSResult => {
  ua = ua || navigator.userAgent
  const ipad = /(iPad).*OS\s([\d_]+)/.test(ua)
  const iphone = !ipad && /(iPhone\sOS)\s([\d_]+)/.test(ua)
  const android = /(Android);?[\s/]+([\d.]+)?/.test(ua)
  const ios = iphone || ipad

  return { ios, android }
}

export function getEventListenerOptions (options: AddEventListenerOptions): AddEventListenerOptions | boolean {
  /* istanbul ignore if */
  if (isServer()) return false

  if (!options) {
    throw new Error('options must be provided')
  }
  let isSupportOptions = false
  const listenerOptions = <AddEventListenerOptions>{
    get passive () {
      isSupportOptions = true
      return undefined
    },
  }

  /* istanbul ignore next */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {}
  const testEvent = '__TUA_BSL_TEST_PASSIVE__'
  window.addEventListener(testEvent, noop, listenerOptions)
  window.removeEventListener(testEvent, noop, listenerOptions)

  const { capture } = options

  /* istanbul ignore next */
  return isSupportOptions
    ? options
    : typeof capture !== 'undefined'
      ? capture
      : false
}

export function noticeRequiredTargetElement (targetElement?: Nullable<HTMLElement>): boolean {
  if (targetElement) return false
  if (targetElement === null) return false
  /* istanbul ignore if */
  if (process.env.NODE_ENV === 'production') return false
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'test') {
    console.warn(
      'If scrolling is also required in the floating layer, ' +
      'the target element must be provided.',
    )
  }
  return true
}

/**
 * Get global function that calls preventDefault
 */
export function getPreventEventDefault () {
  if ('__BSL_PREVENT_DEFAULT__' in window) {
    return window.__BSL_PREVENT_DEFAULT__!
  }

  window.__BSL_PREVENT_DEFAULT__ = function (event: TouchEvent) {
    if (!event.cancelable) return

    event.preventDefault()
  }
  return window.__BSL_PREVENT_DEFAULT__
}

export function toArray<T> (x?: Nullable<T>): T[] {
  if (!x) return []
  return Array.isArray(x) ? x : [x]
}
