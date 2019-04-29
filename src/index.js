let locksElement = []
let lockedNum = 0
let initialClientY
let unLockCallback
let documentListenerAdded

let hasPassiveEvents = false
if (typeof window !== 'undefined') {
    const passiveTestOptions = {
        get passive () {
            hasPassiveEvents = true
            return undefined
        },
    }
    window.addEventListener('testPassive', null, passiveTestOptions)
    window.removeEventListener('testPassive', null, passiveTestOptions)
}

const detectOS = () => {
    const ua = navigator.userAgent
    const android = /(Android);?[\s/]+([\d.]+)?/.test(ua)
    const ipad = /(iPad).*OS\s([\d_]+)/.test(ua)
    const iphone = !ipad && /(iPhone\sOS)\s([\d_]+)/.test(ua)
    const ios = iphone || ipad

    return {
        os: android ? 'android' : 'ios',
        ios,
        ipad,
        iphone,
        android,
    }
}

const setOverflowHiddenPc = () => {
    const $ = document::document.querySelector
    const $body = $('body')
    const bodyStyle = { ...$body.style }
    const scrollBarWidth = window.innerWidth - document.body.clientWidth
    $body.style.overflow = 'hidden'
    $body.style.paddingRight = scrollBarWidth + 'px'
    $body.style.boxSizing = 'border-box'

    return () => {
        $body.style.overflow = bodyStyle.overflow || ''
        $body.style.paddingRight = bodyStyle.paddingRight || ''
        $body.style.boxSizing = bodyStyle.boxSizing || ''
    }
}

const setOverflowHiddenMobile = () => {
    const $ = document::document.querySelector
    const $html = $('html')
    const $body = $('body')

    const htmlStyle = { ...$html.style }
    const bodyStyle = { ...$body.style }

    const scrollTop = $html.scrollTop || $body.scrollTop

    $html.style.overflow = 'hidden'
    $html.style.height = '100%'

    $body.style.overflow = 'hidden'
    $body.style.top = `-${scrollTop}px`
    $body.style.width = '100%'
    $body.style.position = 'fixed'

    return () => {
        $html.style.overflow = htmlStyle.overflow || ''
        $html.style.height = htmlStyle.height || ''

        $body.style.overflow = bodyStyle.overflow || ''
        $body.style.height = bodyStyle.height || ''
        $body.style.width = bodyStyle.width || ''
        $body.style.position = ''
        $body.style.top = ''
        window.scrollTo(0, scrollTop)
    }
}

const preventDefault = event => {
    if (event.cancelable) {
        event.preventDefault()
    }
}

const handleScroll = (event, targetElement) => {
    const clientY = event.targetTouches[0].clientY - initialClientY

    if (targetElement && targetElement.scrollTop === 0 && clientY > 0) {
        return preventDefault(event)
    }

    if (targetElement && (targetElement.scrollHeight - 1 - targetElement.scrollTop <= targetElement.clientHeight) && clientY < 0) {
        return preventDefault(event)
    }

    event.stopPropagation()
    return true
}

const checkTargetElement = (targetElement) => {
    if (!targetElement && targetElement !== null && process.env.NODE_ENV !== 'production') {
        console.warn('If scrolling is also required in the floating layer, the target element must be provided')
    }
}

export const lock = (targetElement) => {
    checkTargetElement(targetElement)

    if (detectOS().ios) {
        if (targetElement && locksElement.indexOf(targetElement) < 0) {
            targetElement.ontouchstart = event => {
                initialClientY = event.targetTouches[0].clientY
            }
            targetElement.ontouchmove = event => {
                if (event.targetTouches.length === 1) {
                    handleScroll(event, targetElement)
                }
            }
            locksElement.push(targetElement)
        }
        if (!documentListenerAdded) {
            document.addEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined)
            documentListenerAdded = true
        }
    } else {
        unLockCallback = detectOS().android ? setOverflowHiddenMobile() : setOverflowHiddenPc()
    }
    lockedNum += 1
}

export const unlock = (targetElement) => {
    checkTargetElement(targetElement)

    lockedNum -= 1
    if (lockedNum > 0 && !targetElement) return
    if (detectOS().ios) {
        const targetElementIndex = locksElement.indexOf(targetElement)
        if (targetElementIndex > -1) {
            targetElement.ontouchstart = null
            targetElement.ontouchmove = null
            locksElement.splice(targetElementIndex, 1)
        }
        if (documentListenerAdded && lockedNum <= 0) {
            document.removeEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined)

            documentListenerAdded = false
        }
    } else {
        lockedNum <= 0 && typeof unLockCallback === "function" && unLockCallback()
    }
}
