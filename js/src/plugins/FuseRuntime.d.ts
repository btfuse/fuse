import { FuseContext } from '../FuseContext';
import { FusePlugin } from '../FusePlugin';
import { TInsetCallback } from '../TInsetCallback';
export type TPauseCallbackHandler = () => void;
export type TResumeCallbackHandler = () => void;
export interface IRuntimeInfo {
    version: string;
    debugMode: boolean;
}
export declare class FuseRuntime extends FusePlugin {
    private $callbackIDs;
    constructor(context: FuseContext);
    protected _getID(): string;
    getInfo(): Promise<IRuntimeInfo>;
    registerPauseHandler(cb: TPauseCallbackHandler): Promise<string>;
    unregisterPauseHandler(callbackID: string): Promise<void>;
    registerResumeHandler(cb: TResumeCallbackHandler): Promise<string>;
    unregisterResumeHandler(callbackID: string): Promise<void>;
    registerInsetHandler(cb: TInsetCallback): Promise<string>;
    unregisterInsetHandler(callbackID: string): Promise<void>;
}
