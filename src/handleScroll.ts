import { getPreventEventDefault } from './utils'

export function handleScroll (
  event: TouchEvent,
  targetElement: HTMLElement,
  initialClientPos: { clientX: number; clientY: number },
  options: { isColumnReverse?: boolean; isRowReverse?: boolean } = {
    isColumnReverse: false,
    isRowReverse: false,
  },
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

    const { isColumnReverse = false, isRowReverse = false } = options

    const clientX = event.targetTouches[0].clientX - initialClientPos.clientX
    const clientY = event.targetTouches[0].clientY - initialClientPos.clientY
    const isVertical = Math.abs(clientY) > Math.abs(clientX)

    let isOnTop, isOnBottom, isOnLeft, isOnRight

    if (isColumnReverse) {
      isOnTop = clientY > 0 && scrollTop + clientHeight + 1 >= scrollHeight
      isOnBottom = clientY < 0 && scrollTop === 0
    } else {
      isOnTop = clientY > 0 && scrollTop === 0
      isOnBottom = clientY < 0 && scrollTop + clientHeight + 1 >= scrollHeight
    }

    if (isRowReverse) {
      isOnLeft = clientX > 0 && scrollLeft + clientWidth + 1 >= scrollWidth
      isOnRight = clientX < 0 && scrollLeft === 0
    } else {
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
