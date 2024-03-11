import type { BSLOptions } from 'tua-body-scroll-lock'

declare global {
  interface Window {
    bodyScrollLock: {
      clearBodyLocks: (options?: BSLOptions) => void;
    };
  }
}

export function GlobalClearBtn () {
  function onClickClearBtn () {
    window.bodyScrollLock.clearBodyLocks({ useGlobalLockState: true })
  }

  return (
    <button id="clearBtn" onClick={onClickClearBtn} >
      click me to < br /> clear all body locks
    </button >
  )
}
