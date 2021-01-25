# tua-body-scroll-lock

> inspired by [body-scroll-lock](https://github.com/willmcpo/body-scroll-lock)

<img src="https://img.shields.io/badge/dependencies-none-green.svg" alt="dependencies">
<a href="https://www.npmjs.com/package/tua-body-scroll-lock" target="_blank">
    <img src="https://badgen.net/npm/dm/tua-body-scroll-lock" alt="Downloads per month">
    <img src="https://img.shields.io/npm/v/tua-body-scroll-lock.svg" alt="Version">
    <img src="https://img.shields.io/npm/v/tua-body-scroll-lock/next.svg" alt="Next Version">
    <img src="https://img.shields.io/npm/l/tua-body-scroll-lock.svg" alt="License">
</a>

English | [简体中文](./README-zh_CN.md)

## Introduction
`tua-body-scroll-lock` enables body scroll locking for everything.

### Why not [body-scroll-lock(BSL)](https://github.com/willmcpo/body-scroll-lock)?
* Doesn't work on Android webview
* Doesn't work on PC with mouse wheel
* Doesn't work on iOS, if you touch somewhere instead of `targetElement`
* Must pass `targetElement`, even if it's not necessary

[😱Can't believe it? Please try this demo with BSL yourself.](https://codepen.io/buptsteve/pen/EJoKQK)

## Install
### Node Package Manager(recommended)

```bash
$ npm i -S tua-body-scroll-lock
# OR
$ yarn add tua-body-scroll-lock
```

### CDN
* UMD(`tua-bsl.umd.js`)
  * unpkg: https://unpkg.com/tua-body-scroll-lock
  * jsdelivr: https://cdn.jsdelivr.net/npm/tua-body-scroll-lock

<details>
<summary>example code</summary>

```html
<!-- unpkg -->
<script src="https://unpkg.com/tua-body-scroll-lock"></script>

<!-- jsdelivr -->
<script src="https://cdn.jsdelivr.net/npm/tua-body-scroll-lock"></script>
```

</details>

* Minified UMD(`tua-bsl.umd.min.js`)
  * unpkg: https://unpkg.com/tua-body-scroll-lock/dist/tua-bsl.umd.min.js
  * jsdelivr: https://cdn.jsdelivr.net/npm/tua-body-scroll-lock/dist/tua-bsl.umd.min.js

<details>
<summary>example code</summary>

```html
<!-- unpkg -->
<script src="https://unpkg.com/tua-body-scroll-lock/dist/tua-bsl.umd.min.js"></script>

<!-- jsdelivr -->
<script src="https://cdn.jsdelivr.net/npm/tua-body-scroll-lock/dist/tua-bsl.umd.min.js"></script>
```

</details>

* ESM in browser(`tua-bsl.esm.browser.js`)
  * unpkg: https://unpkg.com/tua-body-scroll-lock/dist/tua-bsl.esm.browser.js
  * jsdelivr: https://cdn.jsdelivr.net/npm/tua-body-scroll-lock/dist/tua-bsl.esm.browser.js

<details>
<summary>example code</summary>

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

* Minified ESM in browser(`tua-bsl.esm.browser.min.js`)
  * unpkg: https://unpkg.com/tua-body-scroll-lock/dist/tua-bsl.esm.browser.min.js
  * jsdelivr: https://cdn.jsdelivr.net/npm/tua-body-scroll-lock/dist/tua-bsl.esm.browser.min.js

<details>
<summary>example code</summary>

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
#### [demo.vue](https://codepen.io/evinma/pen/OJNJdoy)
```js
<template>
  // some element
</template>
<script>
import { lock, unlock, clearBodyLocks } from 'tua-body-scroll-lock';

export default {
  name: 'demo',
  data () {
    return {}
  },
  methods: {
    showDialog () {
      // Disable body scroll
      lock()
    },
    hideDialog () {
      // Enable body scroll
      unlock()
    }
  },
  beforeDestroy () {
    // If forgot to call unlock before jumping to other pages, `clearBodyLocks` can clean all side effect.
    clearBodyLocks()
  }
}
</script>
```

## Demo

![bodyScrollLock](./tua-bsl.png)

platform | link |
| - | -
gh-pages | https://tuateam.github.io/tua-body-scroll-lock |
jsbin | https://jsbin.com/cafiful/edit?output |
codepen | https://codepen.io/buptsteve/pen/PvNQjP |
jsfiddle | https://jsfiddle.net/buptsteve/6u8g3Lf5/ |
codesandbox | https://codesandbox.io/s/o73z4jy5q9 |

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/evinma"><img src="https://avatars2.githubusercontent.com/u/16096567?v=4?s=100" width="100px;" alt=""/><br /><sub><b>evinma</b></sub></a><br /><a href="https://github.com/tuateam/tua-body-scroll-lock/commits?author=evinma" title="Code">💻</a> <a href="https://github.com/tuateam/tua-body-scroll-lock/commits?author=evinma" title="Documentation">📖</a> <a href="#infra-evinma" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#translation-evinma" title="Translation">🌍</a></td>
    <td align="center"><a href="https://buptsteve.github.io"><img src="https://avatars2.githubusercontent.com/u/11501493?v=4?s=100" width="100px;" alt=""/><br /><sub><b>StEve Young</b></sub></a><br /><a href="https://github.com/tuateam/tua-body-scroll-lock/commits?author=BuptStEve" title="Code">💻</a> <a href="https://github.com/tuateam/tua-body-scroll-lock/commits?author=BuptStEve" title="Documentation">📖</a> <a href="#infra-BuptStEve" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#translation-BuptStEve" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/li2go"><img src="https://avatars2.githubusercontent.com/u/11485337?v=4?s=100" width="100px;" alt=""/><br /><sub><b>li2go</b></sub></a><br /><a href="https://github.com/tuateam/tua-body-scroll-lock/commits?author=li2go" title="Code">💻</a> <a href="https://github.com/tuateam/tua-body-scroll-lock/issues?q=author%3Ali2go" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/feitiange"><img src="https://avatars3.githubusercontent.com/u/7125157?v=4?s=100" width="100px;" alt=""/><br /><sub><b>songyan,Wang</b></sub></a><br /><a href="https://github.com/tuateam/tua-body-scroll-lock/commits?author=feitiange" title="Code">💻</a> <a href="https://github.com/tuateam/tua-body-scroll-lock/issues?q=author%3Afeitiange" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://grawl.ru/"><img src="https://avatars2.githubusercontent.com/u/846774?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Даниил Пронин</b></sub></a><br /><a href="https://github.com/tuateam/tua-body-scroll-lock/issues?q=author%3AGrawl" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/magic-akari"><img src="https://avatars0.githubusercontent.com/u/7829098?v=4?s=100" width="100px;" alt=""/><br /><sub><b>阿卡琳</b></sub></a><br /><a href="https://github.com/tuateam/tua-body-scroll-lock/issues?q=author%3Amagic-akari" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://calibur.tv"><img src="https://avatars.githubusercontent.com/u/16357724?v=4?s=100" width="100px;" alt=""/><br /><sub><b>falstack</b></sub></a><br /><a href="https://github.com/tuateam/tua-body-scroll-lock/commits?author=falstack" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
