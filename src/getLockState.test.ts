/**
 * @jest-environment jsdom
 */

import { getLockState } from './getLockState'

describe('getLockState', () => {
  it('should generate window.__BSL_LOCK_STATE__', () => {
    expect(window.__BSL_LOCK_STATE__).toBeUndefined()

    getLockState()
    expect(window.__BSL_LOCK_STATE__).toBeUndefined()

    getLockState({ useGlobalLockState: true })
    expect(window.__BSL_LOCK_STATE__).toBeDefined()
  })
})
