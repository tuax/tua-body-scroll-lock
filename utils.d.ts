import { Nullable } from './types';
export declare const isServer: () => boolean;
export interface DetectOSResult {
    ios: boolean;
    android: boolean;
}
export declare const detectOS: (ua?: string) => DetectOSResult;
export declare function getEventListenerOptions(options: AddEventListenerOptions): AddEventListenerOptions | boolean;
export declare function noticeRequiredTargetElement(targetElement?: Nullable<HTMLElement>): boolean;
export declare function preventEventDefault(event: TouchEvent): void;
