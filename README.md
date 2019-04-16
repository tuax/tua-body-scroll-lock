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
`tua-body-scroll-lock` enables body scroll locking for everything.

### Why not [body-scroll-lock](https://github.com/willmcpo/body-scroll-lock)?
* Doesn't work on Android webview
* Doesn't work on PC with mouse wheel
* Doesn't work on iOS, if you touch somewhere instead of targetElement
* Must pass targetElement, even if it's not necessary

[Try This](https://codepen.io/buptsteve/pen/EJoKQK)

## Install

```bash
$ npm i -S tua-body-scroll-lock
# OR
$ yarn add tua-body-scroll-lock
```

## Usage
### normal

```js
import { lock, unlock } from 'tua-body-scroll-lock'

lock()
unlock()
```

### targetElement need scrolling（iOS only）

In some scenarios, when scrolling is prohibited, some elements still need to scroll, at this point, pass the targetElement.

```js
import { lock, unlock } from 'tua-body-scroll-lock'

const targetElement = document.querySelector("#someElementId")

lock(targetElement)
unlock(targetElement)
```

> The `targetElement` is not required on the PC and Android.

## Test
[testLink](https://tuateam.github.io/tua-body-scroll-lock)

![bodyScrollLock](./tua-bsl.png)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/evinma"><img src="https://avatars2.githubusercontent.com/u/16096567?v=4" width="100px;" alt="evinma"/><br /><sub><b>evinma</b></sub></a><br /><a href="https://github.com/tuateam/tua-body-scroll-lock/commits?author=evinma" title="Code">💻</a> <a href="https://github.com/tuateam/tua-body-scroll-lock/commits?author=evinma" title="Documentation">📖</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!