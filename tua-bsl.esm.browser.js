/**
 * tua-body-scroll-lock v1.4.1
 * (c) 2024 Evinma, BuptStEve
 * @license MIT
 */

const isServer = () => typeof window === 'undefined';
const detectOS = (ua) => {
    ua = ua || navigator.userAgent;
    const ipad = /(iPad).*OS\s([\d_]+)/.test(ua);
    const iphone = !ipad && /(iPhone\sOS)\s([\d_]+)/.test(ua);
    const android = /(Android);?[\s/]+([\d.]+)?/.test(ua);
    const ios = iphone || ipad;
    return { ios, android };
};
function getEventListenerOptions(options) {
    /* istanbul ignore if */
    if (isServer())
        return false;
    if (!options) {
        throw new Error('options must be provided');
    }
    let isSupportOptions = false;
    const listenerOptions = {
        get passive() {
            isSupportOptions = true;
            return undefined;
        },
    };
    /* istanbul ignore next */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const noop = () => { };
    const testEvent = '__TUA_BSL_TEST_PASSIVE__';
    window.addEventListener(testEvent, noop, listenerOptions);
    window.removeEventListener(testEvent, noop, listenerOptions);
    const { capture } = options;
    /* istanbul ignore next */
    return isSupportOptions
        ? options
        : typeof capture !== 'undefined'
            ? capture
            : false;
}
function noticeRequiredTargetElement(targetElement) {
    if (targetElement)
        return false;
    if (targetElement === null)
        return false;
    /* istanbul ignore if */
    {
        console.warn('If scrolling is also required in the floating layer, ' +
            'the target element must be provided.');
    }
    return true;
}
/**
 * Get global function that calls preventDefault
 */
function getPreventEventDefault() {
    if ('__BSL_PREVENT_DEFAULT__' in window) {
        return window.__BSL_PREVENT_DEFAULT__;
    }
    window.__BSL_PREVENT_DEFAULT__ = function (event) {
        if (!event.cancelable)
            return;
        event.preventDefault();
    };
    return window.__BSL_PREVENT_DEFAULT__;
}

const initialLockState = {
    lockedNum: 0,
    lockedElements: [],
    unLockCallback: null,
    documentListenerAdded: false,
    initialClientPos: {
        clientX: 0,
        clientY: 0,
    },
};
function getLockState(options) {
    if (isServer())
        return initialLockState;
    /** use local lockState */
    if (!(options === null || options === void 0 ? void 0 : options.useGlobalLockState))
        return getLockState.lockState;
    /** use global lockState */
    const lockState = '__BSL_LOCK_STATE__' in window
        ? Object.assign(Object.assign({}, initialLockState), window.__BSL_LOCK_STATE__) : initialLockState;
    /** assign to global */
    window.__BSL_LOCK_STATE__ = lockState;
    return lockState;
}
getLockState.lockState = initialLockState;

function handleScroll(event, targetElement, initialClientPos) {
    if (targetElement) {
        const { scrollTop, scrollLeft, scrollWidth, scrollHeight, clientWidth, clientHeight, } = targetElement;
        const clientX = event.targetTouches[0].clientX - initialClientPos.clientX;
        const clientY = event.targetTouches[0].clientY - initialClientPos.clientY;
        const isVertical = Math.abs(clientY) > Math.abs(clientX);
        const isOnTop = clientY > 0 && scrollTop === 0;
        const isOnLeft = clientX > 0 && scrollLeft === 0;
        const isOnRight = clientX < 0 && scrollLeft + clientWidth + 1 >= scrollWidth;
        const isOnBottom = clientY < 0 && scrollTop + clientHeight + 1 >= scrollHeight;
        if ((isVertical && (isOnTop || isOnBottom)) ||
            (!isVertical && (isOnLeft || isOnRight))) {
            return getPreventEventDefault()(event);
        }
    }
    event.stopPropagation();
    return true;
}

function setOverflowHiddenPc() {
    const $html = document.documentElement;
    const htmlStyle = Object.assign({}, $html.style);
    const scrollBarWidth = window.innerWidth - $html.clientWidth;
    const previousPaddingRight = parseInt(window.getComputedStyle($html).paddingRight, 10);
    $html.style.overflow = 'hidden';
    $html.style.boxSizing = 'border-box';
    $html.style.paddingRight = `${scrollBarWidth + previousPaddingRight}px`;
    return () => {
        ['overflow', 'boxSizing', 'paddingRight'].forEach((x) => {
            $html.style[x] = htmlStyle[x] || '';
        });
    };
}
function setOverflowHiddenMobile(options) {
    const $html = document.documentElement;
    const $body = document.body;
    const scrollTop = $html.scrollTop || $body.scrollTop;
    const htmlStyle = Object.assign({}, $html.style);
    const bodyStyle = Object.assign({}, $body.style);
    $html.style.height = '100%';
    $html.style.overflow = 'hidden';
    $body.style.top = `-${scrollTop}px`;
    $body.style.width = '100%';
    $body.style.height = 'auto';
    $body.style.position = 'fixed';
    $body.style.overflow = (options === null || options === void 0 ? void 0 : options.overflowType) || 'hidden';
    return () => {
        $html.style.height = htmlStyle.height || '';
        $html.style.overflow = htmlStyle.overflow || '';
        ['top', 'width', 'height', 'overflow', 'position'].forEach((x) => {
            $body.style[x] = bodyStyle[x] || '';
        });
        const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
        if (supportsNativeSmoothScroll) {
            window.scrollTo({ top: scrollTop, behavior: 'instant' });
        }
        else {
            window.scrollTo(0, scrollTop);
        }
    };
}

const eventListenerOptions = getEventListenerOptions({ passive: false });
function lock(targetElement, options) {
    if (isServer())
        return;
    noticeRequiredTargetElement(targetElement);
    const lockState = getLockState(options);
    if (detectOS().ios) {
        // iOS
        if (targetElement) {
            const elementArray = Array.isArray(targetElement) ? targetElement : [targetElement];
            elementArray.forEach((element) => {
                if (element && lockState.lockedElements.indexOf(element) === -1) {
                    element.ontouchstart = (event) => {
                        const { clientX, clientY } = event.targetTouches[0];
                        lockState.initialClientPos = { clientX, clientY };
                    };
                    element.ontouchmove = (event) => {
                        if (event.targetTouches.length !== 1)
                            return;
                        handleScroll(event, element, lockState.initialClientPos);
                    };
                    lockState.lockedElements.push(element);
                }
            });
        }
        if (!lockState.documentListenerAdded) {
            document.addEventListener('touchmove', getPreventEventDefault(), eventListenerOptions);
            lockState.documentListenerAdded = true;
        }
    }
    else if (lockState.lockedNum <= 0) {
        lockState.unLockCallback = detectOS().android
            ? setOverflowHiddenMobile(options)
            : setOverflowHiddenPc();
    }
    lockState.lockedNum += 1;
}
function unlock(targetElement, options) {
    if (isServer())
        return;
    noticeRequiredTargetElement(targetElement);
    const lockState = getLockState(options);
    lockState.lockedNum -= 1;
    if (lockState.lockedNum > 0)
        return;
    if (!detectOS().ios &&
        typeof lockState.unLockCallback === 'function') {
        lockState.unLockCallback();
        return;
    }
    // iOS
    if (targetElement) {
        const elementArray = Array.isArray(targetElement) ? targetElement : [targetElement];
        elementArray.forEach((element) => {
            const index = lockState.lockedElements.indexOf(element);
            if (index !== -1) {
                element.ontouchmove = null;
                element.ontouchstart = null;
                lockState.lockedElements.splice(index, 1);
            }
        });
    }
    if (lockState.documentListenerAdded) {
        document.removeEventListener('touchmove', getPreventEventDefault(), eventListenerOptions);
        lockState.documentListenerAdded = false;
    }
}
function clearBodyLocks(options) {
    if (isServer())
        return;
    const lockState = getLockState(options);
    lockState.lockedNum = 0;
    if (!detectOS().ios &&
        typeof lockState.unLockCallback === 'function') {
        lockState.unLockCallback();
        return;
    }
    // iOS
    if (lockState.lockedElements.length) {
        // clear events
        let element = lockState.lockedElements.pop();
        while (element) {
            element.ontouchmove = null;
            element.ontouchstart = null;
            element = lockState.lockedElements.pop();
        }
    }
    if (lockState.documentListenerAdded) {
        document.removeEventListener('touchmove', getPreventEventDefault(), eventListenerOptions);
        lockState.documentListenerAdded = false;
    }
}

export { clearBodyLocks, lock, unlock };
