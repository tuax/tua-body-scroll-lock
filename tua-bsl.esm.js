/**
 * tua-body-scroll-lock v1.0.0
 * (c) 2019 Evinma, BuptStEve
 * @license MIT
 */

var isServer = function isServer() {
  return typeof window === 'undefined';
};
var $ = function $(selector) {
  return document.querySelector(selector);
};
var detectOS = function detectOS(ua) {
  ua = ua || navigator.userAgent;
  var ipad = /(iPad).*OS\s([\d_]+)/.test(ua);
  var iphone = !ipad && /(iPhone\sOS)\s([\d_]+)/.test(ua);
  var android = /(Android);?[\s/]+([\d.]+)?/.test(ua);
  var ios = iphone || ipad;
  return {
    ios: ios,
    android: android
  };
};
function getEventListenerOptions(options) {
  /* istanbul ignore if */
  if (isServer()) return false;

  if (!options) {
    throw new Error('options must be provided');
  }

  var isSupportOptions = false;
  var listenerOptions = {
    get passive() {
      isSupportOptions = true;
      return;
    }

  };
  /* istanbul ignore next */

  var noop = function noop() {};

  var testEvent = '__TUA_BSL_TEST_PASSIVE__';
  window.addEventListener(testEvent, noop, listenerOptions);
  window.removeEventListener(testEvent, noop, listenerOptions);
  var capture = options.capture;
  /* istanbul ignore next */

  return isSupportOptions ? options : typeof capture !== 'undefined' ? capture : false;
}

var lockedNum = 0;
var initialClientY = 0;
var initialClientX = 0;
var unLockCallback = null;
var documentListenerAdded = false;
var lockedElements = [];
var eventListenerOptions = getEventListenerOptions({
  passive: false
});

var setOverflowHiddenPc = function setOverflowHiddenPc() {
  var $body = $('body');
  var bodyStyle = Object.assign({}, $body.style);
  var scrollBarWidth = window.innerWidth - document.body.clientWidth;
  $body.style.overflow = 'hidden';
  $body.style.boxSizing = 'border-box';
  $body.style.paddingRight = "".concat(scrollBarWidth, "px");
  return function () {
    ['overflow', 'boxSizing', 'paddingRight'].forEach(function (x) {
      $body.style[x] = bodyStyle[x] || '';
    });
  };
};

var setOverflowHiddenMobile = function setOverflowHiddenMobile() {
  var $html = $('html');
  var $body = $('body');
  var scrollTop = $html.scrollTop || $body.scrollTop;
  var htmlStyle = Object.assign({}, $html.style);
  var bodyStyle = Object.assign({}, $body.style);
  $html.style.height = '100%';
  $html.style.overflow = 'hidden';
  $body.style.top = "-".concat(scrollTop, "px");
  $body.style.width = '100%';
  $body.style.height = 'auto';
  $body.style.position = 'fixed';
  $body.style.overflow = 'hidden';
  return function () {
    $html.style.height = htmlStyle.height || '';
    $html.style.overflow = htmlStyle.overflow || '';
    ['top', 'width', 'height', 'overflow', 'position'].forEach(function (x) {
      $body.style[x] = bodyStyle[x] || '';
    });
    window.scrollTo(0, scrollTop);
  };
};

var preventDefault = function preventDefault(event) {
  if (!event.cancelable) return;
  event.preventDefault();
};

var handleScroll = function handleScroll(event, targetElement) {
  if (targetElement) {
    var scrollTop = targetElement.scrollTop,
        scrollLeft = targetElement.scrollLeft,
        scrollWidth = targetElement.scrollWidth,
        scrollHeight = targetElement.scrollHeight,
        clientWidth = targetElement.clientWidth,
        clientHeight = targetElement.clientHeight;
    var clientX = event.targetTouches[0].clientX - initialClientX;
    var clientY = event.targetTouches[0].clientY - initialClientY;
    var isVertical = Math.abs(clientY) > Math.abs(clientX);
    var isOnTop = clientY > 0 && scrollTop === 0;
    var isOnLeft = clientX > 0 && scrollLeft === 0;
    var isOnRight = clientX < 0 && scrollLeft + clientWidth + 1 >= scrollWidth;
    var isOnBottom = clientY < 0 && scrollTop + clientHeight + 1 >= scrollHeight;

    if (isVertical && (isOnTop || isOnBottom) || !isVertical && (isOnLeft || isOnRight)) {
      return preventDefault(event);
    }
  }

  event.stopPropagation();
  return true;
};

var checkTargetElement = function checkTargetElement(targetElement) {
  if (targetElement) return;
  if (targetElement === null) return;
  if (process.env.NODE_ENV === 'production') return;
  console.warn("If scrolling is also required in the floating layer, " + "the target element must be provided.");
};

var lock = function lock(targetElement) {
  if (isServer()) return;
  checkTargetElement(targetElement);

  if (detectOS().ios) {
    // iOS
    if (targetElement && lockedElements.indexOf(targetElement) === -1) {
      targetElement.ontouchstart = function (event) {
        initialClientY = event.targetTouches[0].clientY;
        initialClientX = event.targetTouches[0].clientX;
      };

      targetElement.ontouchmove = function (event) {
        if (event.targetTouches.length !== 1) return;
        handleScroll(event, targetElement);
      };

      lockedElements.push(targetElement);
    }

    if (!documentListenerAdded) {
      document.addEventListener('touchmove', preventDefault, eventListenerOptions);
      documentListenerAdded = true;
    }
  } else if (lockedNum <= 0) {
    unLockCallback = detectOS().android ? setOverflowHiddenMobile() : setOverflowHiddenPc();
  }

  lockedNum += 1;
};

var unlock = function unlock(targetElement) {
  if (isServer()) return;
  checkTargetElement(targetElement);
  lockedNum -= 1;
  if (lockedNum > 0) return;

  if (!detectOS().ios && typeof unLockCallback === 'function') {
    unLockCallback();
    return;
  } // iOS


  if (targetElement) {
    var index = lockedElements.indexOf(targetElement);

    if (index !== -1) {
      targetElement.ontouchmove = null;
      targetElement.ontouchstart = null;
      lockedElements.splice(index, 1);
    }
  }

  if (documentListenerAdded) {
    document.removeEventListener('touchmove', preventDefault, eventListenerOptions);
    documentListenerAdded = false;
  }
};

export { lock, unlock };
