export declare const isServer: () => boolean;
export interface DetectOSResult {
    ios: boolean;
    android: boolean;
}
export declare const detectOS: (ua?: string | undefined) => DetectOSResult;
export declare function getEventListenerOptions(options: AddEventListenerOptions): AddEventListenerOptions | boolean;
