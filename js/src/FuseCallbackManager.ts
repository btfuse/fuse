
/*
Copyright 2023 Breautek

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import {
    TNativeCallbackFunction
} from './internals';
import * as UUID from 'uuid';

export type TFuseAPICallbackHandler = (data: string) => void;

window.__btfuse_callbacks = new Map<string, TNativeCallbackFunction>();

window.__btfuse_doCallback = function(callbackID: string, data: string) {
    if (callbackID && window.__btfuse_callbacks.has(callbackID)) {
        window.__btfuse_callbacks.get(callbackID)(data);
    }
};

/**
 * A singleton manager to manage native callbacks.
 * 
 * Create a callback context and pass the return context id to native clients,
 * in which they can use to respond back.
 * 
 * Note that plugin APIs are far more efficient and can handle a diverse set of data,
 * including large payloads, so when possible it's best to use a plugin API instead of a
 * callback API.
 * 
 * This callback API is however, useful for building listener kind of services where the native
 * needs to continously callback to the webview with small data packets.
 */
export class FuseCallbackManager {
    private static $instance: FuseCallbackManager;

    private constructor() {}

    public static getInstance(): FuseCallbackManager {
        if (!FuseCallbackManager.$instance) {
            FuseCallbackManager.$instance = new FuseCallbackManager();
        }

        return FuseCallbackManager.$instance;
    }

    public createCallback(cb: TFuseAPICallbackHandler): string {
        const id: string = UUID.v4();
        window.__btfuse_callbacks.set(id, (data: string): void => {
            cb(data);
        });

        return id;
    }

    public releaseCallback(id: string): void {
        window.__btfuse_callbacks.delete(id);
    }
}
