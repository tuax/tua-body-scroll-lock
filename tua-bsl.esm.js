/**
 * tua-body-scroll-lock v0.2.0
 * (c) 2019 Evinma, BuptStEve
 * @license MIT
 */

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

var lockedNum = 0;
var initialClientY = 0;
var unLockCallback = null;
var documentListenerAdded = false;
var isServer = typeof window === 'undefined';
var lockedElements = [];
var $ = !isServer && document.querySelector.bind(document);
var eventListenerOptions;

if (!isServer) {
  var testEvent = '__TUA_BSL_TEST_PASSIVE__';
  var passiveTestOptions = {
    get passive() {
      eventListenerOptions = {
        passive: false
      };
    }

  };
  window.addEventListener(testEvent, null, passiveTestOptions);
  window.removeEventListener(testEvent, null, passiveTestOptions);
}

var detectOS = function detectOS() {
  var ua = navigator.userAgent;
  var ipad = /(iPad).*OS\s([\d_]+)/.test(ua);
  var iphone = !ipad && /(iPhone\sOS)\s([\d_]+)/.test(ua);
  var android = /(Android);?[\s/]+([\d.]+)?/.test(ua);
  var os = android ? 'android' : 'ios';
  var ios = iphone || ipad;
  return {
    os: os,
    ios: ios,
    ipad: ipad,
    iphone: iphone,
    android: android
  };
};

var setOverflowHiddenPc = function setOverflowHiddenPc() {
  var $body = $('body');

  var bodyStyle = _objectSpread({}, $body.style);

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

  var htmlStyle = _objectSpread({}, $html.style);

  var bodyStyle = _objectSpread({}, $body.style);

  $html.style.height = '100%';
  $html.style.overflow = 'hidden';
  $body.style.top = "-".concat(scrollTop, "px");
  $body.style.width = '100%';
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
  var clientY = event.targetTouches[0].clientY - initialClientY;

  if (targetElement) {
    var scrollTop = targetElement.scrollTop,
        scrollHeight = targetElement.scrollHeight,
        clientHeight = targetElement.clientHeight;
    var isOnTop = clientY > 0 && scrollTop === 0;
    var isOnBottom = clientY < 0 && scrollTop + clientHeight + 1 >= scrollHeight;

    if (isOnTop || isOnBottom) {
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
  if (isServer) return;
  checkTargetElement(targetElement);

  if (detectOS().ios) {
    // iOS
    if (targetElement && lockedElements.indexOf(targetElement) === -1) {
      targetElement.ontouchstart = function (event) {
        initialClientY = event.targetTouches[0].clientY;
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
  if (isServer) return;
  checkTargetElement(targetElement);
  lockedNum -= 1;
  if (lockedNum > 0) return;

  if (!detectOS().ios) {
    lockedNum <= 0 && typeof unLockCallback === 'function' && unLockCallback();
    return;
  } // iOS


  var index = lockedElements.indexOf(targetElement);

  if (index !== -1) {
    targetElement.ontouchmove = null;
    targetElement.ontouchstart = null;
    lockedElements.splice(index, 1);
  }

  if (documentListenerAdded) {
    document.removeEventListener('touchmove', preventDefault, eventListenerOptions);
    documentListenerAdded = false;
  }
};

export { lock, unlock };
