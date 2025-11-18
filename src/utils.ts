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

/**
 * Check if element uses reversed flex direction
 */
export function isReversedFlex (element: HTMLElement): { column: boolean, row: boolean } {
  const computedStyle = window.getComputedStyle(element)
  const flexDirection = computedStyle.flexDirection

  return {
    column: flexDirection === 'column-reverse',
    row: flexDirection === 'row-reverse',
  }
}

export interface ScrollBoundaryState {
  isOnTop: boolean
  isOnBottom: boolean
  isOnLeft: boolean
  isOnRight: boolean
}

/**
 * Check if element is at scroll boundary
 * Supports both normal and reversed flex directions
 */
export function getScrollBoundaryState (
  element: HTMLElement,
  clientX: number,
  clientY: number,
): ScrollBoundaryState {
  const {
    scrollTop,
    scrollLeft,
    scrollWidth,
    scrollHeight,
    clientWidth,
    clientHeight,
  } = element

  // Check if element uses reversed flex direction
  const reversed = isReversedFlex(element)

  // For column-reverse: visual top is at max scrollTop, visual bottom is at 0
  // For normal: visual top is at 0, visual bottom is at max scrollTop
  let isOnTop: boolean
  let isOnBottom: boolean

  if (reversed.column) {
    // In column-reverse, scrolling down (clientY < 0) when at max scrollTop means at visual top
    isOnTop = clientY > 0 && Math.abs(scrollTop) + clientHeight + 1 >= scrollHeight
    isOnBottom = clientY < 0 && Math.abs(scrollTop) <= 1
  } else {
    // Normal behavior
    isOnTop = clientY > 0 && scrollTop === 0
    isOnBottom = clientY < 0 && scrollTop + clientHeight + 1 >= scrollHeight
  }

  // For row-reverse: visual left is at max scrollLeft, visual right is at 0
  // For normal: visual left is at 0, visual right is at max scrollLeft
  let isOnLeft: boolean
  let isOnRight: boolean

  if (reversed.row) {
    // In row-reverse, scrolling right (clientX < 0) when at max scrollLeft means at visual left
    isOnLeft = clientX > 0 && Math.abs(scrollLeft) + clientWidth + 1 >= scrollWidth
    isOnRight = clientX < 0 && Math.abs(scrollLeft) <= 1
  } else {
    // Normal behavior
    isOnLeft = clientX > 0 && scrollLeft === 0
    isOnRight = clientX < 0 && scrollLeft + clientWidth + 1 >= scrollWidth
  }

  return {
    isOnTop,
    isOnBottom,
    isOnLeft,
    isOnRight,
  }
}
