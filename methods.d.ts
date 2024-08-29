import type { BSLOptions, LockState, Nullable } from './types';
/**
 * lock body scroll
 * @param targetElement the element(s) still needs scrolling（iOS only）
 * @param options
 */
export declare function lock(targetElement?: Nullable<HTMLElement>, options?: BSLOptions): void;
/**
 * unlock body scroll
 * @param targetElement the element(s) still needs scrolling（iOS only）
 * @param options
 */
export declare function unlock(targetElement?: Nullable<HTMLElement>, options?: BSLOptions): void;
/**
 * clear all body locks
 * @param options
 */
export declare function clearBodyLocks(options?: BSLOptions): void;
export declare function unlockByCallback(lockState: LockState): boolean;
export declare function addTouchMoveListener(lockState: LockState): void;
export declare function removeTouchMoveListener(lockState: LockState): void;
