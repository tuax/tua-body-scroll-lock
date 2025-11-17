import { getPreventEventDefault } from './utils'

/**
 * Check if element uses reversed flex direction
 */
function isReversedFlex (element: HTMLElement): { column: boolean, row: boolean } {
  const computedStyle = window.getComputedStyle(element)
  const flexDirection = computedStyle.flexDirection

  return {
    column: flexDirection === 'column-reverse',
    row: flexDirection === 'row-reverse',
  }
}

export function handleScroll (
  event: TouchEvent,
  targetElement: HTMLElement,
  initialClientPos: { clientX: number, clientY: number; },
) {
  if (targetElement) {
    const {
      scrollTop,
      scrollLeft,
      scrollWidth,
      scrollHeight,
      clientWidth,
      clientHeight,
    } = targetElement
    const clientX = event.targetTouches[0].clientX - initialClientPos.clientX
    const clientY = event.targetTouches[0].clientY - initialClientPos.clientY
    const isVertical = Math.abs(clientY) > Math.abs(clientX)

    // Check if element uses reversed flex direction
    const reversed = isReversedFlex(targetElement)

    // For column-reverse: visual top is at max scrollTop, visual bottom is at 0
    // For normal: visual top is at 0, visual bottom is at max scrollTop
    let isOnTop: boolean
    let isOnBottom: boolean

    if (reversed.column) {
      // In column-reverse, scrolling down (clientY < 0) when at max scrollTop means at visual top
      isOnTop = clientY < 0 && scrollTop + clientHeight + 1 >= scrollHeight
      isOnBottom = clientY < 0 && scrollTop === 0
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
      isOnLeft = clientX < 0 && scrollLeft + clientWidth + 1 >= scrollWidth
      isOnRight = clientX < 0 && scrollLeft === 0
    } else {
      // Normal behavior
      isOnLeft = clientX > 0 && scrollLeft === 0
      isOnRight = clientX < 0 && scrollLeft + clientWidth + 1 >= scrollWidth
    }

    if (
      (isVertical && (isOnTop || isOnBottom)) ||
      (!isVertical && (isOnLeft || isOnRight))
    ) {
      return getPreventEventDefault()(event)
    }
  }

  event.stopPropagation()
  return true
}
