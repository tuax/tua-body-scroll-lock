import { getLockState } from 'tua-body-scroll-lock'

export function printLockedNum () {
  console.log('scroll.local:', getLockState({ useGlobalLockState: false }).lockedNum, 'scroll.global:', getLockState({ useGlobalLockState: true }).lockedNum)
}
