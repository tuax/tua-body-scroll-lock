let lockedNum = 0
let initialClientY = 0
let unLockCallback = null
let documentListenerAdded = false

const isServer = typeof window === 'undefined'
const lockedElements = []

const $ = !isServer && document.querySelector.bind(document)

let eventListenerOptions
if (!isServer) {
    const testEvent = '__TUA_BSL_TEST_PASSIVE__'
    const passiveTestOptions = {
        get passive () {
            eventListenerOptions = { passive: false }
        },
    }
    window.addEventListener(testEvent, null, passiveTestOptions)
    window.removeEventListener(testEvent, null, passiveTestOptions)
}

const detectOS = () => {
    const ua = navigator.userAgent
    const ipad = /(iPad).*OS\s([\d_]+)/.test(ua)
    const iphone = !ipad && /(iPhone\sOS)\s([\d_]+)/.test(ua)
    const android = /(Android);?[\s/]+([\d.]+)?/.test(ua)

    const os = android ? 'android' : 'ios'
    const ios = iphone || ipad

    return { os, ios, ipad, iphone, android }
}

const setOverflowHiddenPc = () => {
    const $body = $('body')
    const bodyStyle = { ...$body.style }
    const scrollBarWidth = window.innerWidth - document.body.clientWidth

    $body.style.overflow = 'hidden'
    $body.style.boxSizing = 'border-box'
    $body.style.paddingRight = `${scrollBarWidth}px`

    return () => {
        ;['overflow', 'boxSizing', 'paddingRight'].forEach((x) => {
            $body.style[x] = bodyStyle[x] || ''
        })
    }
}

const setOverflowHiddenMobile = () => {
    const $html = $('html')
    const $body = $('body')
    const scrollTop = $html.scrollTop || $body.scrollTop
    const htmlStyle = { ...$html.style }
    const bodyStyle = { ...$body.style }

    $html.style.height = '100%'
    $html.style.overflow = 'hidden'

    $body.style.top = `-${scrollTop}px`
    $body.style.width = '100%'
    $body.style.position = 'fixed'
    $body.style.overflow = 'hidden'

    return () => {
        $html.style.height = htmlStyle.height || ''
        $html.style.overflow = htmlStyle.overflow || ''

        ;['top', 'width', 'height', 'overflow', 'position'].forEach((x) => {
            $body.style[x] = bodyStyle[x] || ''
        })

        window.scrollTo(0, scrollTop)
    }
}

const preventDefault = (event) => {
    if (!event.cancelable) return

    event.preventDefault()
}

const handleScroll = (event, targetElement) => {
    const clientY = event.targetTouches[0].clientY - initialClientY

    if (targetElement) {
        const { scrollTop, scrollHeight, clientHeight } = targetElement
        const isOnTop = clientY > 0 && scrollTop === 0
        const isOnBottom = clientY < 0 && scrollTop + clientHeight + 1 >= scrollHeight

        if (isOnTop || isOnBottom) {
            return preventDefault(event)
        }
    }

    event.stopPropagation()
    return true
}

const checkTargetElement = (targetElement) => {
    if (targetElement) return
    if (targetElement === null) return
    if (process.env.NODE_ENV === 'production') return

    console.warn(
        `If scrolling is also required in the floating layer, ` +
        `the target element must be provided.`
    )
}

const lock = (targetElement) => {
    if (isServer) return

    checkTargetElement(targetElement)

    if (detectOS().ios) {
        // iOS
        if (targetElement && lockedElements.indexOf(targetElement) === -1) {
            targetElement.ontouchstart = (event) => {
                initialClientY = event.targetTouches[0].clientY
            }

            targetElement.ontouchmove = (event) => {
                if (event.targetTouches.length !== 1) return

                handleScroll(event, targetElement)
            }

            lockedElements.push(targetElement)
        }

        if (!documentListenerAdded) {
            document.addEventListener('touchmove', preventDefault, eventListenerOptions)
            documentListenerAdded = true
        }
    } else if (lockedNum <= 0) {
        unLockCallback = detectOS().android ? setOverflowHiddenMobile() : setOverflowHiddenPc()
    }

    lockedNum += 1
}

const unlock = (targetElement) => {
    if (isServer) return

    checkTargetElement(targetElement)
    lockedNum -= 1

    if (lockedNum > 0) return
    if (!detectOS().ios) {
        lockedNum <= 0 && typeof unLockCallback === 'function' && unLockCallback()
        return
    }

    // iOS
    const index = lockedElements.indexOf(targetElement)
    if (index !== -1) {
        targetElement.ontouchmove = null
        targetElement.ontouchstart = null
        lockedElements.splice(index, 1)
    }

    if (documentListenerAdded) {
        document.removeEventListener('touchmove', preventDefault, eventListenerOptions)
        documentListenerAdded = false
    }
}

export { lock, unlock }
