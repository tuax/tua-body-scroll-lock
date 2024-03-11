import type { BSLOptions, Nullable } from './types';
declare function lock(targetElement?: Nullable<HTMLElement>, options?: BSLOptions): void;
declare function unlock(targetElement?: Nullable<HTMLElement>, options?: BSLOptions): void;
declare function clearBodyLocks(options?: BSLOptions): void;
export * from './types';
export { lock, unlock, clearBodyLocks };
