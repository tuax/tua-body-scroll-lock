# tua-body-scroll-lock

> inspired by [body-scroll-lock](https://github.com/willmcpo/body-scroll-lock)

<img src="https://img.shields.io/badge/dependencies-none-green.svg" alt="dependencies">
<a href="https://www.npmjs.com/package/tua-body-scroll-lock" target="_blank">
    <img src="https://badgen.net/npm/dm/tua-body-scroll-lock" alt="Downloads per month">
    <img src="https://img.shields.io/npm/v/tua-body-scroll-lock.svg" alt="Version">
    <img src="https://img.shields.io/npm/l/tua-body-scroll-lock.svg" alt="License">
</a>

[English](./README.md) | 简体中文

## 介绍
`tua-body-scroll-lock` 解决了所有场景下滚动穿透的问题。

### 为什么不用 [body-scroll-lock](https://github.com/willmcpo/body-scroll-lock)？
* 低版本安卓下失效
* PC 端滚轮行为失效
* iOS 端触摸非 targetElement 时失效
* 使用时必须传 targetElement（即使并不需要）

[点击尝试](https://codepen.io/buptsteve/pen/EJoKQK)

## 安装

```bash
$ npm i -S tua-body-scroll-lock
# OR
$ yarn add tua-body-scroll-lock
```

## 使用
### 常规操作

```js
import { lock, unlock } from 'tua-body-scroll-lock'

lock()
unlock()
```

### 目标元素需要滚动（iOS only）
在某些场景下，禁止滚动穿透时，仍然有些元素需要滚动行为，此时传入目标 DOM 元素即可。

```js
import { lock, unlock } from 'tua-body-scroll-lock'

const targetElement = document.querySelector("#someElementId")

lock(targetElement)
unlock(targetElement)
```

> PC 端和安卓端不需要传 targetElement。

## 测试
[测试链接](https://tuateam.github.io/tua-body-scroll-lock)

![bodyScrollLock](./tua-bsl.png)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/evinma"><img src="https://avatars2.githubusercontent.com/u/16096567?v=4" width="100px;" alt="evinma"/><br /><sub><b>evinma</b></sub></a><br /><a href="https://github.com/tuateam/tua-body-scroll-lock/commits?author=evinma" title="Code">💻</a> <a href="https://github.com/tuateam/tua-body-scroll-lock/commits?author=evinma" title="Documentation">📖</a></td><td align="center"><a href="https://buptsteve.github.io"><img src="https://avatars2.githubusercontent.com/u/11501493?v=4" width="100px;" alt="StEve Young"/><br /><sub><b>StEve Young</b></sub></a><br /><a href="https://github.com/tuateam/tua-body-scroll-lock/commits?author=BuptStEve" title="Documentation">📖</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
