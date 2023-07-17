type Nullable<T> = T | Array<T> | null;
declare const lock: (targetElement?: Nullable<HTMLElement>) => void;
declare const unlock: (targetElement?: Nullable<HTMLElement>) => void;
declare const clearBodyLocks: () => void;
export { lock, unlock, clearBodyLocks };
