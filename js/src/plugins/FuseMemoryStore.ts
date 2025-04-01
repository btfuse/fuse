
/*
Copyright 2023-2025 Breautek

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

import { ContentType } from '../ContentType';
import { FuseContext } from '../FuseContext';
import {FusePlugin} from '../FusePlugin';
import {FuseAPIResponse} from '../FuseAPIResponse';

/**
 * A class to interface with native memory store object
 * These memory stores can store stateful strings. This state
 * is kept in memory even if the OS destroys the application's UI while
 * the application is in the background.
 * 
 * This is not to be confused with persistent storage. The memory
 * store is intended to simply store state in between a paused application.
 * If the application completely gets closed, destroyed or stopped by the user,
 * the memory store will be cleared.
 */
export class FuseMemoryStore extends FusePlugin {

    public constructor(context: FuseContext) {
        super(context);
    }

    protected override _getID(): string {
        return 'FuseMemoryStore';
    }

    /**
     * @param key - A name for the value
     * @param value - The value to store, only stringified data is permitted
     */
    public async set(key: string, value: string): Promise<void> {
        await this._exec('/set', ContentType.JSON, {
            key: key,
            value: value
        });
    }

    /**
     * @param key - The stored key
     * @returns 
     */
    public async get(key: string): Promise<string> {
        let response: FuseAPIResponse = await this._exec('/get', ContentType.TEXT, key);
        return await response.readAsText();
    }
}
