# tua-body-scroll-lock

<img src="https://img.shields.io/badge/dependencies-none-green.svg" alt="dependencies">
<a href="https://www.npmjs.com/package/tua-body-scroll-lock" target="_blank">
    <img src="https://badgen.net/npm/dm/tua-body-scroll-lock" alt="Downloads per month">
    <img src="https://img.shields.io/npm/v/tua-body-scroll-lock.svg" alt="Version">
    <img src="https://img.shields.io/npm/v/tua-body-scroll-lock/next.svg" alt="Next Version">
    <img src="https://img.shields.io/bundlephobia/minzip/tua-body-scroll-lock" alt="npm bundle size">
    <img src="https://img.shields.io/npm/l/tua-body-scroll-lock.svg" alt="License">
</a>

English | [简体中文](./README-zh_CN.md)

## Introduction
`tua-body-scroll-lock` enables body scroll locking for everything.

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

## Install
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
<summary>Minified UMD(`tua-bsl.umd.min.js`)</summary>

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
<summary>Minified ESM in browser(`tua-bsl.esm.browser.min.js`)</summary>

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

## Usage
### Normal

```js
import { lock, unlock } from 'tua-body-scroll-lock'

lock()
unlock()
```

### Options
#### overflowType: 'hidden' | 'clip'

optional, default: 'hidden'

`clip` is suitable for adapting elements of `position: sticky` in high-version browsers (Chrome 90 +).

> https://caniuse.com/mdn-css_types_overflow_clip

```js
import { lock } from 'tua-body-scroll-lock'

lock(targetElement, { overflowType: 'clip' })
```

#### useGlobalLockState: boolean

optional, default: false

Whether to use global `lockState` for every BSL. It's useful when your page have multiple BSL instances.

### TargetElement needs scrolling（iOS only）
In some scenarios, when scrolling is prohibited, some elements still need to scroll, at this point, pass the targetElement.

```js
import { lock, unlock } from 'tua-body-scroll-lock'
const elementOne = document.querySelector('#elementOne')
const elementTwo = document.querySelector('#elementTwo')

// one targetElement
const targetElement = elementOne
// multiple targetElements
const targetElements = [elementOne, elementTwo]

lock(targetElement)
lock(targetElements)
unlock(targetElement)
unlock(targetElements)
```

> The `targetElement` is not required on the PC and Android.

### clearBodyLocks
In the SPA, if you called `lock`, but forgot to call `unlock` before jumping to other pages, that is too bad. Because the operation of the page is not restored, such as forbid `touchmove`, `clearBodyLocks` is used to clear all side effects. Sure, you can also call `unlock`, but if you have called `lock` multiple times, you must call `unlock` multiple times, which is very unfriendly.

## Examples

![bodyScrollLock](./tua-bsl.jpg)

Please see these examples:
- [vue](./examples/vue/)
- [react](./examples/react/)
- [vanilla](./examples/vanilla/)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/evinma"><img src="https://avatars2.githubusercontent.com/u/16096567?v=4?s=100" width="100px;" alt="evinma"/><br /><sub><b>evinma</b></sub></a><br /><a href="https://github.com/tuax/tua-body-scroll-lock/commits?author=evinma" title="Code">💻</a> <a href="https://github.com/tuax/tua-body-scroll-lock/commits?author=evinma" title="Documentation">📖</a> <a href="#infra-evinma" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#translation-evinma" title="Translation">🌍</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://buptsteve.github.io"><img src="https://avatars2.githubusercontent.com/u/11501493?v=4?s=100" width="100px;" alt="StEve Young"/><br /><sub><b>StEve Young</b></sub></a><br /><a href="https://github.com/tuax/tua-body-scroll-lock/commits?author=BuptStEve" title="Code">💻</a> <a href="https://github.com/tuax/tua-body-scroll-lock/commits?author=BuptStEve" title="Documentation">📖</a> <a href="#infra-BuptStEve" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#translation-BuptStEve" title="Translation">🌍</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/li2go"><img src="https://avatars2.githubusercontent.com/u/11485337?v=4?s=100" width="100px;" alt="li2go"/><br /><sub><b>li2go</b></sub></a><br /><a href="https://github.com/tuax/tua-body-scroll-lock/commits?author=li2go" title="Code">💻</a> <a href="https://github.com/tuax/tua-body-scroll-lock/issues?q=author%3Ali2go" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/feitiange"><img src="https://avatars3.githubusercontent.com/u/7125157?v=4?s=100" width="100px;" alt="songyan,Wang"/><br /><sub><b>songyan,Wang</b></sub></a><br /><a href="https://github.com/tuax/tua-body-scroll-lock/commits?author=feitiange" title="Code">💻</a> <a href="https://github.com/tuax/tua-body-scroll-lock/issues?q=author%3Afeitiange" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://grawl.ru/"><img src="https://avatars2.githubusercontent.com/u/846774?v=4?s=100" width="100px;" alt="Даниил Пронин"/><br /><sub><b>Даниил Пронин</b></sub></a><br /><a href="https://github.com/tuax/tua-body-scroll-lock/issues?q=author%3AGrawl" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/magic-akari"><img src="https://avatars0.githubusercontent.com/u/7829098?v=4?s=100" width="100px;" alt="阿卡琳"/><br /><sub><b>阿卡琳</b></sub></a><br /><a href="https://github.com/tuax/tua-body-scroll-lock/issues?q=author%3Amagic-akari" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://calibur.tv"><img src="https://avatars.githubusercontent.com/u/16357724?v=4?s=100" width="100px;" alt="falstack"/><br /><sub><b>falstack</b></sub></a><br /><a href="https://github.com/tuax/tua-body-scroll-lock/commits?author=falstack" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/hustlelikeaboss"><img src="https://avatars.githubusercontent.com/u/25436661?v=4?s=100" width="100px;" alt="David Q. Jin"/><br /><sub><b>David Q. Jin</b></sub></a><br /><a href="https://github.com/tuax/tua-body-scroll-lock/issues?q=author%3Ahustlelikeaboss" title="Bug reports">🐛</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

> inspired by [body-scroll-lock](https://github.com/willmcpo/body-scroll-lock)
