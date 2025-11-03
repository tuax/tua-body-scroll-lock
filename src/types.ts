export type Nullable<T> = T | Array<T> | null;

export interface LockState {
  lockedNum: number,
  lockedElements: HTMLElement[],
  unLockCallback: null | (() => void),
  /** Only add document listener once */
  documentListenerAdded: boolean,
  initialClientPos: {
    clientX: number,
    clientY: number,
  },
}

export interface BSLOptions {
  /**
   * optional, default: false
   *
   * Used to prevent mouse scroll events in iOS simulator.
   */
  setOverflowForIOS?: boolean,
  /**
   * optional, default: 'hidden'
   *
   * `clip` is suitable for adapting elements of `position: sticky` in high-version browsers (Chrome 90 +).
   */
  overflowType?: 'hidden' | 'clip',
  /**
   * optional, default: false
   *
   * Whether to use global `lockState` for every BSL. It's useful when your page have multiple BSL instances.
   */
  useGlobalLockState?: boolean,
  /**
   * optional, default: true
   *
   * Whether to add padding-right to the html element when lock body scroll on PC.
   */
  withPaddingRight?: boolean,
}

declare global {
  interface Window {
    __BSL_LOCK_STATE__?: LockState
    __BSL_PREVENT_DEFAULT__?: (event: TouchEvent) => void
  }
}
