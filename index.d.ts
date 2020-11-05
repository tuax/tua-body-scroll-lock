declare const lock: (targetElement?: HTMLElement | HTMLElement[] | null | undefined) => void;
declare const unlock: (targetElement?: HTMLElement | HTMLElement[] | null | undefined) => void;
declare const clearBodyLocks: () => void;
export { lock, unlock, clearBodyLocks };
