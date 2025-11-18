import { getPreventEventDefault, getScrollBoundaryState } from './utils'

export function handleScroll (
  event: TouchEvent,
  targetElement: HTMLElement,
  initialClientPos: { clientX: number, clientY: number; },
) {
  if (targetElement) {
    const clientX = event.targetTouches[0].clientX - initialClientPos.clientX
    const clientY = event.targetTouches[0].clientY - initialClientPos.clientY
    const isVertical = Math.abs(clientY) > Math.abs(clientX)

    // Get scroll boundary state
    const { isOnTop, isOnBottom, isOnLeft, isOnRight } = getScrollBoundaryState(
      targetElement,
      clientX,
      clientY,
    )

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
