import { getPreventEventDefault } from './utils'

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

    const isOnTop = clientY > 0 && scrollTop === 0
    const isOnLeft = clientX > 0 && scrollLeft === 0
    const isOnRight = clientX < 0 && scrollLeft + clientWidth + 1 >= scrollWidth
    const isOnBottom = clientY < 0 && scrollTop + clientHeight + 1 >= scrollHeight

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
