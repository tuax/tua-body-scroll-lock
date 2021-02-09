import {
    isServer,
    detectOS,
    getEventListenerOptions,
} from './utils'

type OverflowHiddenPcStyleType = 'overflow' | 'boxSizing' | 'paddingRight'
type OverflowHiddenMobileStyleType = 'top' | 'width' | 'height' | 'overflow' | 'position'
type Nullable<T> = T | Array<T> | null

let lockedNum = 0
let initialClientY = 0
let initialClientX = 0
let unLockCallback: any = null
let documentListenerAdded = false

const lockedElements: HTMLElement[] = []
const eventListenerOptions = getEventListenerOptions({ passive: false })
const supportsNativeSmoothScroll = !isServer() && 'scrollBehavior' in document.documentElement.style

const setOverflowHiddenPc = () => {
    const $body = document.body
    const bodyStyle = { ...$body.style }
    const scrollBarWidth = window.innerWidth - $body.clientWidth

    $body.style.overflow = 'hidden'
    $body.style.boxSizing = 'border-box'
    $body.style.paddingRight = `${scrollBarWidth}px`

    return () => {
        ;['overflow', 'boxSizing', 'paddingRight'].forEach((x: OverflowHiddenPcStyleType) => {
            $body.style[x] = bodyStyle[x] || ''
        })
    }
}

const setOverflowHiddenMobile = () => {
    const $html = document.documentElement
    const $body = document.body
    const scrollTop = $html.scrollTop || $body.scrollTop
    const htmlStyle = { ...$html.style }
    const bodyStyle = { ...$body.style }

    $html.style.height = '100%'
    $html.style.overflow = 'hidden'

    $body.style.top = `-${scrollTop}px`
    $body.style.width = '100%'
    $body.style.height = 'auto'
    $body.style.position = 'fixed'
    $body.style.overflow = 'hidden'

    return () => {
        $html.style.height = htmlStyle.height || ''
        $html.style.overflow = htmlStyle.overflow || ''

        ;['top', 'width', 'height', 'overflow', 'position'].forEach((x: OverflowHiddenMobileStyleType) => {
            $body.style[x] = bodyStyle[x] || ''
        })

        supportsNativeSmoothScroll
            ? window.scrollTo({
                top: scrollTop,
                // @ts-ignore
                behavior: 'instant',
            })
            : window.scrollTo(0, scrollTop)
    }
}

const preventDefault = (event: TouchEvent) => {
    if (!event.cancelable) return

    event.preventDefault()
}

const handleScroll = (event: TouchEvent, targetElement: HTMLElement) => {
    if (targetElement) {
        const {
            scrollTop,
            scrollLeft,
            scrollWidth,
            scrollHeight,
            clientWidth,
            clientHeight,
        } = targetElement
        const clientX = event.targetTouches[0].clientX - initialClientX
        const clientY = event.targetTouches[0].clientY - initialClientY
        const isVertical = Math.abs(clientY) > Math.abs(clientX)

        const isOnTop = clientY > 0 && scrollTop === 0
        const isOnLeft = clientX > 0 && scrollLeft === 0
        const isOnRight = clientX < 0 && scrollLeft + clientWidth + 1 >= scrollWidth
        const isOnBottom = clientY < 0 && scrollTop + clientHeight + 1 >= scrollHeight

        if (
            (isVertical && (isOnTop || isOnBottom)) ||
            (!isVertical && (isOnLeft || isOnRight))
        ) {
            return preventDefault(event)
        }
    }

    event.stopPropagation()
    return true
}

const checkTargetElement = (targetElement?: Nullable<HTMLElement>) => {
    if (targetElement) return
    if (targetElement === null) return
    if (process.env.NODE_ENV === 'production') return

    console.warn(
        `If scrolling is also required in the floating layer, ` +
        `the target element must be provided.`
    )
}

const lock = (targetElement?: Nullable<HTMLElement>) => {
    if (isServer()) return

    checkTargetElement(targetElement)

    if (detectOS().ios) {
        // iOS
        if (targetElement) {
            const elementArray = Array.isArray(targetElement) ? targetElement : [targetElement]

            elementArray.forEach((element) => {
                if (element && lockedElements.indexOf(element) === -1) {
                    element.ontouchstart = (event) => {
                        initialClientY = event.targetTouches[0].clientY
                        initialClientX = event.targetTouches[0].clientX
                    }

                    element.ontouchmove = (event) => {
                        if (event.targetTouches.length !== 1) return

                        handleScroll(event, element)
                    }

                    lockedElements.push(element)
                }
            })
        }

        if (!documentListenerAdded) {
            document.addEventListener('touchmove', preventDefault, eventListenerOptions)
            documentListenerAdded = true
        }
    } else if (lockedNum <= 0) {
        unLockCallback = detectOS().android
            ? setOverflowHiddenMobile()
            : setOverflowHiddenPc()
    }

    lockedNum += 1
}

const unlock = (targetElement?: Nullable<HTMLElement>) => {
    if (isServer()) return

    checkTargetElement(targetElement)
    lockedNum -= 1

    if (lockedNum > 0) return
    if (
        !detectOS().ios &&
        typeof unLockCallback === 'function'
    ) {
        unLockCallback()
        return
    }

    // iOS
    if (targetElement) {
        const elementArray = Array.isArray(targetElement) ? targetElement : [targetElement]

        elementArray.forEach((element) => {
            const index = lockedElements.indexOf(element)

            if (index !== -1) {
                element.ontouchmove = null
                element.ontouchstart = null
                lockedElements.splice(index, 1)
            }
        })

    }

    if (documentListenerAdded) {
        document.removeEventListener('touchmove', preventDefault, eventListenerOptions)
        documentListenerAdded = false
    }
}

const clearBodyLocks = () => {
    if (isServer()) return

    lockedNum = 0
    if (
        !detectOS().ios &&
        typeof unLockCallback === 'function'
    ) {
        unLockCallback()
        return
    }
    // IOS
    if (lockedElements.length) {
        // clear events
        let element = lockedElements.pop()
        while (element) {
            element.ontouchmove = null
            element.ontouchstart = null

            element = lockedElements.pop()
        }
    }

    if (documentListenerAdded) {
        document.removeEventListener('touchmove', preventDefault, eventListenerOptions)
        documentListenerAdded = false
    }
}

export { lock, unlock, clearBodyLocks }
