# tua-body-scroll-lock

> inspired by [body-scroll-lock](https://github.com/willmcpo/body-scroll-lock)

<img src="https://img.shields.io/badge/dependencies-none-green.svg" alt="dependencies">
<a href="https://www.npmjs.com/package/tua-body-scroll-lock" target="_blank">
    <img src="https://badgen.net/npm/dm/tua-body-scroll-lock" alt="Downloads per month">
    <img src="https://img.shields.io/npm/v/tua-body-scroll-lock.svg" alt="Version">
    <img src="https://img.shields.io/npm/l/tua-body-scroll-lock.svg" alt="License">
</a>

English | [简体中文](./README-zh_CN.md)

## Introduction
As the name suggests, the tua-body-scroll-lock is used to lock the body scrolling package. And for the PC, mobile ios and android have done different processing, to ensure that they can be used perfectly on each end.

## install

```bash
$ npm i -S tua-body-scroll-lock
# OR
$ yarn add tua-body-scroll-lock
```

## use

### mobile

```js
import { lock, unlock } from 'tua-body-scroll-lock'

// After the lock is scroll, you still need internal scrollable elements (for mobile ios processing)
const targetElement = document.querySelector("#someElementId");

lock(targetElement)
unlock(targetElement)
```
### PC

> tips: The `targetElement` is not required on the PC side; you can passed of `null`, if you not need `targetElement` and the console prompt.

```js
import { lock, unlock } from 'tua-body-scroll-lock'

lock()
unlock()
```

## test
[testLink](https://tuateam.github.io/tua-body-scroll-lock)

![bodyScrollLock](./tua-bsl.png)
