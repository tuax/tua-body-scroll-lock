# tua-body-scroll-lock

<img src="https://img.shields.io/badge/dependencies-none-green.svg" alt="dependencies">
<a href="https://www.npmjs.com/package/tua-body-scroll-lock" target="_blank">
  <img src="https://badgen.net/npm/dm/tua-body-scroll-lock" alt="Downloads per month">
  <img src="https://img.shields.io/npm/v/tua-body-scroll-lock.svg" alt="Version">
  <img src="https://img.shields.io/npm/v/tua-body-scroll-lock/next.svg" alt="Next Version">
  <img src="https://img.shields.io/npm/l/tua-body-scroll-lock.svg" alt="License">
</a>

[English](./README.md) | 简体中文

## 介绍
`tua-body-scroll-lock` 解决了所有场景下滚动穿透的问题。


- <a href="https://stackblitz.com/edit/js-vixsu9?file=index.js">
  <img
    width="160"
    alt="Open in StackBlitz"
    src="https://developer.stackblitz.com/img/open_in_stackblitz.svg"
  />
</a>

- <a href="https://codepen.io/buptsteve-the-encoder/pen/QWJmJxB">
  <img
    width="160"
    alt="Open in codepen"
    src="https://assets.codepen.io/t-1/codepen-logo.svg"
  />
</a>

- <a href="https://codesandbox.io/s/o73z4jy5q9">Open in codesandbox</a>
- <a href="https://jsfiddle.net/buptsteve/6u8g3Lf5/">Open in jsfiddle</a>
- <a href="https://jsbin.com/cafiful/edit?output">Open in jsbin</a>


## 安装
### Node Package Manager(recommended)

```bash
pnpm i tua-body-scroll-lock
```

### CDN
<details>
<summary>UMD(`tua-bsl.umd.js`)</summary>

```html
<!-- unpkg -->
<script src="https://unpkg.com/tua-body-scroll-lock/dist/tua-bsl.umd.js"></script>

<!-- jsdelivr -->
<script src="https://cdn.jsdelivr.net/npm/tua-body-scroll-lock/dist/tua-bsl.umd.js"></script>
```

</details>

<details>
<summary>压缩版本的 UMD(`tua-bsl.umd.min.js`)</summary>

```html
<!-- unpkg -->
<script src="https://unpkg.com/tua-body-scroll-lock"></script>

<!-- jsdelivr -->
<script src="https://cdn.jsdelivr.net/npm/tua-body-scroll-lock"></script>
```

</details>

<details>
<summary>ESM in browser(`tua-bsl.esm.browser.js`)</summary>

```html
<!-- unpkg -->
<script type="module">
  import { lock, unlock } from 'https://unpkg.com/tua-body-scroll-lock/dist/tua-bsl.esm.browser.js'

  lock()
  unlock()
</script>

<!-- jsdelivr -->
<script type="module">
  import { lock, unlock } from 'https://cdn.jsdelivr.net/npm/tua-body-scroll-lock/dist/tua-bsl.esm.browser.js'

  lock()
  unlock()
</script>
```

</details>

<details>
<summary>压缩版本的 ESM in browser(`tua-bsl.esm.browser.min.js`)</summary>

```html
<!-- unpkg -->
<script type="module">
  import { lock, unlock } from 'https://unpkg.com/tua-body-scroll-lock/dist/tua-bsl.esm.browser.min.js'

  lock()
  unlock()
</script>

<!-- jsdelivr -->
<script type="module">
  import { lock, unlock } from 'https://cdn.jsdelivr.net/npm/tua-body-scroll-lock/dist/tua-bsl.esm.browser.min.js'

  lock()
  unlock()
</script>
```

</details>

## 使用
### 常规操作

```js
import { lock, unlock } from 'tua-body-scroll-lock'

lock()
unlock()
```

### 选项
#### overflowType: 'hidden' | 'clip'

可选，默认值: 'hidden'

`clip` 适合在高版本浏览器中（Chrome 90+）适配 `position: sticky` 的元素。

> https://caniuse.com/mdn-css_types_overflow_clip

```js
import { lock } from 'tua-body-scroll-lock'

lock(targetElement, { overflowType: 'clip' })
```

#### useGlobalLockState: boolean

可选，默认值: false

是否为页面上所有 BSL 实例共享 `lockState` 的状态。在你的页面上有多个 BSL 实例时很有用。

### 目标元素需要滚动（iOS only）
在某些场景下，禁止滚动穿透时，仍然有些元素需要滚动行为，此时传入目标 DOM 元素即可。

```js
import { lock, unlock } from 'tua-body-scroll-lock'
const elementOne = document.querySelector('#elementOne')
const elementTwo = document.querySelector('#elementTwo')

// 一个目标元素
const targetElement = elementOne
// 多个目标元素
const targetElements = [elementOne, elementTwo]

lock(targetElement)
lock(targetElements)
unlock(targetElement)
unlock(targetElements)
```

> PC 端和安卓端不需要传 targetElement。

### clearBodyLocks
在单页应用中，如果调用过`lock`，但是在跳转其他路由下的页面前忘记调用`unlock`，这是很糟糕的。因为对页面的操作都没有恢复，比如ios中禁止了`touchmove`；`clearBodyLocks`就是用来清除所有的副作用。当前你也可以调用`unlock`，但是如果之前调用过多次`lock`，那么就必须要调用多次`unlock`，这样很不友好。

## 示例

![bodyScrollLock](./tua-bsl.jpg)

请查看这些示例项目
- [vue](./examples/vue/)
- [react](./examples/react/)
- [vanilla](./examples/vanilla/)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/evinma"><img src="https://avatars2.githubusercontent.com/u/16096567?v=4?s=100" width="100px;" alt=""/><br /><sub><b>evinma</b></sub></a><br /><a href="https://github.com/tuax/tua-body-scroll-lock/commits?author=evinma" title="Code">💻</a> <a href="https://github.com/tuax/tua-body-scroll-lock/commits?author=evinma" title="Documentation">📖</a> <a href="#infra-evinma" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#translation-evinma" title="Translation">🌍</a></td>
    <td align="center"><a href="https://buptsteve.github.io"><img src="https://avatars2.githubusercontent.com/u/11501493?v=4?s=100" width="100px;" alt=""/><br /><sub><b>StEve Young</b></sub></a><br /><a href="https://github.com/tuax/tua-body-scroll-lock/commits?author=BuptStEve" title="Code">💻</a> <a href="https://github.com/tuax/tua-body-scroll-lock/commits?author=BuptStEve" title="Documentation">📖</a> <a href="#infra-BuptStEve" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#translation-BuptStEve" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/li2go"><img src="https://avatars2.githubusercontent.com/u/11485337?v=4?s=100" width="100px;" alt=""/><br /><sub><b>li2go</b></sub></a><br /><a href="https://github.com/tuax/tua-body-scroll-lock/commits?author=li2go" title="Code">💻</a> <a href="https://github.com/tuax/tua-body-scroll-lock/issues?q=author%3Ali2go" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/feitiange"><img src="https://avatars3.githubusercontent.com/u/7125157?v=4?s=100" width="100px;" alt=""/><br /><sub><b>songyan,Wang</b></sub></a><br /><a href="https://github.com/tuax/tua-body-scroll-lock/commits?author=feitiange" title="Code">💻</a> <a href="https://github.com/tuax/tua-body-scroll-lock/issues?q=author%3Afeitiange" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://grawl.ru/"><img src="https://avatars2.githubusercontent.com/u/846774?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Даниил Пронин</b></sub></a><br /><a href="https://github.com/tuax/tua-body-scroll-lock/issues?q=author%3AGrawl" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/magic-akari"><img src="https://avatars0.githubusercontent.com/u/7829098?v=4?s=100" width="100px;" alt=""/><br /><sub><b>阿卡琳</b></sub></a><br /><a href="https://github.com/tuax/tua-body-scroll-lock/issues?q=author%3Amagic-akari" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://calibur.tv"><img src="https://avatars.githubusercontent.com/u/16357724?v=4?s=100" width="100px;" alt=""/><br /><sub><b>falstack</b></sub></a><br /><a href="https://github.com/tuax/tua-body-scroll-lock/commits?author=falstack" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

> inspired by [body-scroll-lock](https://github.com/willmcpo/body-scroll-lock)
