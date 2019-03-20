(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.bodyScrollLock = {}));
}(this, function (exports) { 'use strict';

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

  var locksElement = [];
  var lockedNum = 0;
  var initialClientY;
  var unLockCallback;
  var documentListenerAdded;
  var hasPassiveEvents = false;

  if (typeof window !== 'undefined') {
    var passiveTestOptions = {
      get passive() {
        hasPassiveEvents = true;
        return undefined;
      }

    };
    window.addEventListener('testPassive', null, passiveTestOptions);
    window.removeEventListener('testPassive', null, passiveTestOptions);
  }

  var detectOS = function detectOS() {
    var ua = navigator.userAgent;
    var android = /(Android);?[\s/]+([\d.]+)?/.test(ua);
    var ipad = /(iPad).*OS\s([\d_]+)/.test(ua);
    var iphone = !ipad && /(iPhone\sOS)\s([\d_]+)/.test(ua);
    var ios = iphone || ipad;
    return {
      os: android ? 'android' : 'ios',
      ios: ios,
      ipad: ipad,
      iphone: iphone,
      android: android
    };
  };

  var setOverflowHiddenPc = function setOverflowHiddenPc() {
    var _context;

    var $ = (_context = document, document.querySelector).bind(_context);
    var $body = $('body');

    var bodyStyle = _objectSpread({}, $body.style);

    var scrollBarWidth = window.innerWidth - document.body.clientWidth;
    $body.style.overflow = 'hidden';
    $body.style.paddingRight = scrollBarWidth + 'px';
    $body.style.boxSizing = 'border-box';
    return function () {
      $body.style.overflow = bodyStyle.overflow || '';
      $body.style.paddingRight = bodyStyle.paddingRight || '';
      $body.style.boxSizing = bodyStyle.boxSizing || '';
    };
  };

  var setOverflowHiddenMobile = function setOverflowHiddenMobile() {
    var _context2;

    var $ = (_context2 = document, document.querySelector).bind(_context2);
    var $html = $('html');
    var $body = $('body');

    var htmlStyle = _objectSpread({}, $html.style);

    var bodyStyle = _objectSpread({}, $body.style);

    var scrollTop = $html.scrollTop || $body.scrollTop;
    $html.style.overflow = 'hidden';
    $html.style.height = '100%';
    $body.style.overflow = 'hidden';
    $body.style.top = "-".concat(scrollTop, "px");
    $body.style.width = '100%';
    $body.style.position = 'fixed';
    return function () {
      $html.style.overflow = htmlStyle.overflow || '';
      $html.style.height = htmlStyle.height || '';
      $body.style.overflow = bodyStyle.overflow || '';
      $body.style.height = bodyStyle.height || '';
      $body.style.width = bodyStyle.width || '';
      $body.style.position = '';
      $body.style.top = '';
      window.scrollTo(0, scrollTop);
    };
  };

  var preventDefault = function preventDefault(event) {
    if (event.cancelable) {
      event.preventDefault();
    }
  };

  var handleScroll = function handleScroll(event, targetElement) {
    var clientY = event.targetTouches[0].clientY - initialClientY;

    if (targetElement && targetElement.scrollTop === 0 && clientY > 0) {
      return preventDefault(event);
    }

    if (targetElement && targetElement.scrollHeight - 1 - targetElement.scrollTop <= targetElement.clientHeight && clientY < 0) {
      return preventDefault(event);
    }

    event.stopPropagation();
    return true;
  };

  var checkTargetElement = function checkTargetElement(targetElement) {
    if (!targetElement && targetElement !== null && true !== 'production') {
      console.warn('If scrolling is also required in the floating layer, the target element must be provided');
    }
  };

  var lock = function lock(targetElement) {
    checkTargetElement(targetElement);

    if (detectOS().ios) {
      if (targetElement && locksElement.indexOf(targetElement) < 0) {
        targetElement.ontouchstart = function (event) {
          initialClientY = event.targetTouches[0].clientY;
        };

        targetElement.ontouchmove = function (event) {
          if (event.targetTouches.length === 1) {
            handleScroll(event, targetElement);
          }
        };

        locksElement.push(targetElement);
      }

      if (!documentListenerAdded) {
        document.addEventListener('touchmove', preventDefault, hasPassiveEvents ? {
          passive: false
        } : undefined);
        documentListenerAdded = true;
      }
    } else {
      unLockCallback = detectOS().android ? setOverflowHiddenMobile() : setOverflowHiddenPc();
    }

    lockedNum += 1;
  };
  var unlock = function unlock(targetElement) {
    checkTargetElement(targetElement);
    lockedNum -= 1;
    if (lockedNum > 0 && !targetElement) return;

    if (detectOS().ios) {
      var targetElementIndex = locksElement.indexOf(targetElement);

      if (targetElementIndex > -1) {
        targetElement.ontouchstart = null;
        targetElement.ontouchmove = null;
        locksElement.splice(targetElementIndex, 1);
      }

      if (documentListenerAdded && lockedNum <= 0) {
        document.removeEventListener('touchmove', preventDefault, hasPassiveEvents ? {
          passive: false
        } : undefined);
        documentListenerAdded = false;
      }
    } else {
      lockedNum <= 0 && unLockCallback();
    }
  };

  exports.lock = lock;
  exports.unlock = unlock;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
