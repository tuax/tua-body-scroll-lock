import type { BSLOptions, LockState } from './types'
import { isServer } from './utils'

const initialLockState: LockState = {
  lockedNum: 0,
  lockedElements: [],
  unLockCallback: null,
  documentListenerAdded: false,
  initialClientPos: {
    clientX: 0,
    clientY: 0,
  },
}

/**
 * get current lockState
 * @param options
 * @returns lockState
 */
export function getLockState (options?: BSLOptions): LockState {
  if (isServer()) return initialLockState

  /** use local lockState */
  if (!options?.useGlobalLockState) return getLockState.lockState

  /** use global lockState */
  const lockState = '__BSL_LOCK_STATE__' in window
    ? {
        ...initialLockState,
        ...window.__BSL_LOCK_STATE__,
      }
    : initialLockState

  /** assign to global */
  window.__BSL_LOCK_STATE__ = lockState

  return lockState
}
getLockState.lockState = initialLockState
