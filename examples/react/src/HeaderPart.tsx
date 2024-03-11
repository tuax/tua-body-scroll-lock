import { name } from '../package.json'

export function HeaderPart () {
  return (
    <header>
      <h1>tua-body-scroll-lock {name}</h1>
      <img src="https://img.shields.io/badge/dependencies-none-green.svg" alt="dependencies" />
      <a href="https://www.npmjs.com/package/tua-body-scroll-lock" target="_blank">
        <img src="https://badgen.net/npm/dm/tua-body-scroll-lock" alt="Downloads per month"/>
        <img src="https://img.shields.io/npm/v/tua-body-scroll-lock.svg" alt="Version"/>
        <img src="https://img.shields.io/npm/v/tua-body-scroll-lock/next.svg" alt="Next Version"/>
        <img src="https://img.shields.io/npm/l/tua-body-scroll-lock.svg" alt="License"/>
      </a>
    </header>
  )
}
