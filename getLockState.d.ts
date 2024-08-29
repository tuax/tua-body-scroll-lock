import type { BSLOptions, LockState } from './types';
/**
 * get current lockState
 * @param options
 * @returns lockState
 */
export declare function getLockState(options?: BSLOptions): LockState;
export declare namespace getLockState {
    var lockState: LockState;
}
